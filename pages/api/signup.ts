import type { NextApiRequest, NextApiResponse } from 'next'
import * as argon2 from "argon2";

async function hashPassword(target: string, salt: string): Promise<string> {
  return await argon2.hash(target, { type: argon2.argon2i, hashLength: 32, salt: Buffer.from(salt, 'hex') })
}

function generateSalt(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('hex');
}

async function registerUser(email: string, name: string, pw: string) {
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://" + process.env.USERS_WRITE + ":" + process.env.USERS_WRITE_PW + process.env.DB_URL + "/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const salt = generateSalt();
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");
    const query = { email: { $eq: email } };
    const options = { projection: { _id: 1 } };
    const result = await collection.find(query, options).toArray();
    if (result.length > 0) {
      return { error: 'Email already in use' }
    } else {
      return await db.collection('users').insertOne({
        email: email,
        name: name,
        password: await hashPassword(pw, salt),
        salt: salt
      });
    }
  } finally {
    await client.close();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body
  const { name } = req.body
  const { password } = req.body

  if (req.method === 'POST') {
    try {
      const data = await registerUser(email, name, password)
      if (data.error) {
        res.status(409).json({ error: data.error });
      } else {
        res.status(200).json(data.acknowledged)
      }
    } catch (e: any) {
      if (e === 'Email already in use') {
        res.status(500).json({ error: e })
      } else {
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  } else {
    res.status(405).json({ error: 'Only POST is supported' })
  }
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { JSEncrypt } from "jsencrypt";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

async function insertPassword(name: string, username: string, password: string, id: string) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    //const uri = "mongodb+srv://" + process.env.USERS_WRITE + ":" + process.env.USERS_WRITE_PW + process.env.DB_URL + "/?retryWrites=true&w=majority";
    const uri = "mongodb+srv://" + process.env.TEST_USER + ":" + process.env.TEST_USER_PW + process.env.DB_URL + "/?retryWrites=true&w=majority"; //! Using test db 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const salt = ""
    try {
      await client.connect();
      //const db = client.db(process.env.DB_NAME);
      const db = client.db(process.env.TEST_DB); //! Using test db
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
          //password: hashPassword(pw, salt),
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

  const { status, data } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") res.status(401).json({ error: 'Not authenticated' })
  }, [status])

  if (req.method === 'POST') {
    try {
      const data = await registerUser(email, name, password)
      if (data.error) {
        res.status(409).json({ error: data.error });
      } else {
        const userID = data.insertedId;
        res.status(200).json(data.acknowledged)
      }
    } catch (e) {
      res.status(500).json({ error: 'Operation failed' })
    }
  } else {
    res.status(405).json({ error: 'Only POST is supported' })
  }

}
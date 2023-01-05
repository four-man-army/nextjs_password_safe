import type { NextApiRequest, NextApiResponse } from 'next'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

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
      const query = { email: { $eq: "" } };
      const options = { projection: { _id: 1 } };
      const result = await collection.find(query, options).toArray();
      if (result.length > 0) {
        return { error: 'Email already in use' }
      } else {
        return await db.collection('users').insertOne({
          name: name,
          //password: hashPassword(pw, salt),
          salt: salt
        });
      }
    } finally {
      await client.close();
    }
  }

  async function checkAuth() {
    const { status, data } = useSession()
    if (status === "unauthenticated") return false
    return true
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { status } = req.body
  const { session } = req.body

  if (status === "unauthenticated") res.status(401).json({ error: 'Not authenticated' })
  else{
    if (req.method === 'POST') {
    try {
        res.status(200).json("200")
    } catch (e) {
      res.status(500).json({ error: 'Operation failed' })
    }
  } else {
    res.status(405).json({ error: 'Only POST is supported' })
  }
  }
}
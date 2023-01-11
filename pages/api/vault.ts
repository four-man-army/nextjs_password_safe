import type { NextApiRequest, NextApiResponse } from 'next'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

async function insertPassword(name: string, username: string, password: string) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    //const uri = "mongodb+srv://" + process.env.USERS_WRITE + ":" + process.env.USERS_WRITE_PW + process.env.DB_URL + "/?retryWrites=true&w=majority";
    const uri = "mongodb+srv://" + process.env.TEST_USER + ":" + process.env.TEST_USER_PW + process.env.DB_URL + "/?retryWrites=true&w=majority"; //! Using test db 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
      await client.connect();
      //const db = client.db(process.env.DB_NAME);
      const db = client.db(process.env.TEST_DB); //! Using test db
        return await db.collection('vaults').insertOne({
          "content":[name, username, password]
        });
    } finally {
      await client.close();
    }
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { status } = req.body
  const { session } = req.body
  const { name } = req.body
  const { username } = req.body
  const { password } = req.body

  //if (status === "unauthenticated") res.status(401).json({ error: 'Not authenticated' })
    if (req.method === 'POST') {
    try {
        await insertPassword(name, username, password)
        res.status(200).json("200")
    } catch (e) {
      res.status(500).json({ error: 'Operation failed', e: e })
    }
  } else {
    res.status(405).json({ error: 'Only POST is supported' })
  }
}
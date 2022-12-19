import type { NextApiRequest, NextApiResponse } from 'next'
import * as config from "../config.js"
  
async function search(email:string, pw:string){
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://"+config.read_user+":"+config.read_password+"@passwordsafe.ownrlys.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  try {
    await client.connect();
    const db = client.db("passwordsafe");
    const collection = db.collection("users");
    const query = { email: {$eq: email}, password: {$eq: pw}};
    const options = {projection: { _id: 1}};
    return await collection.find(query, options).toArray();
  } finally {
    await client.close();
  }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      const { email } = req.body
      const { password } = req.body

      if (req.method === 'POST') {
        try{ 
          const data = await search(email, password)
          if (data.length == 0) {
            res.status(401).json({ error: 'Invalid credentials'})
          }else{
            res.status(200).json(data)
          }
        } catch(e){
          res.status(500).json({ error: 'Operation failed'})
        }
      } else {
          res.status(405).json({ error: 'Only POST is supported'})
        }
    
  }

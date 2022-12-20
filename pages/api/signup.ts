import type { NextApiRequest, NextApiResponse } from 'next'

async function registerUser(email:string, name: string, pw:string){
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://"+process.env.USERS_READ+":"+process.env.USERS_READ_PW+process.env.DB_URL+"/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection("users");
      return null;
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
        try{ 
          const data:any = await registerUser(email, name, password)
          if (data.length == 0) {
            res.status(401).json({ error: 'Invalid credentials' })
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
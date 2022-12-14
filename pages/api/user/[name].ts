import type { NextApiRequest, NextApiResponse } from 'next'
import { DocumentStore } from "ravendb";

const store = new DocumentStore(
    ["http://127.0.0.1:8080"],   // URL to the Server
                                        // or list of URLs
                                        // to all Cluster Servers (Nodes)

    "next_safe");                       // Default database that DocumentStore will interact with

store.initialize();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const session = store.openSession();
    const { name } = req.query
    const { password } = req.query

    try{ 
        const data = await session.query({ collection: "Users" })
        .whereEquals("Name", name, true)
        .whereEquals("Password", password, true)
        .all();
        const map = data.map((d) => d)
        res.status(200).json(map)
    } catch(e){
        res.status(500).json({ error: 'Operation failed: ' + e})
    }
  }

  //store.dispose()
import type { NextApiRequest, NextApiResponse } from 'next'
import { DocumentStore } from "ravendb";

const store = new DocumentStore(
    ["http://127.0.0.1:8080"],   // URL to the Server
                                        // or list of URLs
                                        // to all Cluster Servers (Nodes)

    "sample");                       // Default database that DocumentStore will interact with

store.initialize();                     /* Each DocumentStore needs to be initialized before use.
                                         This process establishes the connection with the Server
                                         and downloads various configurations
                                         e.g. cluster topology or client configuration */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try{
        const session = store.openSession();                // Open a session for a default 'Database'

        const productNames = await session
            .query({ collection: "Products" })              // Query for Products
            .whereGreaterThan("UnitsInStock", 5)            // Filter
            .skip(0).take(10)                               // Page
            .selectFields("Name")                           // Project
            .all();   
        res.status(200).json({productNames})
    } catch(e){
        res.status(500).json({ error: 'Operation failed: ' + e})
    }
  }

  store.dispose()
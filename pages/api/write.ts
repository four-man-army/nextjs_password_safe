import type { NextApiRequest, NextApiResponse } from 'next'
import { DocumentStore } from "ravendb";

const store = new DocumentStore(
    ["http://127.0.0.1:8080"],   
    "sample");
store.initialize();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try{
        const session = store.openSession();

        const category = new Category("Database Category");

        await session.store(category);

        const product = new Product(
            "RavenDB Database",
            category.Id, 
            10);

        await session.store(product);
        await session.saveChanges();
    } catch(e){
        res.status(500).json({ error: 'Operation failed: ' + e})
    }
  }

  store.dispose()
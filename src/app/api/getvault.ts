import type { NextApiRequest, NextApiResponse } from "next";
const CryptoJs = require("crypto-js");

async function getVault(email: string) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = "mongodb+srv://" + process.env.USERS_WRITE + ":" + process.env.USERS_WRITE_PW + process.env.DB_URL + "/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");
    const query = { email: { $eq: email } };
    const options = { projection: { _id: 1 } };
    const result = await collection.find(query, options).toArray();
    if (result.length > 0) {
      const user_id = result[0]._id
      return await db.collection("users").find({ "_id": user_id }, { projection: { vault: 1, _id: 0 } }).toArray();
    } else {
      return { error: "User not found" };
    }
  } finally {
    await client.close();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { status } = req.body;
  const { email } = req.body;

  if (status === "unauthenticated")
    res.status(401).json({ error: "Not authenticated" });
  else {
    if (req.method === "POST") {
      try {
        const result = await getVault(email);
        if (result) res.status(200).json(result[0].vault);
        else res.status(500).json({ error: "Operation failed" });
      } catch (e: any) {
        res.status(500).json({ error: "Operation failed" });
      }
    } else {
      res.status(405).json({ error: "Only POST is supported" });
    }
  }
}

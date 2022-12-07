// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from  '../../database/test.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const data = await testAsync()
    res.status(200).json(data)
  } catch(e){
    res.status(500).json({ error: 'Operation failed: ' + e})
  }
}

export async function testAsync() {
  return JSON.parse(JSON.stringify(db.person))
}
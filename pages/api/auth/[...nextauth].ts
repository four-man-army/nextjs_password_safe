import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import * as config from "../config.js"

async function searchUser(email:string, pw:string){
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://"+config.read_user+":"+config.read_password+"@passwordsafe.ownrlys.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
      await client.connect();
      const db = client.db("passwordsafe");
      const collection = db.collection("users");
      const query = { email: {$eq: email}, password: {$eq: pw}};
      const options = {projection: { _id: 1, username: 1, email: 1, password: 1}};
      return await collection.find(query, options).toArray();
    } finally {
      await client.close();
    }
  }

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                let {email, password} = credentials as {email: string, password: string};
                const fetch = await searchUser(email, password)
                const user = fetch as {email: string, password: string, id: string, name: string};
                if (user.email === email && user.password === password) {
                    return user
                }else{
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    }
}

export default NextAuth(authOptions);
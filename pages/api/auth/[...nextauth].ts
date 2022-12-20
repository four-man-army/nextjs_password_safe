import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

let maxAge = 15 * 60;
const rememberMe = (remember: Boolean): void => {
    maxAge = remember ? 30 * 24 * 60 * 60 : 15 * 60;
}

async function searchUser(email:string, pw:string){
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://"+process.env.USERS_READ+":"+process.env.USERS_READ_PW+process.env.DB_URL+"/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection("users");
      const query = { email: {$eq: email}, password: {$eq: pw}};
      const options = {projection: { _id: 1, name: 1, email: 1, password: 1}};
      const result = await collection.find(query, options).toArray();
      return result[0];
    } finally {
      await client.close();
    }
  }

function hashPassword(input: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha512').update(input, 'utf-8').digest('hex');
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                let {email, password, remember} = credentials as {email: string, password: string, remember: boolean};
                const fetch = await searchUser(email, password)
                const user = fetch as {id:string, name: string, email: string, password: string};
                if (user.email === email && user.password === hashPassword(password)) {
                    rememberMe(remember);
                    return user
                }
                else{
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
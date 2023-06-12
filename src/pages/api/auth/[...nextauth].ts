import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as argon2 from "argon2";

const uri = "mongodb+srv://" + process.env.USERS_WRITE + ":" + process.env.USERS_WRITE_PW + process.env.DB_URL + "/?retryWrites=true&w=majority";

let maxAge = 15 * 60;
const rememberMe = (remember: Boolean): void => {
  maxAge = remember ? 30 * 24 * 60 * 60 : 15 * 60;
};

async function getSalt(email: string) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");
    const query = { email: { $eq: email } };
    const options = { projection: { _id: 0, salt: 1 } };
    const result = await collection.find(query, options).toArray();
    return result[0].salt;
  } finally {
    await client.close();
  }
}

async function authUser(email: string) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");
    const query = { email: { $eq: email } };
    const options = { projection: { _id: 1, name: 1, email: 1, password: 1 } };
    const result = await collection.find(query, options).toArray();
    return result[0];
  } finally {
    await client.close();
  }
}

async function hashPassword(target: string, salt: string): Promise<string> {
  return await argon2.hash(target, {
    type: argon2.argon2i,
    hashLength: 32,
    salt: Buffer.from(salt, "hex"),
  });
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let { email, password, remember } = credentials as {
          email: string;
          password: string;
          remember: boolean;
        };
        const fetch = await authUser(email);
        const salt = await getSalt(email);
        const user = fetch as {
          id: string;
          name: string;
          email: string;
          password: string;
        };
        if (user.email === email) {
          if ((await hashPassword(password, salt)) === user.password) {
            rememberMe(remember);
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

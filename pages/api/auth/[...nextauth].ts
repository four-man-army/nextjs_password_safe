import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) { 
                const { email, password } = credentials as { email: string, password: string };

                if (email !== 'oliver' || password !== '123456') {
                    return null;
                }

                return {id: '1234', name: 'Oliver', email: 'oliver'}
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    }
}

export default NextAuth(authOptions);
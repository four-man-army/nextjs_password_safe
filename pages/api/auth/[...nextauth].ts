import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

let maxAge = 15 * 60;

const rememberMe = (remember: Boolean): void => {
    maxAge = remember ? 30 * 24 * 60 * 60 : 15 * 60;
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) { 
                const { email, password, rember } = credentials as { email: string, password: string, rember: boolean };

                rememberMe(rember);

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
import { PrismaAdapter } from '@auth/prisma-adapter';
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import bcrypt from  "bcryptjs"

import db from "@/lib/db/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from 'next-auth/providers/google';
import { schema } from "@/lib/schema";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = schema.parse(credentials);

        const user = await db.user.findUnique({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with this email address");
        }

        // Check if user has a password (might not if they used OAuth)
        if (!user.password) {
          throw new Error("This account doesn't use password authentication");
        }

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Add role to token if available from user
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session user
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day session
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: "jwt",
  },
});


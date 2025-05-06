import bcrypt from "bcryptjs";
import { CustomPrismaAdapter } from "@/lib/auth/prisma-adapter";
import db from "@/lib/db/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/nodemailer";
import { schema } from "@/lib/schema";

const adapter = CustomPrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        
        const validatedCredentials = schema.parse(credentials);

        const user = await db.user.findUnique({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          return null; // Return null instead of throwing error for better error handling
        }

        // Check if user has a password (might not if they used OAuth)
        if (!user.password) {
          return null; // Return null instead of throwing error
        }

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null; // Return null instead of throwing error
        }

        return user;
      },
    }),
    // Only include EmailProvider if you've configured email settings
    ...(process.env.EMAIL_SERVER ? [EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM || "noreply@example.com",
    })] : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token if available from user
      if (user) {
        token.role = user.role;
        token.id = user.id;
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
    },
    
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
});


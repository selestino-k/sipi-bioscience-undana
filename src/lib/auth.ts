
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import jwt from "jsonwebtoken"

export const  { handlers, auth, signIn } = NextAuth({
  providers: [Google],
})

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const  { handlers, signIn, auth } = NextAuth({
  providers: [Google]
})

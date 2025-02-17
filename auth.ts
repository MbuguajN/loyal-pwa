import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import { genSaltSync, hashSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password as string)

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email as string, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return user
      },
    }), Google
  ], pages: {
    signIn: "/signin", newUser: "/new-user"
  }
})

export async function getUserFromDb(email: string, passHash: string) {
  const user = await prisma.user.findFirst({ where: { email: email, passwordhash: passHash } });
  if (user?.email === email && passHash === user?.passwordhash) {
    return user
  }
  return null
}

export function saltAndHashPassword(password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash
}

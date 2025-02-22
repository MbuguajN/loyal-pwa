import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";
import { z } from 'zod'
import { User } from "@prisma/client";
export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

const debug =
  process.env.NODE_ENV == "development" ||
    process.env.VERCEL_ENV == "preview" ||
    process.env.VERCEL_ENV == "development"
    ? true
    : false;
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: debug ? { strategy: "jwt" } : { strategy: "jwt", maxAge: 60 * 60 },
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
        console.log({ credentials })
        // logic to salt and hash password
        const parseRes = await signInSchema.safeParseAsync(credentials)
        if (parseRes.success) {


          // logic to verify if the user exists
          user = await getUserFromDb(parseRes?.data?.email as string)

          const authorized = compareSync(parseRes?.data?.password, user?.passwordhash as string)

          console.log({ authorized })
          if (user && authorized) {
            return user
          } else {
            return null
          }

        }

        // return user object with their profile data
        return user

      },
    }), Google
  ], pages: {
    signIn: "/signin", newUser: "/new-user"
  }
})

export async function getUserFromDb(email: string): Promise<User | null> {
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user) {
    return user
  }
  return null
}

export function saltAndHashPassword(password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash
}

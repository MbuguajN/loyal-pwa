import { prisma } from "@/prisma";
import { z } from "zod";
export async function POST(request: Request) {

  const businessOnBoardSchema = z.object({
    franchiseName: z.string({ required_error: "franchise name required" }),
    email: z.string({ required_error: "user email required" }).email(),
    phoneNumber: z.string({ required_error: "phone numner required" }),
    storeLocation: z.string({ required_error: "store location required" }),
  })
  const memberOnboardingSchema = z.object({

    email: z.string({ required_error: "user email required" }).email(),
    phoneNumber: z.string({ required_error: "phone number required" })
  })
  try {

    const data = await request.formData();
    const role = data.get("role")?.toString();
    const email = data.get("email")?.toString()
    const phoneNumber = data.get("phoneNumber")?.toString();
    console.log({ phoneNumber, role })
    if (role === "business") {

      const franchiseName = data.get("franchiseName")?.toString();
      const storeLocation = data.get("storeLocation")?.toString()

      const parseRes = await businessOnBoardSchema.safeParseAsync({ phoneNumber, franchiseName, storeLocation, email })
      if (parseRes?.success) {
        const user = await prisma.user.update({ where: { email: parseRes?.data?.email }, data: { role: "admin" } })
        const upsertFracnchise = await prisma.franchise.upsert({ create: { name: parseRes?.data?.franchiseName }, update: {}, where: { name: parseRes?.data?.franchiseName } })
        if (user) {

          const store = await prisma.store.create({ data: { adminId: user?.id, location: parseRes?.data?.storeLocation, phoneNumber: parseRes?.data?.phoneNumber, franchiseId: upsertFracnchise?.id } })
          if (store) {

            return Response.json({ status: "success" })
          } else {

            return new Response("Error creating store", { status: 500 })
          }
        } else {

          return new Response("no user with submitted id found", { status: 500 })
        }
      } else {
        console.log({ parseRes })
        return new Response("error parsing details", { status: 500 })
      }

    } else {

      const parseRes = await memberOnboardingSchema.safeParseAsync({ phoneNumber, email })
      console.log(parseRes?.error)
      if (parseRes?.success) {

        const user = await prisma.user.update({ data: { phoneNumber: parseRes?.data?.phoneNumber }, where: { email: parseRes?.data?.email } })
        if (user) {
          return Response.json({ status: "success" })
        } else {

          return new Response("no user found", { status: 500 })
        }
      } else {

        return new Response("error parsing details", { status: 500 })

      }

    }
  } catch (e) {
    console.error(e)

    return new Response("An internal error occured", { status: 500 })

  }
}

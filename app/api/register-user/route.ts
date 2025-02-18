import { saltAndHashPassword, signInSchema } from "@/auth";
import { prisma } from "@/prisma";
import { ZodError } from "zod";

export async function POST(request: Request) {
	try {
		const data = await request.formData()

		const emailRaw = data.get('email')?.toString()
		const passwordRaw = data.get('password')?.toString();

		const parseRes = await signInSchema.safeParseAsync({ email: emailRaw, password: passwordRaw })
		if (parseRes?.success) {
			console.log({ parseRes })
			const passHash = saltAndHashPassword(parseRes?.data?.password)
			const userName = data.get('fullname')?.toString();
			const user = await prisma.user.create({ data: { email: parseRes?.data?.email, passwordhash: passHash, name: userName } })
			if (user) {
				return Response.json({ status: "user added" });
			} else {

				return new Response("error creating user", { status: 500 })
			}

		} else {

			console.log({ parseRes })
			return new Response("error passing email or password", { status: 500 })
		}
	} catch (error) {
		if (error instanceof ZodError) {
			// Return `null` to indicate that the credentials are invalid
			console.log({ error })
			return new Response("error passing email or password", { status: 500 })
		}
		return new Response("An internal error occured", { status: 500 })

	}
}

import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email },
        include: { Admin: true, Store: true },
      });
      if (user?.Admin) {
        return Response.json({ id: user?.Admin?.storeId });
      } else {
        return new Response("No user might not be an admin", { status: 404 });
      }
    } else {
      return new Response("No email provided", { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

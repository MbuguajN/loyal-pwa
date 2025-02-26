import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    console.log({ email });
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email, role: "business" },
      });
      const store = await prisma.store.findFirst({
        where: { ownerId: user?.id },
        include: { franchise: true, admins: { include: { user: true } } },
      });
      console.log(user);
      console.log(store);
      return Response.json({ store });
    } else {
      return new Response("No user id provided", { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user?.role == "admin" || user?.role == "business") {
      return Response.json({ isAdmin: true, role: user?.role });
    } else {
      return Response.json({ isAdmin: false, role: user?.role });
    }
  } catch (e) {
    console.error(e);
    return new Response("Unauthorized", { status: 400 });
  }
}

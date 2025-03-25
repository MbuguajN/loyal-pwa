import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      const memberShips = await prisma.memberShip.findMany({
        where: { memberId: user?.id },
        include: { store: true, member: true },
      });
      return Response.json({ memberShips });
    } else {
      return new Response("No email provided", { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

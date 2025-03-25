import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const storeId = formData.get("storeId")?.toString();
    if (email && storeId) {
      const user = await prisma.user.findUnique({ where: { email } });
      const memberShips = await prisma.memberShip.findFirst({
        where: { memberId: user?.id, storeId: Number(storeId) },
        include: {
          store: true,
          member: true,
          AwardEvent: true,
          RedeemEvents: true,
        },
      });
      return Response.json({ memberShips });
    } else {
      return new Response("No email or store id provided", { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const email = formData.get("email")?.toString();
  if (id && email) {
    const store = await prisma.store.findUnique({
      where: { id: Number(id) },
      include: { Redeemables: true, franchise: true },
    });
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { MemberShip: true },
    });
    const alreadyMember = await prisma.memberShip.findFirst({
      where: { storeId: store?.id, memberId: user?.id },
    });
    if (alreadyMember) {
      return Response.json({ status: "Already member of the store" });
    }
    if (user && store) {
      const membership = await prisma.memberShip.create({
        data: { memberId: user?.id, storeId: store?.id },
      });
      if (membership) {
        return Response.json({ status: "success", membership });
      } else {
        return new Response("Error creating membership", { status: 400 });
      }
    } else {
      return new Response("Store or user does not exist", { status: 400 });
    }
  } else {
    return new Response("No id or email provided", { status: 400 });
  }
}

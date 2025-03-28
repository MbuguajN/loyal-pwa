import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const customerId = formData.get("customerId")?.toString();
    const storeId = formData.get("storeId")?.toString();
    console.log({ customerId, storeId });
    if (customerId && storeId) {
      const redeemEvents = await prisma.redeemEvent.findMany({
        where: { customerId: customerId, storeId: Number(storeId) },
        include: { redeemable: true, store: true },
      });
      const awardEvents = await prisma.awardEvent?.findMany({
        where: { customerId: customerId, storeId: Number(storeId) },
        include: { store: true },
      });
      return Response.json({ redeemEvents, awardEvents });
    } else {
      return new Response("No customer id or store id provided", {
        status: 400,
      });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

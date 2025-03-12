import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("storeId");
    const storeWithRedeemables = await prisma.store.findFirst({
      where: { id: Number(id) },
      include: { Redeemables: true, franchise: true },
    });
    return Response.json({ storeWithRedeemables });
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 404 });
  }
}

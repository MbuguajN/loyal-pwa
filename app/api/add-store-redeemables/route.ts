import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const storeId = formData.get("storeId")?.toString();
    const title = formData.get("redeemableTitle")?.toString();
    const points = formData.get("redeemablePointPerUnit")?.toString();
    if (storeId && title && points) {
      const store = await prisma.store.findUnique({
        where: { id: Number(storeId) },
      });
      if (store) {
        const redeemable = await prisma.redeemables.create({
          data: { name: title, point: Number(points), store_id: store?.id },
        });

        if (redeemable) {
          return Response.json({ status: "success" });
        } else {
        }
        return Response.json({ status: "error" });
      } else {
        return new Response("no store with submitted id", { status: 404 });
      }
    } else {
      return new Response("some details might be missing in the payload", {
        status: 400,
      });
    }
  } catch (e) {
    console.error(e);
    return new Response("an internal error Occured", { status: 500 });
  }
}

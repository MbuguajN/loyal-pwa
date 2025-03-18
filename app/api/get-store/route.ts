import { prisma } from "@/prisma";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    if (id) {
      const store = await prisma.store.findUnique({
        where: { id: Number(id) },
        include: { Redeemables: true, franchise: true },
      });
      if (store) {
        return Response.json({ store });
      } else {
        return new Response("No store with id", { status: 404 });
      }
    } else {
      return new Response("No id provided", { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return new Response("An internal error occured", { status: 500 });
  }
}

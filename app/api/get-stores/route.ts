import { prisma } from "@/prisma";

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      include: { franchise: true },
    });
    return Response.json({ stores });
  } catch (e) {
    console.error(e);

    return new Response("An internal error occured", { status: 500 });
  }
}

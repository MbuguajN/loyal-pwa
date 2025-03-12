import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { Store: true, Admin: true },
    });
    if (user?.role == "admin" || user?.role == "business") {
      return Response.json({
        isAdmin: user?.role == "business" ? false : true,
        isBusiness: user?.role == "business" ? true : false,
        ownedStore: user?.Store,
        adminManagedStoreId: user?.Admin?.storeId,
      });
    } else {
      return Response.json({ isAdmin: false, role: user?.role });
    }
  } catch (e) {
    console.error(e);
    return new Response("Unauthorized", { status: 400 });
  }
}

import { prisma } from "@/prisma";
import { z } from "zod";

export const addStoreAdminSchema = z.object({
  email: z.string().email(),
  storeId: z.string(),
});
export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const storeId = formData.get("storeId")?.toString();
  const parseRes = addStoreAdminSchema.safeParse({ email, storeId });
  if (parseRes?.success) {
    const user = await prisma.user.update({
      where: { email: parseRes?.data?.email },
      data: { role: "admin" },
    });
    const store = await prisma.store?.findUnique({
      where: { id: Number(parseRes?.data?.storeId) },
    });
    if (user && store) {
      const admin = await prisma.admin.create({
        data: { storeId: store.id, userId: user?.id },
      });
      if (admin) {
        return Response.json({ status: "admin sucessfully created" });
      } else {
        return new Response("error creating admin", { status: 404 });
      }
    } else {
      return new Response("user with email or or store with id not found", {
        status: 404,
      });
    }
  } else {
    console.error(parseRes?.error);
    return new Response("error parsing payload", { status: 400 });
  }
}

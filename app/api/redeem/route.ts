import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const redeemableId = formData.get("redeemableId")?.toString();
    const membershipId = formData.get("membershipId")?.toString();
    const units = formData.get("units")?.toString();
    if (redeemableId && units && membershipId) {
      const redeemable = await prisma.redeemables.findUnique({
        where: { id: Number(redeemableId) },
      });
      const membership = await prisma.memberShip.findUnique({
        where: { id: Number(membershipId) },
      });
      if (redeemable && membership) {
        const redeemEvent = await prisma.redeemEvent.create({
          data: {
            redeemableId: redeemable?.id,
            points_consumed: redeemable?.point * Number(units),
            memberShipId: membership?.id,
            customerId: membership?.memberId,
            storeId: redeemable?.store_id,
          },
        });
        if (redeemEvent) {
          const pointsDeduction = await prisma.memberShip.update({
            where: { id: membership?.id },
            data: { points: membership?.points - redeemEvent?.points_consumed },
          });
          if (pointsDeduction) {
            return Response.json({ status: "success" });
          } else {
            return new Response(
              "An internal Error occured calculating points",
              {
                status: 500,
              },
            );
          }
        } else {
          return new Response(
            "An internal Error occured creating a redeem event",
            {
              status: 500,
            },
          );
        }
      } else {
        return new Response("Membership id,Redeemable id or units missing ", {
          status: 400,
        });
      }
    } else {
      return new Response("Membership id,Redeemable id or units missing ", {
        status: 400,
      });
    }
  } catch (e) {
    console.error(e);

    return new Response("An internal Error occured redeeeming the item", {
      status: 500,
    });
  }
}

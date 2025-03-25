"use client"
import { HistoryHeader } from "@/components/history-header"
import { PointsSummary } from "@/components/points-summary"
import { TransactionHistory } from "@/components/transaction-history"
import { AwardEvent, MemberShip, Store, User, RedeemEvent } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

export default function PointsHistoryPage() {

	const params = useParams<{ slug: string }>()
	const { data: session } = useSession();
	const getMemberShips = useQuery({
		queryFn: async () => {
			if (session?.user?.email) {
				const formData = new FormData();
				formData.append("email", session?.user?.email)
				formData.append("storeId", params?.slug)
				const req = await fetch("/api/get-user-store-membership", { body: formData, method: "POST" })
				const data = await req.json() as {
					memberShip: MemberShip & {
						RedeemEvents: RedeemEvent[], AwardEvent: AwardEvent[]
						, store: Store, member: User,
					}
				}

				console.log({ data })
				return data


			}
		}, queryKey: [session?.user?.email]
	})
	return (
		<div className="container mx-auto py-8 px-4 md:px-6">
			<HistoryHeader />
			<div className="grid gap-6 md:grid-cols-4 mt-6">
				<div className="md:col-span-1">
					<PointsSummary totalPoints={getMemberShips?.data?.memberShip?.points ?? 0} />
				</div>
				<div className="md:col-span-3">
					<TransactionHistory storeId={getMemberShips?.data?.memberShip?.storeId} customerId={getMemberShips?.data?.memberShip?.memberId} />
				</div>
			</div>
		</div>
	)
}


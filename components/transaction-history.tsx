"use client"

import { useState } from "react"
import { ArrowDownUp, Calendar, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AwardEvent, Redeemables, RedeemEvent, Store } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

// Mock data for transaction history

export function TransactionHistory({ storeId, customerId }: { customerId: string | undefined; storeId: number | undefined }) {
	const [sortOrder, setSortOrder] = useState("newest")
	const getTransactions = useQuery({
		queryFn: async () => {
			if (storeId && customerId) {
				const formData = new FormData();
				formData.append("customerId", customerId)
				formData.append("storeId", storeId?.toString())
				const req = await fetch("/api/get-user-store-transactions", { body: formData, method: "POST" })
				const data = await req.json() as {
					redeemEvents: Array<RedeemEvent & {
						redeemable: Redeemables; store: Store
					}>; awardEvents: Array<AwardEvent & { store: Store }>
				}

				console.log({ transactions: data })
				return data


			}
		}, queryKey: [customerId]
	})

	// Filter transactions based on selected filter

	// Format date to be more readable

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Transaction History</CardTitle>
						<CardDescription>View your points activity over time</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="h-8 gap-1">
							<Calendar className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">Date Range</span>
						</Button>
						<Button variant="outline" size="sm" className="h-8 gap-1">
							<Filter className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">Filters</span>
						</Button>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-3 pt-3">
					<Tabs defaultValue="all" className="w-full sm:w-auto" >
						<TabsList className="grid grid-cols-3 w-full">

							<TabsTrigger value="earned">Earned</TabsTrigger>
							<TabsTrigger value="redeemed">Redeemed</TabsTrigger>
						</TabsList>
						<TabsContent value="redeemed">
							{getTransactions?.data?.redeemEvents.map((event) => {
								return (
									<div key={event.id} className="grid grid-cols-12 p-3 text-sm">
										<div className="col-span-3 text-muted-foreground">{event?.createdAt?.toLocaleDateString()}</div>
										<div className="col-span-6">{event?.redeemable?.name}</div>
										<div
											className="col-span-3 text-right font-medium text-red-600"

										>
											{`- ${event.points_consumed}`}
										</div>
									</div>


								)
							})}

							{getTransactions?.data?.redeemEvents?.length === 0 && (
								<div className="py-12 text-center text-muted-foreground">No transactions found for the selected filter.</div>
							)}
						</TabsContent>
						<TabsContent value="earned">
							{getTransactions?.data?.redeemEvents.map((event) => {
								return (
									<div key={event.id} className="grid grid-cols-12 p-3 text-sm">
										<div className="col-span-3 text-muted-foreground">{event?.createdAt?.toLocaleDateString()}</div>
										<div className="col-span-6">{event?.redeemable?.name}</div>
										<div
											className="col-span-3 text-right font-medium text-red-600"

										>
											{`- ${event.points_consumed}`}
										</div>
									</div>


								)
							})}

							{getTransactions?.data?.redeemEvents?.length === 0 && (
								<div className="py-12 text-center text-muted-foreground">No transactions found for the selected filter.</div>
							)}
						</TabsContent>

					</Tabs>
					<div className="flex items-center gap-2 ml-auto">
						<Button
							variant="ghost"
							size="sm"
							className="h-8 gap-1"
							onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
						>
							<ArrowDownUp className="h-3.5 w-3.5" />
							<span>{sortOrder === "newest" ? "Newest First" : "Oldest First"}</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>

				<div className="mt-4 flex justify-center">
					<Button variant="outline" size="sm">
						Load More
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}



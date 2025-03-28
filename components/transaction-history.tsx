"use client"

import { useState } from "react"
import { ArrowDownUp, Calendar, CheckCircle2, Filter, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AwardEvent, Redeemables, RedeemEvent, Store, Franchise } from "@prisma/client"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import ProductTab from "./redeemable-component"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CenteredLoading } from "./centered-loading"
import { useSession } from "next-auth/react"


// Mock data for transaction history

export function TransactionHistory({ storeId, customerId, membershipId }: { membershipId: number | undefined; customerId: string | undefined; storeId: number | undefined }) {
	const [sortOrder, setSortOrder] = useState("newest")
	const [redeemableId, setRedeemableId] = useState<number | undefined>(undefined)

	const { data: session } = useSession();
	const queryClient = new QueryClient()
	const { toast } = useToast();
	const [units, setUnits] = useState<string | undefined>(undefined)
	const rules = [
		"You recieve 20 points with your first purchase",
		"Points Expire after 10 months",
		"Provide at least two professional references with contact information",
		"Each 1 usd spent, you receive 10 points",
		"Each purchase earns a minimum of 1 points adn maximum of 50000 points",
	]
	const redeemMutation = useMutation({
		mutationFn: async () => {
			try {
				if (redeemableId && units && membershipId) {
					const formData = new FormData();

					formData.append("redeemableId", redeemableId?.toString());
					formData.append("membershipId", membershipId.toString());
					formData.append("units", units);
					const req = await fetch("/api/redeem", { method: "POST", body: formData })
					const resp = await req.json() as { status: string }
					if (resp.status === "success") {
						toast({
							variant: "default",
							title: "Success",
							description: "Redeemed Successfully",
						});

						queryClient.invalidateQueries([`transactions-${customerId}`])



					} else {
						toast({
							variant: "destructive",
							title: "Error",
							description: "Error redeeming item",
						});


					}
				}
			} catch (e) {
				console.log(e)
				toast({
					variant: "destructive",
					title: "Error",
					description: "A fatal error occured redeeming the item",
				});

			}

		}
	})
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
		}, queryKey: [`transactions-${customerId}`, session?.user?.email]
	})
	const getStore = useQuery({
		queryFn: async () => {
			if (storeId) {

				const formData = new FormData()
				formData.append("id", storeId?.toString())
				const req = await fetch("/api/get-store", { method: "POST", body: formData })
				const data = await req.json() as { store: Store & { Redeemables: Redeemables[]; franchise: Franchise } }
				console.log({ data })
				return data
			}
		},
		queryKey: [`store-${storeId}`]
	})


	if (getStore?.isFetched && getTransactions?.isFetched) {
		return (
			<Tabs defaultValue="redeem" className="w-full sm:w-auto" >
				<TabsList className="grid grid-cols-3 w-full">

					<TabsTrigger value="redeem">Redeem</TabsTrigger>
					<TabsTrigger value="history">History</TabsTrigger>

					<TabsTrigger value="rules">Rules</TabsTrigger>
				</TabsList>
				<TabsContent value="redeem">
					<TabsContent value="redeem">
						{(getStore?.data?.store?.Redeemables.length ?? 0) > 0 ? (getStore?.data?.store?.Redeemables.map((redeemable) => {
							return (
								<Dialog key={redeemable?.id}>
									<DialogTrigger onClick={() => {
										setRedeemableId(redeemable?.id)
									}} asChild>
										<ProductTab key={redeemable?.id} image="" title={redeemable?.name} price={redeemable?.point?.toString()} />
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Redeem {redeemable?.name}</DialogTitle>
											<DialogDescription>
												Select amount of units and click redeem when you&apos;re done.
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="units" className="text-right">
													Units
												</Label>
												<Input value={units} onChange={(e) => { setUnits(e.target.value) }} type="number" className="col-span-3" />
											</div>
										</div>
										<DialogFooter>

											<Button disabled={redeemMutation.isLoading} onClick={() => {
												redeemMutation.mutateAsync()
											}}>
												{redeemMutation.isLoading && <Loader2 className="animate-spin" />}
												{redeemMutation?.isLoading ? ("Please wait") : ("Redeem")}
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							)
						})) : (

							<div className="py-12 text-center text-muted-foreground">The store does no have any redeemeable items</div>
						)}

					</TabsContent>

				</TabsContent>

				<TabsContent value="history">
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
								<Tabs defaultValue="redeemed" className="w-full sm:w-auto" >
									<TabsList className="grid grid-cols-3 w-full">

										<TabsTrigger value="earned">Earned</TabsTrigger>
										<TabsTrigger value="redeemed">Points Redeemed</TabsTrigger>
									</TabsList>
									<TabsContent value="redeemed">
										{getTransactions?.data?.redeemEvents.map((event) => {
											return (

												<div key={event.id} className="grid grid-cols-12 p-3 text-sm">
													<div className="col-span-3 text-muted-foreground">{new Date(event?.createdAt as Date)?.toLocaleDateString() ?? ""}</div>
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
										{getTransactions?.data?.awardEvents.map((event) => {
											return (
												<div key={event.id} className="grid grid-cols-12 p-3 text-sm">
													<div className="col-span-3 text-muted-foreground">{new Date(event?.createdAt as Date)?.toLocaleDateString() ?? ""}</div>
													<div
														className="col-span-3 text-right font-medium text-red-600"

													>
														{`+ ${event.points_awarded}`}
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

				</TabsContent>
				<TabsContent value="rules">
					<Card className="w-full max-w-3xl mx-auto">
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl font-bold">Rules and Conditions</CardTitle>
							<CardDescription>Please review and follow these rules when submitting your application</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{rules.map((rule, index) => (
									<li key={index} className="flex items-start gap-3">
										<CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
										<span className="text-sm md:text-base">{rule}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

		)


	} else if (getStore?.isLoading && getTransactions?.isLoading) {
		return (
			<CenteredLoading />
		)
	}
}



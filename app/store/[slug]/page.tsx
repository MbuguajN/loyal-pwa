"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Gift, MapPin, Phone, ShoppingBag, Store as StoreIcon, Users } from "lucide-react"
import Image from "next/image"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { Franchise, Redeemables, Store } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function StorePage() {
	const params = useParams<{ slug: string }>()

	const { toast } = useToast();
	const { data: session, status } = useSession();
	console.log(status)
	const getStore = useQuery({
		queryFn: async () => {
			const formData = new FormData()
			formData.append("id", params.slug)
			const req = await fetch("/api/get-store", { method: "POST", body: formData })
			const data = await req.json() as { store: Store & { Redeemables: Redeemables[]; franchise: Franchise } }
			console.log({ data })
			return data
		},
		queryKey: [`store-${params.slug}`]
	})
	const jointStoreLp = useMutation({
		mutationFn: async () => {
			if (session?.user?.email) {
				const formData = new FormData()
				formData.append("id", params?.slug)
				formData.append("email", session?.user?.email)
				const req = await fetch("/api/join-lp", { method: "POST", body: formData })
				const data = await req.json()
				if (data.status == "success") {
					toast({
						variant: "default",
						title: "Success",
						description: "Membership processed",
					});

				} else {
					toast({
						variant: "destructive",
						title: "Success",
						description: "Error processing Membership",
					});


				}
			}
		}, mutationKey: ["join-store-lp"]
	})
	return (
		<div className="flex min-h-screen flex-col p-4">
			<Toaster />
			<header className="sticky top-0 z-10 bg-background border-b">
				<div className="container flex h-16 items-center justify-between py-4">
					<div className="flex items-center gap-2">
						<StoreIcon className="h-6 w-6" />
						<span className="text-xl font-bold">{`${getStore?.data?.store?.franchise?.name} ${getStore?.data?.store?.location}`}</span>
					</div>
				</div>
			</header>
			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative">
					<div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
						<Image
							src="/placeholder.svg?height=400&width=1200"
							alt="Store interior"
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-black/50" />
						<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
							<Badge className="mb-4">Premium Rewards</Badge>
							<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
								{`${getStore?.data?.store?.franchise?.name} ${getStore?.data?.store?.location}`} Loyalty Program
							</h1>
							<p className="mt-4 max-w-md text-white/90 md:text-lg">
								Join our loyalty program today and start earning points with every purchase. Redeem for exclusive
								products and experiences.
							</p>
							<a href="#join-program">
								<Button className="mt-6" size="lg">
									Become a Member
								</Button></a>
						</div>
					</div>
				</section>

				{/* Store Details Section */}
				<section className="container py-12">
					<div className="grid gap-6 md:grid-cols-2 lg:gap-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm font-medium">
								<StoreIcon className="h-4 w-4" />
								<span>Store Details</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight">About {`${getStore?.data?.store?.franchise?.name} ${getStore?.data?.store?.location}`}</h2>
							<p className="text-muted-foreground">
								{`${getStore?.data?.store?.franchise?.name} ${getStore?.data?.store?.location}`} has been serving customers with premium products since 2005. Our commitment to quality and
								customer satisfaction has made us a leader in the industry.
							</p>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="flex items-start gap-2">
									<MapPin className="mt-1 h-5 w-5 text-primary" />
									<div>
										<h3 className="font-medium">Location</h3>
										<p className="text-sm text-muted-foreground">{getStore?.data?.store?.location}</p>
									</div>
								</div>
								<div className="flex items-start gap-2">
									<Phone className="mt-1 h-5 w-5 text-primary" />
									<div>
										<h3 className="font-medium">Contact</h3>
										<p className="text-sm text-muted-foreground">(123) 456-7890</p>
										<p className="text-sm text-muted-foreground">info@brandstore.com</p>
									</div>
								</div>
							</div>
						</div>
						<div className="relative h-[300px] overflow-hidden rounded-lg">
							<Image src="/placeholder.svg?height=300&width=600" alt="Store front" fill className="object-cover" />
						</div>
					</div>
				</section>

				<Separator />

				{/* Loyalty Program Benefits */}
				<section className="container py-12">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold tracking-tight">Loyalty Program Benefits</h2>
						<p className="mt-4 text-muted-foreground">Join our loyalty program and enjoy these exclusive benefits</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<ShoppingBag className="h-5 w-5 text-primary" />
									Points on Purchases
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Earn 1 point for every $1 spent in-store or online. Points never expire as long as your account is
									active.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2">
									<Gift className="h-5 w-5 text-primary" />
									Exclusive Rewards
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Redeem your points for exclusive products, experiences, and discounts only available to members.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				<Separator />

				<section className="bg-muted py-12">
					<div className="container">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold tracking-tight">Redeemable Rewards</h2>
							<p className="mt-4 text-muted-foreground">
								Browse our selection of exclusive items available for redemption with your loyalty points
							</p>
						</div>
						<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{getStore?.data?.store?.Redeemables.map((item, index) => (
								<Card key={index} className="overflow-hidden">
									<div className="aspect-square relative">
										<Image
											src={"/placeholder.svg"}
											alt={item.name}
											fill
											className="object-cover transition-transform hover:scale-105"
										/>
									</div>
									<CardContent className="p-4">
										<h3 className="font-medium">{item.name}</h3>
										<div className="mt-2 flex items-center gap-1">
											<Award className="h-4 w-4 text-primary" />
											<span className="text-sm font-bold">{item.point.toLocaleString()} points</span>
										</div>
									</CardContent>
									<CardFooter className="p-4 pt-0">
										<Button variant="outline" size="sm" className="w-full">
											Redeem
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				</section>


				<section id="join-program" className="container py-12">
					<div className="grid gap-8 md:grid-cols-2 items-center">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm font-medium">
								<Users className="h-4 w-4" />
								<span>Join Today</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight">Become a Member</h2>
							<p className="text-muted-foreground">
								Sign up for our loyalty program today and start earning points with every purchase. It's free to join
								and you'll get immediate access to exclusive benefits.
							</p>
							<ul className="space-y-2">
								{[
									"Earn points with every purchase",
									"Redeem points for exclusive rewards",
									"Get early access to sales and events",
									"Receive personalized offers",
								].map((benefit, index) => (
									<li key={index} className="flex items-start gap-2">
										<div className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="12"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<polyline points="20 6 9 17 4 12"></polyline>
											</svg>
										</div>
										<span>{benefit}</span>
									</li>
								))}
							</ul>
						</div>
						<Card>
							<CardHeader>
								<CardTitle></CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent>
							</CardContent>
							<CardFooter>
								<Button onClick={() => {
									jointStoreLp.mutateAsync()
								}} className="w-full">Join Loyalty Program</Button>
							</CardFooter>
						</Card>
					</div>
				</section>

				{/* Testimonials Section 
				<section className="bg-muted py-12">
					<div className="container">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold tracking-tight">What Our Members Say</h2>
							<p className="mt-4 text-muted-foreground">
								Hear from our loyal customers about their experience with our loyalty program
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-3">
							{[
								{
									name: "Sarah Johnson",
									role: "Gold Member",
									content:
										"I've been a member for over 2 years and the rewards are amazing. I've redeemed points for several products and they're always high quality.",
								},
								{
									name: "Michael Chen",
									role: "Platinum Member",
									content:
										"The exclusive events for members are my favorite perk. I got early access to the limited edition collection and it was worth every point!",
								},
								{
									name: "Emily Rodriguez",
									role: "Silver Member",
									content:
										"I love how easy it is to earn and redeem points. The app makes tracking my rewards simple, and customer service is always helpful.",
								},
							].map((testimonial, index) => (
								<Card key={index} className="h-full">
									<CardContent className="p-6">
										<div className="flex items-center gap-2 mb-4">
											{Array(5)
												.fill(0)
												.map((_, i) => (
													<Star key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" />
												))}
										</div>
										<p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
										<div className="flex items-center gap-4">
											<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
												<span className="text-primary font-medium">
													{testimonial.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</span>
											</div>
											<div>
												<p className="font-medium">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">{testimonial.role}</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
*/}

				{/* FAQ Section */}
				<section className="container py-12">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
						<p className="mt-4 text-muted-foreground">Find answers to common questions about our loyalty program</p>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:gap-8">
						{[
							{
								question: "How do I earn points?",
								answer:
									"You earn 1 point for every $1 spent in-store or online. Additional bonus points may be available during special promotions.",
							},
							{
								question: "Do my points expire?",
								answer:
									"Points do not expire as long as your account remains active. An account is considered active if there's at least one purchase within a 12-month period.",
							},
							{
								question: "How do I redeem my points?",
								answer:
									"You can redeem points through our website, mobile app, or in-store at the checkout. Simply select the reward you want and confirm the redemption.",
							},
							{
								question: "Is there a membership fee?",
								answer:
									"No, joining our loyalty program is completely free. There are no hidden fees or charges associated with membership.",
							},
							{
								question: "Can I transfer my points to someone else?",
								answer:
									"Currently, points cannot be transferred between accounts. Points are tied to the individual member account.",
							},
							{
								question: "How do I check my point balance?",
								answer:
									"You can check your point balance by logging into your account on our website, through our mobile app, or by asking a store associate.",
							},
						].map((faq, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg">{faq.question}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{faq.answer}</p>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="mt-8 text-center">
						<p className="text-muted-foreground mb-4">Still have questions about our loyalty program?</p>
						<Button variant="outline">Contact Support</Button>
					</div>
				</section>
			</main>
		</div>
	)
}

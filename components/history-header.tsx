"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function HistoryHeader() {
	const router = useRouter()
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<Button onClick={() => { router.back() }} variant="ghost" size="icon" asChild>
					<Link href="#">
						<ArrowLeft className="h-4 w-4" />
						<span className="sr-only">Back to rewards</span>
					</Link>
				</Button>
				<h1 className="text-2xl font-bold tracking-tight">Points History</h1>
			</div>
			<p className="text-muted-foreground">View your points earning, redemption history and redeem points</p>
		</div>
	)
}



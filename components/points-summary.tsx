import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PointsSummary({ totalPoints }: { totalPoints: number }) {



	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Points Summary</CardTitle>
				<CardDescription>Your current points balance and status</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Available Points</span>
						<span className="text-2xl font-bold">{totalPoints}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}


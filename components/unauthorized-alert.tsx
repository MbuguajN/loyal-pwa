"use client"

import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

interface UnauthorizedAlertProps {
	title?: string
	description?: string
	redirectPath?: string
	redirectLabel?: string
}

export default function UnauthorizedAlert({
	title = "Unauthorized Access",
	description = "You do not have permission to access this page. Please log in or contact an administrator if you believe this is an error.",
	redirectPath = "/",
	redirectLabel = "Go to Home Page",
}: UnauthorizedAlertProps) {
	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
			<div className="w-full max-w-md mx-auto">
				<Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
					<AlertTriangle className="h-5 w-5" />
					<AlertTitle className="text-destructive font-semibold text-lg mb-2">{title}</AlertTitle>
					<AlertDescription className="text-destructive/90">{description}</AlertDescription>
					<div className="mt-6">
						<Button
							onClick={() => {
								signOut()
								router.push(redirectPath)
							}}
							variant="outline"
							className="w-full border-destructive/30 hover:bg-destructive/20 hover:text-destructive"
						>
							{redirectLabel}
						</Button>
					</div>
				</Alert>
			</div>
		</div>
	)
}

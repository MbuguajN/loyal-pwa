'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  // In a real application, you would fetch the user's name and avatar URL
  // from your authentication system or API
  const avatarUrl = "/placeholder.svg?height=40&width=40"

  const pathName = usePathname();
  const { data: session, status } = useSession();


  if (status === "authenticated") {
    console.log({ session })
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Bar */}
        <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <span className="font-semibold text-lg">Welcome, {session?.user?.name}</span>
          <Avatar className="w-10 h-10">
            <AvatarImage src={session?.user?.image ?? avatarUrl} alt={session?.user?.name ?? "user"} />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <Card className="w-full max-w-md mx-auto mt-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Your Dashboard</h2>
              <p className="text-muted-foreground">
                You have successfully logged in. Here is your personalized dashboard content.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  } if (status === "loading") {
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
        <p className="text-lg font-semibold text-gray-700">Authenticating</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we authenticate your account</p>
      </div>
    </div>

  } if (status === "unauthenticated") {
    signIn(undefined, { redirect: false, redirectTo: "/" })
  }
}

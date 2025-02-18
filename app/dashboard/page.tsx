import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  // In a real application, you would fetch the user's name and avatar URL
  // from your authentication system or API
  const userName = "John"
  const avatarUrl = "/placeholder.svg?height=40&width=40"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <span className="font-semibold text-lg">Welcome, {userName}</span>
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
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
}
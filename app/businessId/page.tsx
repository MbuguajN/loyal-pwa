"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Fuel, Car, Gift, Award } from "lucide-react"

// Mock data
const mockBusinessData = {
  id: "123",
  name: "QuickFuel Station",
  image: "/placeholder.svg?height=100&width=100",
  userCode: "USR12345",
  pointsBalance: 750,
  redeemables: [
    {
      id: "1",
      title: "10¢ Off Per Gallon",
      description: "Get 10¢ off per gallon on your next fill-up",
      pointsCost: 200,
      icon: "fuel",
    },
    {
      id: "2",
      title: "Free Car Wash",
      description: "Redeem for a free premium car wash",
      pointsCost: 350,
      icon: "car",
    },
    {
      id: "3",
      title: "Free Coffee",
      description: "Enjoy a complimentary coffee of any size",
      pointsCost: 100,
      icon: "coffee",
    },
    {
      id: "4",
      title: "$5 Store Credit",
      description: "Get $5 off your next in-store purchase",
      pointsCost: 250,
      icon: "gift",
    },
    {
      id: "5",
      title: "Oil Change Discount",
      description: "Save 20% on your next oil change service",
      pointsCost: 500,
      icon: "award",
    },
  ],
}

// Utility function
const cn = (...inputs: string[]) => inputs.filter(Boolean).join(" ")

// UI Components
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className!)} {...props} />
)

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className!)} {...props} />
)

const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className!,
    )}
    {...props}
  />
)

const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
      className!,
    )}
    {...props}
  />
)

const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("shrink-0 bg-border h-[1px] w-full", className!)} {...props} />
)

export default function LoyaltyPage() {
  const [business, setBusiness] = useState(mockBusinessData)
  const [redeemingId, setRedeemingId] = useState<string | null>(null)

  const handleRedeem = async (redeemableId: string) => {
    setRedeemingId(redeemableId)
    setTimeout(() => {
      const redeemable = business.redeemables.find((r) => r.id === redeemableId)
      if (redeemable) {
        setBusiness({
          ...business,
          pointsBalance: business.pointsBalance - redeemable.pointsCost,
          redeemables: business.redeemables.filter((r) => r.id !== redeemableId),
        })
      }
      setRedeemingId(null)
    }, 1500)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "fuel":
        return <Fuel className="h-5 w-5" />
      case "car":
        return <Car className="h-5 w-5" />
      case "coffee":
        return <Gift className="h-5 w-5" />
      case "gift":
        return <Gift className="h-5 w-5" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <header className="p-4 flex items-center gap-4 bg-card shadow-sm">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src={business.image || "/placeholder.svg"}
            alt={business.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">{business.name}</h1>
          <p className="text-sm text-muted-foreground">Loyalty Program</p>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-6 max-w-md mx-auto w-full">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg mb-4 w-full max-w-[200px] aspect-square flex items-center justify-center border">
              <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full p-2">
                {Array(25)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.7 ? "bg-black" : "bg-transparent"} 
                               ${i === 0 || i === 4 || i === 20 || i === 24 ? "bg-black" : ""}`}
                    />
                  ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Your User Code</p>
              <p className="text-xl font-mono font-bold tracking-wider">{business.userCode}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Points Balance</h2>
              <Badge className="text-lg px-4 py-1 font-bold bg-primary/10 text-primary">{business.pointsBalance}</Badge>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-medium mb-3">Redeemable Rewards</h2>
          <div className="space-y-3 max-h-[calc(100vh-450px)] overflow-y-auto pr-1">
            {business.redeemables.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">{getIcon(reward.icon)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-3 flex justify-between items-center bg-muted/50">
                    <span className="text-sm font-medium">{reward.pointsCost} points</span>
                    <Button
                      onClick={() => handleRedeem(reward.id)}
                      disabled={business.pointsBalance < reward.pointsCost || redeemingId === reward.id}
                      className="h-9 rounded-md px-3"
                    >
                      {redeemingId === reward.id ? "Redeeming..." : "Redeem"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {business.redeemables.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <p>No rewards available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


"use client"

//import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Gift, Tag, Clock, Star } from "lucide-react"
import Image from "next/image"

const LoyaltyDashboard = () => {
    const points = 500
    const cumulativePoints = 1500
    const recentActivity = [
      { date: "2023-06-01", business: "Coffee Shop", points: 50, type: "earned" },
      { date: "2023-05-28", business: "Bookstore", points: 100, type: "redeemed" },
      { date: "2023-05-25", business: "Restaurant", points: 75, type: "earned" },
    ]

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-loyalty-background p-4 space-y-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-loyalty-primary">Loyalty Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back, Loyal Customer!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loyalty Points Balance and User Info */}
        <Card className="bg-gradient-to-br from-white to-loyalty-accent/20 shadow-lg border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-loyalty-primary to-loyalty-secondary text-white rounded-t-lg py-2">
            <CardTitle className="text-xl flex items-center justify-center">
              <Star className="mr-2 h-5 w-5" /> Your Loyalty Info
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0 mr-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-loyalty-primary mb-1">John Doe</h3>
                <p className="text-sm text-gray-600 mb-2">Member since: Jan 2023</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available Points</p>
                    <p className="text-2xl font-bold text-loyalty-primary">{points}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earned</p>
                    <p className="text-2xl font-bold text-loyalty-secondary">{cumulativePoints}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 h-full">
          <Button className="h-16 text-xs bg-gradient-to-br from-loyalty-primary to-loyalty-primary-dark hover:from-loyalty-primary-dark hover:to-loyalty-primary transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <QrCode className="mb-1 h-4 w-4" />
            <span>Scan QR</span>
          </Button>
          <Button className="h-16 text-xs bg-gradient-to-br from-loyalty-secondary to-loyalty-secondary-dark hover:from-loyalty-secondary-dark hover:to-loyalty-secondary transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <Gift className="mb-1 h-4 w-4" />
            <span>Redeem</span>
          </Button>
          <Button className="h-16 text-xs bg-gradient-to-br from-loyalty-accent to-loyalty-accent-dark hover:from-loyalty-accent-dark hover:to-loyalty-accent transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <Tag className="mb-1 h-4 w-4" />
            <span>Offers</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-to-br from-white to-loyalty-secondary/20 shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-loyalty-primary to-loyalty-accent text-white rounded-t-lg py-2">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ul className="space-y-2">
            {recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center bg-white/50 p-2 rounded-md text-sm">
                <Clock className="mr-2 h-4 w-4 text-loyalty-primary" />
                <div>
                  <p className="font-semibold">
                    {activity.type === "earned" ? "Earned" : "Redeemed"} {activity.points} points
                  </p>
                  <p className="text-xs text-gray-600">
                    {activity.business} - {activity.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoyaltyDashboard


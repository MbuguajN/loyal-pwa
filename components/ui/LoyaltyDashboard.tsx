"use client";

//import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const LoyaltyDashboard = () => {
  
  const places = [
    {
      name: "Coffee Haven",
      description: "Artisanal coffee and pastries",
      points: 250,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Fashion Outlet",
      description: "Trendy clothes and accessories",
      points: 500,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Gourmet Bites",
      description: "Fine dining and exquisite flavors",
      points: 150,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Wellness Spa",
      description: "Relaxation and rejuvenation services",
      points: 300,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen dark:bg-gray-900">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.map((place) => (
            <Link href={`/details/${place.name.toLowerCase().replace(/\s+/g, "-")}`} key={place.name}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/3 h-40">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{place.description}</p>
                    <p className="text-lg font-bold">{place.points} points</p>
                  </CardContent>
                  <CardFooter className="p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <Button variant="ghost" className="text-primary">
                      Open Details
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LoyaltyDashboard;

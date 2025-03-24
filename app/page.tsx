"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { Card, CardContent } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { BadgePercent, BellPlus, Loader2, Search, Store, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
//import { useState } from "react";
export default function HomePage() {

  //const avatarUrl = "/placeholder.svg?height=40&width=40";
  //const [searchQuery, setSearchQuery] = useState("")

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log({ session });
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Bar */}

        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background w-screen px-4 sm:px-6">




          <div className="flex w-full items-center gap-2 md:ml-auto md:gap-4">
            <form className="flex-1 md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </form>

            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <BellPlus className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? "user"}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <BadgePercent className="h-12 w-12 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Loyalty Programs</h1>
              <p className="text-muted-foreground max-w-[600px]">
                Join loyalty programs from your favorite stores to earn rewards, discounts, and special offers.
              </p>
            </div>

            <Tabs defaultValue="my-programs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-programs">My Programs</TabsTrigger>
              </TabsList>
              <TabsContent value="my-programs" className="mt-6">
                <Card className="border-dashed">
                  <CardHeader className="flex flex-col items-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Store className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <CardTitle>No Loyalty Programs Yet</CardTitle>
                    <CardDescription className="text-center max-w-md mx-auto">
                      You haven&apos;t joined any store loyalty programs. Join programs to start earning rewards and discounts
                      on your purchases.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button asChild>
                      <Link href="/search" onClick={() => document.getElementById("discover-tab")?.click()}>
                        Discover Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>


        </main>
      </div>
    );
  }
  if (status === "loading") {
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
        <p className="text-lg font-semibold text-gray-700">Authenticating</p>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we authenticate your account
        </p>
      </div>
    </div>;
  }
  if (status === "unauthenticated") {
    signIn(undefined, { redirect: false, redirectTo: "/" });
  }
}

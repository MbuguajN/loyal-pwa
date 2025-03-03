"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { Card, CardContent } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { BellPlus, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import LoyaltyDashboard from "@/components/ui/LoyaltyDashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export default function HomePage() {
  
  //const avatarUrl = "/placeholder.svg?height=40&width=40";

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
          <LoyaltyDashboard />
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

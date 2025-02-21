"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
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
  // In a real application, you would fetch the user's name and avatar URL
  // from your authentication system or API
  const avatarUrl = "/placeholder.svg?height=40&width=40";

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log({ session });
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Bar */}

        <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <span className="font-semibold text-lg">
            Welcome, {session?.user?.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={session?.user?.image ?? avatarUrl}
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

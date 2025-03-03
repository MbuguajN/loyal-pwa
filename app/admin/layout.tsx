'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BellPlus, Loader2, Search } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import UnauthorizedAlert from "@/components/unauthorized-alert";
export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const { data: session, status } = useSession();
  const isAdminQuery = useQuery({
    queryFn: async () => {
      if (session?.user?.email) {
        const formData = new FormData()
        formData.append("email", session?.user?.email as string)
        const req = await fetch('/api/is-admin', { method: "POST", body: formData })
        const data = await req.json() as { isAdmin: string; role: string }
        return data
      }
    }, queryKey: ["isAdmin"]
  })

  if (status === "authenticated" && isAdminQuery?.isFetched && isAdminQuery?.data?.isAdmin) {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <main>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background w-screen px-4 sm:px-6">
            <SidebarTrigger />



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

          {children}
        </main>
      </SidebarProvider>
    )
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
    signIn(undefined, { redirect: false, redirectTo: "/admin" });
  }
  if (!isAdminQuery?.data?.isAdmin && isAdminQuery?.isFetched) {
    return (
      <UnauthorizedAlert
        title="Access Denied"
        description="You are not authorized to view this content. Please sign in with appropriate credentials to continue."
        redirectPath="/signin"
        redirectLabel="Go to Login"
      />
    )
  }
}

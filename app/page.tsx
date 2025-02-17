'use client'
import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === "authenticated") {
    console.log({ session })
    return (
      <body>User:{session?.user?.email}<Button onClick={() => { signOut() }}>Logout</Button></body>

    );
  } if (status === "loading") {
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
        <p className="text-lg font-semibold text-gray-700">Authenticating</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we authenticate your account</p>
      </div>
    </div>

  } if (status === "unauthenticated") {
    signIn(undefined, { redirectTo: pathName })
  }
} 

'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Suspense } from "react";
  import { Loader2 } from "lucide-react";
  import { Toaster } from "@/components/ui/toaster";
  import { useRouter } from "next/navigation";
  import { Input } from "@/components/ui/input"

 

export default function SignUp() {
  const router = useRouter()
  return (
    <Suspense fallback={

        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
  
      }>
        <div className="min-h-screen flex items-center justify-center">
  
          <Toaster />
          <Card className="border-none shadow-none">
            <CardHeader className="flex items-center justify-center">
              <CardTitle></CardTitle>
              <CardDescription>
                <div className="flex justify-center mb-3">
                  <img src="./icons/icon-512x512.png" alt="Logo" className="w-32 h-32"></img>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-1  w-full max-w-md">
  
  
              <div className="space-y-4 mb-4">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input id="name" type="text" placeholder="Enter your full name" className="w-full rounded-lg mb-4" />
        </div>

        <div className="space-y-4 mb-4">
          <label htmlFor="email" className="text-sm font-medium mt-6">
            Email
          </label>
          <Input id="email" type="email" placeholder="Enter your email" className="w-full rounded-lg" />
        </div>

        <div className="space-y-4 mb-4">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input id="password" type="password" placeholder="Create a password" className="w-full rounded-lg" />
        </div>
  
  
              </div>
  
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="space-y-4 pt-2">
  
                <Button
  
                  className="w-full bg-orange-400 hover:bg-orange-500"
                >
                  Login
                </Button>
                <Button  variant="outline" className="w-full border-orange-400 text-orange-400 hover:bg-orange-50">
                   Login with Google
                </Button>
              </div>
              <Button className="hover:text-orange-500" onClick={() => { router.push("/signin") }} variant="link">Already have an account? SignIn</Button>

  
            </CardFooter>
          </Card>
  
        </div>
      </Suspense >
  )
}
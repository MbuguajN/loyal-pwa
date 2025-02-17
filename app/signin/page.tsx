'use client'
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react";

export default function Signin() {
  const callBackUrl = useSearchParams().get("callbackUrl");
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log({ session })
    toast({
      variant: "default",

      description: "Already Logged In",
    })

    router.push(callBackUrl ?? "/")
  }
  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              <div className="flex justify-center mb-6">
                <img src="https://placehold.co/100x100" alt="Logo" className="w-24 h-24"></img>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8  w-full max-w-md">


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>


            </div>

          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex items-end">

              <Button

                className="w-full m-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Login
              </Button>
              <Button onClick={() => {
                signIn('google', { redirect: false }).then(data => {
                  console.log({ data })
                  if (data?.ok) {
                    toast({
                      variant: "default",

                      description: "Logged In",
                    })

                    //router.push(callBackUrl ?? "/")

                  } else {
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong.",
                      description: "There was a problem with your request.",
                      action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })

                  }
                })
              }} className="w-full m-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <FaGoogle /> Login with Google
              </Button>
            </div>
            <Button className="hover:text-orange-500" onClick={() => { router.push("/signup") }} variant="link">Don&apos;t have an account? SignUp</Button>

          </CardFooter>
        </Card>

      </div>
    </Suspense>


  );
}

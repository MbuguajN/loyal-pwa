'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast, useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";

export default function Signin() {
  const callBackUrl = useSearchParams().get("callbackUrl");
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img src="https://placehold.co/100x100" alt="Logo" className="w-24 h-24"></img>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <Button

          className="w-full m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </Button>
        <Button onClick={() => {
          signIn('google').then(data => {
            if (data?.ok) {
              toast({
                variant: "default",

                description: "Logged In",
              })

              router.push(callBackUrl ?? "/")

            } else {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })

            }
          })
        }} className="w-full m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <FaGoogle /> Signin with Google
        </Button>
      </div>
    </div>
  );
}

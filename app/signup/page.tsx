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
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";


const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  fullName: z.string({ required_error: "username is required" }).min(1, "username is required"),
})
export default function SignUp() {
  const router = useRouter()
  const [fullName, setFullName] = useState<string>()

  const [email, setEmail] = useState<string>()
  const { toast } = useToast()
  const [password, setPassword] = useState<string>()
  const registerUserMutation = useMutation({
    mutationKey: ["registerUser"], mutationFn: async () => {
      const parseRes = await signUpSchema.safeParseAsync({ fullName, email, password })
      if (parseRes?.success) {
        try {
          const formData = new FormData();
          formData.append("email", parseRes?.data?.email);
          formData.append("fullname", parseRes?.data?.fullName);
          formData.append("password", parseRes?.data?.password)
          const req = await fetch("/api/register-user", { method: "POST", body: formData });
          const resp = await req.json()

          return resp
        } catch (e) {

          toast({ title: "Error", description: "An error occured submiting you credentials", variant: "destructive" })
          console.error(e)
        }
      } else {

        toast({ title: "Error", description: "error parsing credentials", variant: "destructive" })
        console.log({ parse: parseRes })
        return parseRes
      }

    }
  })
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
                <Input value={fullName} onChange={(e) => { setFullName(e.target.value) }} id="name" type="text" placeholder="Enter your full name" className="w-full rounded-lg mb-4" />
              </div>

              <div className="space-y-4 mb-4">
                <label htmlFor="email" className="text-sm font-medium mt-6">
                  Email
                </label>
                <Input value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" type="email" placeholder="Enter your email" className="w-full rounded-lg" />
              </div>

              <div className="space-y-4 mb-4">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input value={password} id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Create a password" className="w-full rounded-lg" />
              </div>


            </div>

          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="space-y-4 pt-2">

              <Button

                onClick={() => {
                  registerUserMutation.mutateAsync().then(data => {
                    console.log(data)
                    if (data.status == "user added") {
                      toast({ title: "Registration Successful", description: "Redirecting to login page ..." })
                      router.push("/signin")
                    }
                  })
                }}
                className="w-full bg-orange-400 hover:bg-orange-500"
                disabled={registerUserMutation?.isLoading}

              >{
                  registerUserMutation?.isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : ("Register")

                }
              </Button>
              <Button onClick={() => { signIn('google') }} variant="outline" className="w-full border-orange-400 text-orange-400 hover:bg-orange-50">
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

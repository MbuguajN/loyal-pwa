"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function Signin() {
  const callBackUrl = useSearchParams().get("callbackUrl");
  const { toast } = useToast();
  const router = useRouter();
  const [credsLoginLoading, setCredsLoginLoading] = useState(false);
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      console.log({ session });
      toast({
        variant: "default",

        description: "Already Logged In",
      });

      router.push(callBackUrl as string);
    }
  }, [status]);
  console.log({ callBackUrl });
  return (
    <Suspense
      fallback={
        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
      }
    >
      <div className="">
        <div className="min-h-screen flex items-center justify-center">
          <Toaster />
          <Card className="border-none shadow-none">
            <CardHeader className="flex items-center justify-center">
              <CardTitle>Member Sign</CardTitle>
              <CardDescription>
                <div className="flex justify-center mb-3">
                  <img
                    src="./icons/icon-512x512.png"
                    alt="Logo"
                    className="w-32 h-32"
                  ></img>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-1  w-full max-w-md">
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="space-y-4 pt-2">
                <Button
                  disabled={credsLoginLoading}
                  onClick={() => {
                    if (email && password) {
                      setCredsLoginLoading(true);
                      signIn("credentials", {
                        redirect: false,
                        email: email,
                        password: password,
                      }).then((res) => {
                        if (res?.ok) {
                          setCredsLoginLoading(false);
                          console.log({ res });
                          toast({
                            variant: "default",
                            title: "Success",
                            description: "logged in",
                          });
                          if (callBackUrl) {
                            router.push(callBackUrl as string);
                          } else {
                            router.push("/");
                          }
                        }
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "email or password empty",
                      });
                    }
                  }}
                  className="w-full bg-orange-400 hover:bg-orange-500"
                >
                  {credsLoginLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "login"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    signIn("google").then((data) => {
                      console.log({ data });
                      if (!data?.error) {
                      } else {
                        toast({
                          variant: "destructive",
                          title: "Something went wrong.",
                          description:
                            "There was a problem authenticating your account.",
                        });
                      }
                    });
                  }}
                  variant="outline"
                  className="w-full border-orange-400 text-orange-400 hover:bg-orange-50"
                >
                  <FaGoogle /> Login with Google
                </Button>
              </div>
              <Button
                className="hover:text-orange-500"
                onClick={() => {
                  router.push("/signup");
                }}
                variant="link"
              >
                Don&apos;t have an account? SignUp
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}

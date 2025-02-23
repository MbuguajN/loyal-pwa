
"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function Signin() {
  const callBackUrl = useSearchParams().get("callbackUrl");
  const { toast } = useToast();
  const [role, setRole] = useState<"member" | "business">("member")
  const router = useRouter();
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [businessName, setBusinessNanme] = useState<string>();
  const [storeLocation, setStoreLocation] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const { data: session, status } = useSession();
  console.log({ session })
  console.log({ callBackUrl });

  if (status === "authenticated") {
    return (
      <Suspense
        fallback={
          <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin mx-auto" />
        }
      >
        <div className="">
          <Tabs defaultValue="member" className="grid h-screen place-items-center justify-center">
            <TabsList>
              <TabsTrigger value="member" onClick={() => { setRole("member") }}>Member</TabsTrigger>
              <TabsTrigger value="business" onClick={() => { setRole("business") }}>Business</TabsTrigger>
            </TabsList>
            <TabsContent value="business">
              <div className="min-h-screen flex items-center justify-center">
                <Toaster />
                <Card className="border-none shadow-none">
                  <CardHeader className="flex items-center justify-center">
                    <CardTitle>Business Onboarding</CardTitle>
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
                          Phone Number
                        </label>
                        <input
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                          value={phoneNumber}
                          type="tel"
                          id="phonenumber"
                          placeholder="Enter your Phone number"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Business
                        </label>
                        <input
                          value={businessName}
                          onChange={(e) => {
                            setBusinessNanme(e.target.value);
                          }}
                          type="text"
                          id="business"
                          placeholder="Enter your store's franchise name"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Store Location
                        </label>
                        <input
                          value={storeLocation}
                          onChange={(e) => {
                            setStoreLocation(e.target.value);
                          }}
                          type="text"
                          id="business"
                          placeholder="Enter your store's location"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <div className="space-y-4 pt-2">
                      <Button
                        disabled={onboardingLoading}
                        onClick={() => {
                          try {
                            if (phoneNumber && businessName && storeLocation && role) {
                              setOnboardingLoading(true);
                              const formData = new FormData()
                              formData.append("role", role)
                              formData.append("email", session?.user?.email as string)
                              formData.append("franchiseName", businessName);
                              formData.append("storeLocation", storeLocation as string)
                              formData.append("phoneNumber", phoneNumber)
                              fetch("/api/onboard-user", { method: "POST", body: formData }).then(data => data.json()).then(res => {
                                if (res.status === "success") {

                                  toast({
                                    variant: "default",
                                    title: "Success",
                                    description: "Onboarding completed successfully",
                                  });
                                  router.push('/')
                                }
                              })
                            } else {
                              toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Some submission details might be missing",
                              });
                            }

                            setOnboardingLoading(false)
                          } catch (e) {

                            setOnboardingLoading(false)
                            console.error(e);

                            toast({
                              variant: "destructive",
                              title: "Error",
                              description: "an error occured completing your onboarding",
                            });
                          }
                        }}
                        className="w-full bg-orange-400 hover:bg-orange-500"
                      >
                        {onboardingLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Onboard"
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="member">
              {" "}
              <div className="min-h-screen flex items-center justify-center">
                <Toaster />
                <Card className="border-none shadow-none">
                  <CardHeader className="flex items-center justify-center">
                    <CardTitle>Member Onboarding</CardTitle>
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
                          Phone Number
                        </label>
                        <input
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                          value={phoneNumber}
                          type="tel"
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <div className="space-y-4 pt-2">
                      <Button
                        disabled={onboardingLoading}
                        onClick={() => {
                          try {
                            if (phoneNumber && role) {
                              setOnboardingLoading(true);
                              const formData = new FormData()
                              formData.append("role", role)
                              formData.append("email", session?.user?.email as string)
                              formData.append("phoneNumber", phoneNumber)
                              fetch("/api/onboard-user", { method: "POST", body: formData }).then(data => data.json()).then(res => {
                                if (res.status === "success") {

                                  toast({
                                    variant: "default",
                                    title: "Success",
                                    description: "Onboarding completed successfully",
                                  });

                                  router.push('/')
                                } else {

                                  toast({
                                    variant: "destructive",
                                    title: "Error",
                                    description: "Error completing Onboarding",
                                  });
                                }
                              })
                            } else {
                              toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Some submission details might be missing",
                              });
                            }

                            setOnboardingLoading(false)
                          } catch (e) {
                            setOnboardingLoading(false)
                            console.error(e);

                            toast({
                              variant: "destructive",
                              title: "Error",
                              description: "an error occured completing your onboarding",
                            });
                          }
                        }}
                        className="w-full bg-orange-400 hover:bg-orange-500"
                      >
                        {onboardingLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Onboard"
                        )}
                      </Button>

                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    )
  }
  if (status === "unauthenticated") {
    signIn(undefined, { redirect: false, redirectTo: "/new-user" });
  }
}

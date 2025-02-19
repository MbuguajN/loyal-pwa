"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function ProfilePage() {
  const [username, setUsername] = useState("JohnDoe")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=100&width=100")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }



  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
          Change Profile Picture
        </Label>
        <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <Button className="w-full mt-6" onClick={() => console.log("Save changes")}>
        Save Changes
      </Button>

      <div className="mt-8 text-center">
        <Button variant="outline"  onClick={() => signOut()} className="w-full">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  )
}

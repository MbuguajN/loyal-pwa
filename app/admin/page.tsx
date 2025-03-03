"use client"

import { Award, QrCode, Users } from "lucide-react"
import React from "react"
export default function Dashboard() {
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <style jsx global>{`
        /* Base styles */
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --card: 0 0% 100%;
          --card-foreground: 222.2 84% 4.9%;
          --primary: 221.2 83.2% 53.3%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96.1%;
          --secondary-foreground: 222.2 47.4% 11.2%;
          --muted: 210 40% 96.1%;
          --muted-foreground: 215.4 16.3% 46.9%;
          --border: 214.3 31.8% 91.4%;
          --radius: 0.5rem;
        }
        
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --card: 222.2 84% 4.9%;
          --card-foreground: 210 40% 98%;
          --primary: 217.2 91.2% 59.8%;
          --primary-foreground: 222.2 47.4% 11.2%;
          --secondary: 217.2 32.6% 17.5%;
          --secondary-foreground: 210 40% 98%;
          --muted: 217.2 32.6% 17.5%;
          --muted-foreground: 215 20.2% 65.1%;
          --border: 217.2 32.6% 17.5%;
        }
      `}</style>

      <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 md:px-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-auto rounded-full p-2 hover:bg-[hsl(var(--muted))]"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto w-full max-w-6xl">
            {/* Metrics Card */}
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-[hsl(var(--border))] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Award className="h-8 w-8 text-[hsl(var(--primary))]" />
                  <h3 className="mt-2 text-xl font-bold">12,345</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Points Awarded</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Users className="h-8 w-8 text-[hsl(var(--primary))]" />
                  <h3 className="mt-2 text-xl font-bold">1,234</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Registered Members</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Award className="h-8 w-8 text-[hsl(var(--primary))] rotate-180" />
                  <h3 className="mt-2 text-xl font-bold">5,678</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Points Redeemed</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              {/* Scan Button */}
              <button
                className="flex-1 inline-flex h-20 items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-lg font-medium text-[hsl(var(--primary-foreground))] shadow hover:bg-[hsl(var(--primary))/90] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] disabled:pointer-events-none disabled:opacity-50"
                onClick={() => alert("Scan functionality")}
              >
                <QrCode className="mr-2 h-6 w-6" />
                Scan
              </button>

              {/* Reward Button */}
              <button
                className="flex-1 inline-flex h-20 items-center justify-center rounded-md bg-[hsl(var(--secondary))] px-4 py-2 text-lg font-medium text-[hsl(var(--secondary-foreground))] shadow-sm hover:bg-[hsl(var(--secondary))/90] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--secondary))] disabled:pointer-events-none disabled:opacity-50"
                onClick={() => alert("Reward functionality")}
              >
                <Award className="mr-2 h-6 w-6" />
                Reward
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


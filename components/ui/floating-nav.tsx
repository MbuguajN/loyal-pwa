import Link from "next/link"
import { Home, Map, HandCoins, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, href: "/" },
  { icon: Map, href: "/search" },
  { icon: HandCoins, href: "/notifications" },
  { icon: User, href: "/profile" },
]

export function FloatingNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 p-2 backdrop-blur-md">
      <nav className="flex items-center space-x-2">
        {navItems.map((item) => (
          <Button key={item.href} asChild variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.href.slice(1) || "Home"}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}


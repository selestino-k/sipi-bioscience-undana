/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EhccAlv2fOc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Microscope, Plus, User } from "lucide-react"
import { auth } from "@/lib/auth"
import { UserDropdown } from "./user-dropdown"
import { NavDrawer } from "./navbar-drawer"
import { NavDropdown } from "./nav-dropdown"
import { ModeToggle } from "../dark-switch"
import { Button } from "../ui/button"

export default async function NavBar() {
  const session = await auth()
  
  return (
    <header className="drop-shadow-lg fixed top-0 z-50 w-full py-2 bg-primary backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center text-white justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Microscope/>
          <div className="grid grid-flow-col grid-rows-2">
            <span className="text-lg font-bold">SIPI Lab Bioscience</span>
            <span className="text-sm">UPT Lab Terpadu UNDANA</span>
          </div>
        </Link>
        
        {/* Navigation links */}
        <div className="grid justify-items-end py-1">
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/pinjam" 
              className="flex items-center text-md font-medium hover:text-gray-300 dark:hover:text-gray-50" 
              prefetch={false}
            >
              <Plus/>Pinjam Sekarang
            </Link>
            <div className="flex items-center">
              <NavDropdown />
            </div>
            <div className="flex items-center gap-x-4">
              {session?.user ? (
                // Show user dropdown when logged in
                <UserDropdown 
                  user={{
                    name: session.user.name || session.user.email?.split('@')[0] || "User",
                    email: session.user.email || ""
                  }} 
                />
              ) : (
                // Show login button when not logged in
                <Button variant="ghost" asChild>
                  <Link 
                    href="/sign-in"
                    className="flex items-center gap-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
              <ModeToggle />
            </div>
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <NavDrawer 
            user={{
              name: session?.user?.name || session?.user?.email?.split('@')[0] || "User",
              email: session?.user?.email || null
            }} 
          />
        </div>
      </div>
    </header>
  )
}
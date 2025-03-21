/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EhccAlv2fOc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Microscope } from "lucide-react"
import { auth } from "@/lib/auth";
import { UserDropdown } from "./user-dropdown";
import { NavDrawer} from "./navbar-drawer";
import { NavDropdown } from "./nav-dropdown";


export default async function NavBar() {
  const session = await auth();
    // If we have a session with user data
  if (session?.user) {
    const userData = {
      // Use name if available, otherwise fallback to email
      name: session.user.name || session.user.email?.split('@')[0] || "User",
      email: session.user.email || ""
    }
    return (
      <header className="drop-shadow-lg fixed top-0 z-50 w-full py-2 bg-primary backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center text-white justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Microscope/>
            <div className="grid grid-flow-col grid-rows-2">
            <span className="text-lg font-bold">SI Peminjaman</span>
            <span className="text-sm">UPT Lab Terpadu UNDANA</span>
            </div>
          </Link>
          
          {/* Fixed navigation links with proper alignment */}
          <div className="grid justify-items-end py-1">
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/katalog" 
                className="flex items-center text-md font-medium hover:text-gray-300 dark:hover:text-gray-50" 
                prefetch={false}
              >
                Katalog
              </Link>
              <Link 
                href="/pinjam" 
                className="flex items-center text-md font-medium hover:text-gray-300 dark:hover:text-gray-50" 
                prefetch={false}
              >
                Pinjam
              </Link>
              <div className="flex items-center">
                <NavDropdown />
              </div>
              <div className="flex items-center">
                <UserDropdown user={userData} />
              </div>
            </nav>
          </div>
          
          {/* Mobile menu button and user dropdown */}
          <div className="flex md:hidden items-center gap-2">
            <NavDrawer />
          </div>
        </div>
      </header>
    )
}
}
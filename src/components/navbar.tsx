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
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Microscope/>
            <span className="text-lg font-bold">UPT Lab Terpadu Undana</span>
          </Link>
          <nav className="hidden space-x-20 md:inline-flex">
            <Link href="/katalog" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
              Katalog
            </Link>
            <Link href="/pinjam" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
              Pinjam
            </Link>
            <Link href="/daftar-alat" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
              Inventaris
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
              Kontak
            </Link>
          </nav>
          {/* Desktop user dropdown */}
          <div className="hidden md:flex items-center gap-2">
            <UserDropdown user={userData} />
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
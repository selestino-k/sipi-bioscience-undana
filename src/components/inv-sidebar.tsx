import {Calculator, FlaskConical, Pipette, Armchair } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { auth } from "@/lib/auth"
import { NavUser } from "./sidebar-user"

const items = [
  {
    title: "Daftar Alat",
    url: "/daftar-alat",
    icon: Pipette,
  },
  {
    title: "Daftar Bahan",
    url: "/daftar-bahan",
    icon: FlaskConical,
  },
  {
    title: "Daftar Instrumen",
    url: '/daftar-instrumen',
    icon: Calculator,
  },
  {
    title: "Daftar Barang",
    url: "/daftar-barang",
    icon: Armchair,
  },
]

export async function AppSidebar() {
  const session = await auth();
  
  // Early return if no session
  if (!session?.user) {
    return null;
  }
  
  const userData = {
    // Use name if available, otherwise fallback to email
    name: session.user.name || session.user.email?.split('@')[0] || "User",
    email: session.user.email || ""
  }

  return (
    <Sidebar side="left" className="bg-white dark:bg-gray-950 border-r shadow-sm">
      <SidebarHeader className="bg-white dark:bg-gray-950">
        <NavUser user={userData}/>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-gray-950">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

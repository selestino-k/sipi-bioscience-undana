import { Calendar, Home, Calculator, FlaskConical, Pipette, Armchair, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@/components/ui/dropdown-menu" 
import { NavUser } from "./sidebar-user"
import { auth } from "@/lib/auth"

const items = [
  {
    title: "Beranda Admin",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Manajemen Peminjaman",
    url: "/admin/rentals",
    icon: Calendar,
  },
  {
    title: " Daftar Alat",
    url: "/admin/daftar-alat",
    icon: Pipette,
  },
  {
    title: " Daftar Bahan",
    url: "/admin/daftar-bahan",
    icon: FlaskConical,
  },
  {
    title: " Daftar Instrumen",
    url: '/admin/daftar-instrumen',
    icon: Calculator,
  },
  {
    title: " Daftar Barang",
    url: "/admin/daftar-barang",
    icon: Armchair,
  },
  {
    title: "Daftar Pengguna",
    url: "/admin/daftar-admin",
    icon: User,
  }
]

// Sidebar component with explicit background styling
export async function AdminAppSidebar(){
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }
  
  const userData = {
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
          <DropdownMenu>
          </DropdownMenu>
            <SidebarGroupLabel>PANEL ADMIN</SidebarGroupLabel>
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
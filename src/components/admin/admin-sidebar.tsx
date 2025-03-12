import { Calendar, Home,Calculator, FlaskConical, Pipette,Armchair,User } from "lucide-react"
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
import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu" 
// Menu items.
import { NavUser } from "../sidebar-user"
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

// Sidebar component.
export async function AdminAppSidebar(){
  const session = await auth();
  // If we have a session with user data
  if (session?.user) {
    const userData = {
      // Use name if available, otherwise fallback to email
      name: session.user.name || session.user.email?.split('@')[0] || "User",
      email: session.user.email || ""
    }

  return (
    <Sidebar side="left">
      <SidebarHeader>
        <NavUser user={userData}/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
          <DropdownMenu>
            </DropdownMenu>
            <SidebarGroupLabel>PANEL ADMIN</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
}
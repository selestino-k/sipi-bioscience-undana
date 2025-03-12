
import { Calendar, Home,Calculator, FlaskConical, Pipette,Armchair } from "lucide-react"
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

// Menu items.
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
  {
    title: "Jadwal Peminjaman",
    url: "/jadwal",
    icon: Calendar,
  },
]
export async function AppSidebar(){
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


import { Calendar, Home, Search,Calculator, FlaskConical, Armchair } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
// Menu items.
import { Button } from "@/components/ui/button"
import { SignOut } from "../sign-out"


const items = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Daftar Alat",
    url: "/daftar-alat",
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
    title: "Jadwal",
    url: "/jadwal",
    icon: Calendar,
  },
  {
    title: "Cari",
    url: "#",
    icon: Search,
  }
  
]
export function AppSidebar(){

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SI INVENTARIS LAB BIOSCIENCE</SidebarGroupLabel>
          <SidebarGroupContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Akun</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOut></SignOut>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
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

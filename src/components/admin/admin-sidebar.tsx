
import { Calendar, Home,Calculator, FlaskConical, Pipette,Armchair,User } from "lucide-react"
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
    title: "Manajemen Daftar Alat",
    url: "/admin/daftar-alat",
    icon: Pipette,
  },
  {
    title: "Manajemen Daftar Bahan",
    url: "/admin/daftar-bahan",
    icon: FlaskConical,
  },
  {
    title: "Manajemen Daftar Instrumen",
    url: '/admin/daftar-instrumen',
    icon: Calculator,
  },
  {
    title: "Manajemen Daftar Barang",
    url: "/admin/daftar-barang",
    icon: Armchair,
  },
  {
    title: "Tambah Admin",
    url: "/admin/create-admin",
    icon: User,
  }
  
  
]
export function AdminAppSidebar(){

  return (
    <Sidebar side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PANEL ADMIN</SidebarGroupLabel>

          <SidebarGroupContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Akun</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    <SignOut/>
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

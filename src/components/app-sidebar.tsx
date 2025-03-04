
import { Calendar, Home,Calculator, FlaskConical, Pipette,Armchair, User } from "lucide-react"
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
import { SignOut } from "./sign-out"
import { auth } from "@/lib/auth"



const items = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
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
    title: "Jadwal",
    url: "/jadwal",
    icon: Calendar,
  },
]
export async function AppSidebar(){
  const session = await auth();

  return (
    <Sidebar side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SI INVENTARIS LAB BIOSCIENCE</SidebarGroupLabel>
          <SidebarGroupContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                <User />{session?.user?.name || 'Akun'}
                  </Button>
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

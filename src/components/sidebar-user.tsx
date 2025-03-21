"use client"

import {
  EllipsisVertical,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {Avatar} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SignOut } from "./sign-out"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
  }
}) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false)
   // Prevent closing when clicking inside items by stopping event propagation
   const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't call setOpen(false) here to keep the dropdown open
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <User/>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
          <Link href="/admin/profil" passHref>
            <div onClick={handleItemClick} className="w-full">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Pengaturan Akun
              </DropdownMenuItem>
            </div>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div onClick={handleItemClick} className="w-full">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <SignOut />
          </DropdownMenuItem>
        </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

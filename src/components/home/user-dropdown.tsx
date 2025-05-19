"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { User,Shield, Settings, List } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { SignOut } from "../sign-out"
import { useState } from "react"

export function UserDropdown({
    user,
}: {
    user: {
        name: string
        email: string
        role?: string
    }
}) {
  const [open, setOpen] = useState(false)
  const isAdmin = user.role === "ADMIN"

  
  // Prevent closing when clicking inside items by stopping event propagation
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't call setOpen(false) here to keep the dropdown open
  }
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
            <Avatar className="h-8 w-4 rounded-lg mr-2">
                <AvatarFallback className="rounded-lg"><User/></AvatarFallback>
            </Avatar>
            {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <Link href="/admin" passHref>
              <div onClick={handleItemClick} className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Shield className="mr-2 h-4 w-4" />
                  Dashboard Admin
                </DropdownMenuItem>
              </div>
            </Link>  
          <DropdownMenuGroup/>
        <DropdownMenuSeparator />
        <Link href="/pinjaman" passHref>
            <div onClick={handleItemClick} className="w-full">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <List className="mr-2 h-4 w-4" />
                Pinjaman Saya
              </DropdownMenuItem>
            </div>
          </Link>
          <Link href="/pengaturan-akun" passHref>
            <div onClick={handleItemClick} className="w-full">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Settings className="mr-2 h-4 w-4" />
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
  )
}


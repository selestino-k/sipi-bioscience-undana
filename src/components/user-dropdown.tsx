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
import { User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { SignOut } from "./sign-out"
import { useState } from "react"

export function UserDropdown({
    user,
}: {
    user: {
        name: string
        email: string
    }
}) {
  const [open, setOpen] = useState(false)
  
  // Prevent closing when clicking inside items by stopping event propagation
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't call setOpen(false) here to keep the dropdown open
  }
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
            <Avatar className="h-8 w-8 rounded-lg mr-2">
                <AvatarFallback className="rounded-lg"><User/></AvatarFallback>
            </Avatar>
            {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profil" passHref>
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
  )
}


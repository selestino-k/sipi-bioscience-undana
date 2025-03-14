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
import { SignOut } from "./sign-out"

export function UserDropdown({
    user,
}: {
    user: {
        name: string
        email: string
    }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       
        <Button variant="secondary">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg"><User/></AvatarFallback>
            </Avatar>
            {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuItem>{user.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Pengaturan Akun
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


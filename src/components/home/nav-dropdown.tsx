import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Calculator, FlaskConical, Pipette, Armchair, Box } from "lucide-react"
import Link from "next/link"

export function NavDropdown(){
  return (
    <DropdownMenu><Box/>
      <DropdownMenuTrigger>
        Inventaris
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Inventaris </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem>
            <Pipette/><Link href="/daftar-alat">Daftar Alat</Link>
             </DropdownMenuItem>
             <DropdownMenuItem>
             <Calculator/><Link href="/daftar-instrumen">Daftar Instrumen</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <FlaskConical/><Link href="/daftar-bahan">Daftar Bahan</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Armchair/>  <Link href="/daftar-barang">Daftar Barang</Link>
            </DropdownMenuItem>
        </DropdownMenuGroup>       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


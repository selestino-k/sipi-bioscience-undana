  "use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { RentInstrumentDialog } from "./rent-dialog"

// This type is used to define the shape of our data.
export type Instrumen = {
    instrument_id: number
    merk_instrumen: string
    nama_instrumen: string
    tipe_instrumen: string
    rentals: string
    layanan: string
    status: string
    updatedAt: Date
}

export const columns: ColumnDef<Instrumen>[] = [
 {
    accessorKey: "instrument_id",
    header: "ID",
  },
  {
    accessorKey: "merk_instrumen",
    header: "Merk",
  },
  {
    accessorKey: "nama_instrumen",
    header: "Nama",
  },
  {
    accessorKey: "tipe_instrumen",
    header: "Tipe",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block
          ${status === 'TERSEDIA' ? 'bg-green-100 text-green-800' : 
            status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </div>
      )
    }
  },
  {
    accessorKey: "rentals",
    header: "Pengguna sekarang",
    cell: ({ row }) => {
      const rentals = row.getValue("rentals") as Rental[]
      const activeRental = Array.isArray(rentals) ? 
      rentals.find(rental => rental.status === 'PENDING' && !rental.end_date) : null
    
      return activeRental ? activeRental.user_email : "Tidak ada"
    }
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const instrument = row.original
      
      // Create a component to use React hooks
      function ActionCell() {
        const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
        const user = {
          id: "cm7sfxdkj0000p02068rxuxh6",
          email: "user@user.com"
        } // hardcoded user for now

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                
                <DropdownMenuItem 
                  disabled={instrument.status !== 'TERSEDIA'}
                  onClick={() => setIsRentDialogOpen(true)}>
                  Gunakan Instrumen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <RentInstrumentDialog 
              instrument={instrument} 
              isOpen={isRentDialogOpen} 
              onOpenChange={setIsRentDialogOpen} 
              user={user}
            />
          </>
        )
      }

      return <ActionCell />;
    }
  },
]

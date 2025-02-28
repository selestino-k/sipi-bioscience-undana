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
    rental: string
    layanan: string
    status: string
    user: string
    updatedAt: Date
}

export const columns: ColumnDef<Instrumen>[] = [
 {
    accessorKey: "id",
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
    accessorKey: "user",
    header: "Pengguna sekarang",
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const instrument = row.original
      const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
      
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
              <DropdownMenuItem asChild>
                <Link href={`/daftar-instrumen/${instrument.id}/detail`}>
                  Lihat Detail
                </Link>
              </DropdownMenuItem>
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
            user={{ id: "1", name: "John Doe", email: "john.doe@example.com" }} // Replace with actual user data
          />
        </>
      )
    }
  },
]

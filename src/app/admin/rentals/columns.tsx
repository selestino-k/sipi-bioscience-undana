"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { approveRental, rejectRental, completeRental } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

// Define the type for the rental data
type Rental = {
  id: string
  purpose: string
  start_date: Date
  end_date: Date
  status: string
  createdAt: Date
  updatedAt: Date
  instrument: {
    instrument_id: number
    nama_instrumen: string
    merk_instrumen: string
  }
  user: {
    name: string | null
    email: string
  }
}

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>
  },
  {
    accessorKey: "instrument.nama_instrumen",
    header: "Instrumen",
    cell: ({ row }) => {
      const instrumen = row.original.instrumen
      return (
        <div>
          <div className="font-medium">{instrumen.nama_instrumen}</div>
          <div className="text-sm text-gray-500">{instrumen.merk_instrumen}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "user.email",
    header: "Peminjam",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div>
          <div className="font-medium">{user.name || "N/A"}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "purpose",
    header: "Tujuan",
    cell: ({ row }) => (
      <span className="truncate max-w-[200px] block" title={row.getValue("purpose")}>
        {row.getValue("purpose")}
      </span>
    )
  },
  {
    accessorKey: "start_date",
    header: "Tanggal Mulai",
    cell: ({ row }) => format(new Date(row.getValue("start_date")), "dd/MM/yyyy")
  },
  {
    accessorKey: "end_date",
    header: "Tanggal Selesai",
    cell: ({ row }) => format(new Date(row.getValue("end_date")), "dd/MM/yyyy")
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      return (
        <Badge variant={
          status === "PENDING" ? "outline" :
          status === "APPROVED" || status === "ACTIVE" ? "default" :
          status === "REJECTED" ? "destructive" :
          status === "COMPLETED" ? "secondary" : "outline"
        }>
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Peminjaman",
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "dd/MM/yyyy HH:mm")
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const rental = row.original
      const [isLoading, setIsLoading] = useState(false)
      
      const handleStatusChange = async (action: 'approve' | 'reject' | 'complete') => {
        setIsLoading(true)
        try {
          if (action === 'approve') {
            await approveRental(rental.id)
            toast.success("Peminjaman berhasil disetujui")
          } else if (action === 'reject') {
            await rejectRental(rental.id)
            toast.success("Peminjaman berhasil ditolak")
          } else if (action === 'complete') {
            await completeRental(rental.id)
            toast.success("Peminjaman berhasil diselesaikan")
          }
          // Refresh the table
          window.location.reload()
        } catch (error) {
          toast.error(`Gagal mengubah status: ${error.message}`)
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            {rental.status === "PENDING" && (
              <>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange('approve')}
                  disabled={isLoading}
                >
                  Setujui
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange('reject')}
                  disabled={isLoading}
                >
                  Tolak
                </DropdownMenuItem>
              </>
            )}
            
            {(rental.status === "APPROVED" || rental.status === "ACTIVE") && (
              <DropdownMenuItem 
                onClick={() => handleStatusChange('complete')}
                disabled={isLoading}
              >
                Selesaikan
              </DropdownMenuItem>
            )}
            
            {(rental.status === "COMPLETED" || rental.status === "REJECTED") && (
              <DropdownMenuItem disabled>
                Tidak ada aksi tersedia
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
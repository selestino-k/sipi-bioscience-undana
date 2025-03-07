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
import { 
  approveRental, 
  rejectRental, 
  completeRental 
} from "@/lib/rent-actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Define the type for the rental data
type Rental = {
  id: string
  purpose: string
  start_date: Date | string
  end_date: Date | string
  status: string
  createdAt: Date | string
  updatedAt: Date | string
  instrument_id?: number
  instrument_name?: string  // Add flattened instrument fields
  instrument_merk?: string
  user_name?: string        // Add flattened user fields
  user_email?: string
}

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>
  },
  {
    accessorKey: "instrument_name",
    header: "Instrumen",
    cell: ({ row }) => {
      const instrumentName = row.getValue("instrument_name");
      const instrumentMerk = row.original.instrument_merk;
      
      return (
        <div>
          <div className="font-medium">{instrumentName || "N/A"}</div>
          <div className="text-sm text-gray-500">{instrumentMerk || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "user_email",
    header: "Peminjam",
    cell: ({ row }) => {
      const userEmail = row.getValue("user_email");
      const userName = row.original.user_name;
      
      return (
        <div>
          <div className="font-medium">{userName || "N/A"}</div>
          <div className="text-xs text-gray-500">{userEmail || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "purpose",
    header: "Tujuan",
    cell: ({ row }) => (
      <span className="truncate max-w-[200px] block" title={String(row.getValue("purpose") || "")}>
        {row.getValue("purpose") || ""}
      </span>
    )
  },
  {
    accessorKey: "start_date",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      try {
        const date = row.getValue("start_date");
        return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
      } catch (e) {
        return "Invalid Date";
      }
    }
  },
  {
    accessorKey: "end_date",
    header: "Tanggal Selesai",
    cell: ({ row }) => {
      try {
        const date = row.getValue("end_date");
        return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
      } catch (e) {
        return "Invalid Date";
      }
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      return (
        <Badge variant={
          status === "PENDING" ? "outline" :
          status === "DISETUJUI" || status === "AKTIF" ? "default" :
          status === "DITOLAK" ? "destructive" :
          status === "SELESAI" ? "secondary" : "outline"
        }>
          {status || "N/A"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Peminjaman",
    cell: ({ row }) => {
      try {
        const date = row.getValue("createdAt");
        return date ? format(new Date(date), "dd/MM/yyyy HH:mm") : "N/A";
      } catch (e) {
        return "Invalid Date";
      }
    }
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const rental = row.original
      const [isLoading, setIsLoading] = useState(false)
      const router = useRouter()
      
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
          router.refresh()
        } catch (error: any) {
          toast.error(`Gagal mengubah status: ${error.message || "Unknown error"}`)
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
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            
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
            
            {(rental.status === "DISETUJUI" || rental.status === "AKTIF") && (
              <DropdownMenuItem 
                onClick={() => handleStatusChange('complete')}
                disabled={isLoading}
              >
                Selesaikan
              </DropdownMenuItem>
            )}
            
            {(rental.status === "SELESAI" || rental.status === "DITOLAK") && (
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
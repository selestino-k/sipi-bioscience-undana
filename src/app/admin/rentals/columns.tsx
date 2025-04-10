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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { 
  approveRental, 
  rejectRental, 
  completeRental 
} from "@/lib/rent-actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Define the type for the rental data
type Rental = {
  id: string
  purpose: string
  start_date?: string | Date | null
  end_date?: string | Date | null
  image_url?: string | null // Optional image_url field for the image preview
  status: string
  createdAt: Date | string | null
  updatedAt: Date | string | null
  instrument_id?: number
  instrument_name?: string  | null  // Add flattened instrument fields
  instrument_merk?: string | null
  user_name?: string| null    // Add flattened user fields
  user_email?: string | null
}

// Add this component for image preview
function ImagePreview({ imageUrl, instrumentName }: { imageUrl: string, instrumentName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!imageUrl) return null;

  return (
    <>
      <div 
        className="relative h-12 w-12 rounded-md overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={imageUrl || "placeholder.svg"}
          alt={instrumentName || "Instrument Image"} 
          fill
          style={{ objectFit: "cover" }}
          sizes="64px"
          className="bg-gray-50"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{instrumentName}</DialogTitle>
          <div className="relative h-80 w-full">
            <Image 
              src={imageUrl || "placeholder.svg"} 
              alt={instrumentName || "Instrument Image"} 
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 500px"
              className="bg-gray-50 rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>
  },
  {
    accessorKey: "image_url",
    header: "Gambar",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url") as string;
      const instrument_name = row.getValue("instrument_name") as string;
  
      return image_url ? (
        <ImagePreview imageUrl={image_url} instrumentName={instrument_name} />
      ) : (
        <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      );
    }
  },
  {
    accessorKey: "instrument_name",
    header: "Instrumen",
    cell: ({ row }) => {
      const instrumentName = row.getValue("instrument_name") as string;
      const instrumentMerk = row.original.instrument_merk;
      
      return (
        <div>
          <div className="font-medium">{String(instrumentName || "N/A")}</div>
          <div className="text-sm text-gray-500">{instrumentMerk || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "user_email",
    header: "Peminjam",
    cell: ({ row }) => {
      const userEmail = row.getValue("user_email") as string;
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
        // Check if date is a valid value that can be converted to a Date
        if (date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date)) {
          return format(new Date(date), "dd/MM/yyyy");
        }
        return "N/A";
      } catch {
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
        // Check if date is a valid value that can be converted to a Date
        if (date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date)) {
          return format(new Date(date), "dd/MM/yyyy");
        }
        return "N/A";
      } catch {
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
    accessorKey: "updatedAt",
    header: "Tanggal Pengembalian",
    cell: ({ row }) => {
      try {
        const date = row.getValue("updatedAt");
        // Check if date is a valid value that can be converted to a Date
        if (date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date)) {
          return format(new Date(date), "dd/MM/yyyy HH:mm");
        }
        return "N/A";
      } catch {
        return "Invalid Date";
      }
    }
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const rental = row.original

      // Create a component to use React hooks
      // to handle the dropdown menu actions
      function RentalActions() {
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
        } catch (error: Error | unknown) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          toast.error(`Gagal mengubah status: ${errorMessage}`)
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
    return <RentalActions />
  }
  }
]
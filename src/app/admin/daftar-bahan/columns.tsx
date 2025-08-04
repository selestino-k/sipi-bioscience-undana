"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteBahan } from "@/lib/actions/admin/bahan-actions"
import { EditBahanDialog } from "./edit-bahan-dialog"
import { useRouter } from "next/navigation"



export type Bahan = {
  bahan_id: number
  nama_bahan: string
  merek_bahan?: string | null
  tipe_bahan: string
  rumus_bahan: string
  volume_bahan?: string | null
  jumlah_bahan?: string | null
  updatedAt: Date;
  status: string;
}

export const columns: ColumnDef<Bahan>[] = [
 {
    accessorKey: "bahan_id",
    header: "ID",
  },
  {
    accessorKey: "nama_bahan",
    header: "Nama",
  },
  {
    accessorKey: "rumus_bahan",
    header: "Rumus Kimia",
  },
  {
    accessorKey: "merek_bahan",
    header: "Merek",
  },
  {
    accessorKey: "tipe_bahan",
    header: "Tipe Bahan",
  },
  {
    accessorKey: "volume_bahan",
    header: "Volume Bahan",
  },
  {
    accessorKey: "jumlah_bahan",
    header: "Jumlah Bahan",
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal Pembaruan",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date
      return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
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
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const bahan = row.original
      
      // Create a component to use React hooks
      function ActionCell() {
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
        const [isDeleting, setIsDeleting] = useState(false)
        const router = useRouter();

        const handleDelete = async () => {
          try {
            setIsDeleting(true)
            await deleteBahan(bahan.bahan_id)
            toast.success("Bahan kimia berhasil dihapus")
            router.refresh()
          } catch (error) {
            console.error("Failed to delete material:", error)
            toast.error("Gagal menghapus Bahan Kimia")
          } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
          }
        }
        
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem 
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini akan menghapus bahan kimia &quot;{bahan.nama_bahan} ({bahan.rumus_bahan})&quot; secara permanen dan tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault()
                      handleDelete()
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            {/* Edit Dialog */}
            <EditBahanDialog 
              bahan={bahan} 
              isOpen={isEditDialogOpen} 
              onOpenChange={setIsEditDialogOpen} 
            />
          </>
        )
      }

      return <ActionCell />;
    }
  },
]

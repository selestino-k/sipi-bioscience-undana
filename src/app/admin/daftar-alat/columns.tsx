"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, ImagePlay } from "lucide-react"
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
import { deleteAlat } from "@/lib/actions/admin/alat-actions"
import { EditAlatDialog } from "./edit-alat-dialog"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export type Alat = {
  alat_id: number
  nama_alat: string
  jumlah_alat: string
  updatedAt: string
  status: string
  image_url: string | null
}

export const columns: ColumnDef<Alat>[] = [
  {
    accessorKey: "alat_id",
    header: "ID",
  },
  {
    accessorKey: "nama_alat",
    header: "Nama",
  },
  {
    accessorKey: "jumlah_alat",
    header: "Jumlah",
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal Pembaruan",
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
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => {
      const alat = row.original
      
      // Create a component to use React hooks
      function ActionCell() {
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
        const [showImagePreview, setShowImagePreview] = useState(false);
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
        const [isDeleting, setIsDeleting] = useState(false)
        const router = useRouter();

        const handleDelete = async () => {
          try {
            setIsDeleting(true)
            await deleteAlat(alat.alat_id)
            toast.success("Alat Lab berhasil dihapus")
            // Use router.refresh() instead of window.location.reload()
            router.refresh()
          } catch (error) {
            console.error("Failed to delete tool:", error)
            toast.error("Gagal menghapus Alat Lab")
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
                {alat.image_url && (
                  <DropdownMenuItem onClick={() => setShowImagePreview(true)}>
                    <ImagePlay className="h-4 w-4 mr-2" />
                  Lihat Gambar
                  </DropdownMenuItem>
                )}
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
                    Tindakan ini akan menghapus alat laboratorium &quot;{alat.nama_alat}&quot; secara permanen dan tidak dapat dibatalkan.
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
            <EditAlatDialog 
              alat={alat} 
              isOpen={isEditDialogOpen} 
              onOpenChange={setIsEditDialogOpen} 
            />
            {/* Simple Image Preview Dialog */}
            {alat.image_url && (
              <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{alat.nama_alat}</DialogTitle>
                  </DialogHeader>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={alat.image_url}
                      alt={alat.nama_alat}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="bg-gray-50"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )
      }

      return <ActionCell />;
    }
  },
  
]

"use client"

import { deleteBarang } from "@/lib/actions/admin/barang-actions"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
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
import { EditBarangDialog } from "./edit-barang-dialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Barang={
    barang_id: number
    merk_barang: string
    nama_barang: string
    tipe_barang: string
    jumlah_barang: number
}

export const columns: ColumnDef<Barang>[] = [
 {
    accessorKey: "barang_id",
    header: "ID",
  },
  {
    accessorKey: "merk_barang",
    header: "Merk",
  },
  {
    accessorKey: "nama_barang",
    header: "Nama",
  },
  {
    accessorKey: "tipe_barang",
    header: "Tipe",
  },
  {
    accessorKey: "jumlah_barang",
    header: "Jumlah",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const barang = row.original
      
      // Create a component to use React hooks
      function ActionCell() {
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
        const [isDeleting, setIsDeleting] = useState(false)
        const router = useRouter();

        const handleDelete = async () => {
          try {
            setIsDeleting(true)
            await deleteBarang(barang.barang_id)
            toast.success("Barang berhasil dihapus")
            // Use router.refresh() instead of window.location.reload()
            router.refresh()
          } catch (error) {
            console.error("Failed to delete item:", error)
            toast.error("Gagal menghapus Barang")
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
                <DropdownMenuItem asChild>
                  <Link href={`/admin/daftar-instrumen/${barang.barang_id}/detail`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Link>
                </DropdownMenuItem>
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
                    Tindakan ini akan menghapus barang &quot;{barang.nama_barang}&quot; secara permanen dan tidak dapat dibatalkan.
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
            <EditBarangDialog 
              barang={barang} 
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

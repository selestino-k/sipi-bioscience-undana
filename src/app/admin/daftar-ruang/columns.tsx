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
import { deleteRuang } from "@/lib/actions/admin/ruang-actions"
import { useRouter } from "next/navigation"
import { EditRuangDialog } from "./edit-ruang-dialog"


export type Ruang = {
  ruang_id: number
  nama_ruang: string
  ruang_desc: string | null
  updatedAt?: Date | null 
}

export const columns: ColumnDef<Ruang>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: "nama_ruang",
    header: "Nama",
  },
  {
    accessorKey: "ruang_desc",
    header: "Deskripsi",
    cell: ({ row }) => {
      const desc = row.getValue("ruang_desc") as string
      return desc.length > 50 ? `${desc.slice(0, 50)}...` : desc
    }
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
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => {
      const ruang = row.original
      
      // Create a component to use React hooks
      function ActionCell() {
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
        const [isDeleting, setIsDeleting] = useState(false)
        const router = useRouter();

        const handleDelete = async () => {
          try {
            setIsDeleting(true)
            await deleteRuang(ruang.ruang_id)
            toast.success("Ruang Lab berhasil dihapus")
            // Use router.refresh() instead of window.location.reload()
            router.refresh()
          } catch (error) {
            console.error("Failed to delete room:", error)
            toast.error("Gagal menghapus Ruang Lab")
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
                    Tindakan ini akan menghapus ruangan laboratorium &quot;{ruang.nama_ruang}&quot; secara permanen dan tidak dapat dibatalkan.
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
            

        {/* Edit Dialog can be implemented similarly if needed */}
          <EditRuangDialog
            isOpen={isEditDialogOpen}  
            onOpenChange={setIsEditDialogOpen}
            ruang={ruang}
          />
        </>

        
        )
      }

      return <ActionCell />;
    }
  },
  
]

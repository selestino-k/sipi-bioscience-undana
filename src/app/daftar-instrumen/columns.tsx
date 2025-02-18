"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Instrumen = {
    id: number
    merk_instrumen: string
    nama_instrumen: string
    tipe_instrumen: string
    layanan: string
    status: string
}

export const columns: ColumnDef<Instrumen>[] = [
 {
    accessorKey: "id",
    header: "No",
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
  },
  {
    accessorKey: "action",
    header: "Aksi",
    id: "actions",
    cell: () => {
      return (
      <Button asChild>
        <Link href="/">
          <Plus />
        </Link>
      </Button>      )
    },
    
  },
]

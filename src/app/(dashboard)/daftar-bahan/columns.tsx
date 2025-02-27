"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export type Bahan = {
  id: number
  nama_bahan: string
  tipe_bahan: string
  updatedAt: Date;
  status: string;
}

export const columns: ColumnDef<Bahan>[] = [
 {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "nama_bahan",
    header: "Nama",
  },
  {
    accessorKey: "tipe_bahan",
    header: "Tipe",
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal",
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

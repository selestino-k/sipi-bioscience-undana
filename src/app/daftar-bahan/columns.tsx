"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Bahan = {
  id_bahan: number
  nama_bahan: string
  tipe_bahan: string
  date: string
  status: 'pending' | 'tersedia';
}

export const columns: ColumnDef<Bahan>[] = [
 {
    accessorKey: "id_alat",
    header: "ID",
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
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

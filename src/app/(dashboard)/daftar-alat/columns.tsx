"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Alat = {
  alat_id: number
  nama_alat: string
  jumlah_alat: string
  status: string
}

export const columns: ColumnDef<Alat>[] = [
 {
    accessorKey: "id",
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
    accessorKey: "status",
    header: "Status",
  }
]

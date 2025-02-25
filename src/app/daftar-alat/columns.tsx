"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Alat = {
  id: number
  merk_alat: string
  nama_alat: string
  tipe_alat: string
  layanan: string
  updatedAt: Date
  status: string
}

export const columns: ColumnDef<Alat>[] = [
 {
    accessorKey: "id_alat",
    header: "ID",
  },
  {
    accessorKey: "merk_alat",
    header: "Merk",
  },
  {
    accessorKey: "nama_alat",
    header: "Nama",
  },
  {
    accessorKey: "tipe_alat",
    header: "Tipe",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
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

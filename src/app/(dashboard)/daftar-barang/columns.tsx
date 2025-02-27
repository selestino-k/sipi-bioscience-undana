"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Barang={
    id: number
    merk_barang: string
    nama_barang: string
    tipe_barang: string
}

export const columns: ColumnDef<Barang>[] = [
 {
    accessorKey: "id",
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
]

"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Alat = {
  id_alat: number
  merk_alat: string
  nama_alat: string
  tipe_alat: string
  layanan: string
  date: string
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'tersedia';
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

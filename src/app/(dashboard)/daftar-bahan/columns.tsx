"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Bahan = {
  bahan_id: number
  nama_bahan: string
  rumus_bahan: string
  merek_bahan?: string | null
  jumlah_bahan?: string | null
  volume_bahan?: string | null
  tipe_bahan: string
  updatedAt: Date;
  status: string;
}

export const columns: ColumnDef<Bahan>[] = [
 {
    accessorKey: "bahan_id",
    header: "ID",
  },
  {
    accessorKey: "nama_bahan",
    header: "Nama",
  },
  {
    accessorKey: "rumus_bahan",
    header: "Rumus Kimia",
  },
  {
    accessorKey: "merek_bahan",
    header: "Merek",
  },
  {
    accessorKey: "tipe_bahan",
    header: "Tipe Bahan",
  },
  {
    accessorKey: "jumlah_bahan",
    header: "Jumlah Bahan",
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
  
]

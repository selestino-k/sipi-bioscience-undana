"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Bahan = {
  bahan_id: number
  nama_bahan: string
  tipe_bahan: string
  updatedAt: Date;
  status: string;
}

export const columns: ColumnDef<Bahan>[] = [
 {
    accessorKey: "id",
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
    accessorKey: "updatedAt",
    header: "Tanggal",
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

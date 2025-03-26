"use client"
import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
export type Instrumen = {
    instrumen_id: number
    merk_instrumen: string
    nama_instrumen: string
    tipe_instrumen: string
    layanan: string
    status: string
    updatedAt: Date
}

export const columns: ColumnDef<Instrumen>[] = [
 {
    accessorKey: "instrumen_id",
    header: "ID",
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

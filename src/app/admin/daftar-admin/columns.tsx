"use client"
import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
export type User = {
    id: number
    email: string
    role: string 
    createdAt: Date
}

export const columns: ColumnDef<Instrumen>[] = [
 {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "role",
    header: "Peran (Role)",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pembuatan",
  }
]

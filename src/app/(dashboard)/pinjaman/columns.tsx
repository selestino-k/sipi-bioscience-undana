"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"



// Define the type for the rental data
type Rental = {
  id: string
  purpose: string
  start_date: Date | string | null
  end_date: Date | string | null
  status: string 
  image_url?: string | null  // Optional image_url field for the image preview
  createdAt: Date | string | null
  updatedAt: Date | string | null
  instrument_id?: string | null
  instrument_name?: string  | null // Add flattened instrument fields
  instrument_merk?: string | null
  instrument_tipe?: string | null
  user_name?: string | null         // Add flattened user fields
  user_email?: string | null
}

// Add this component for image preview
function ImagePreview({ imageUrl, instrumentName, instrumenMerk, instrumenTipe }: { imageUrl: string, instrumentName: string, instrumenMerk: string, instrumenTipe: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!imageUrl) return null;

  return (
    <>
      <div 
        className="relative h-12 w-12 rounded-md overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={imageUrl || "placeholder.svg"}
          alt={instrumentName || "Instrument Image"} 
          fill
          style={{ objectFit: "cover" }}
          sizes="64px"
          className="bg-gray-50"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{instrumentName}</DialogTitle>
          <DialogDescription>{instrumenMerk} {instrumenTipe}</DialogDescription>
          <div className="relative h-80 w-full">
            <Image 
              src={imageUrl || "placeholder.svg"} 
              alt={instrumentName || "Instrument Image"} 
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 500px"
              className="bg-gray-50 rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>
  },
  {
    accessorKey: "image_url",
    header: "Gambar",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url") as string;
      const instrument_name = row.getValue("instrument_name") as string;
      const instrument_merk = row.original.instrument_merk as string;
      const instrumen_tipe = row.original.instrument_tipe as string;
  
      return image_url ? (
        <ImagePreview imageUrl={image_url} instrumentName={instrument_name} instrumenMerk={instrument_merk} instrumenTipe={instrumen_tipe} />
      ) : (
        <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      );
    }
  },
  {
    accessorKey: "instrument_name",
    header: "Instrumen",
    cell: ({ row }) => {
      const instrumentName = row.getValue("instrument_name") as string;
      const instrumentMerk = row.original.instrument_merk;
      const instrumenTipe = row.original.instrument_tipe;

      
      return (
        <div>
          <div className="font-medium">{instrumentName || "N/A"}</div>
          <div className="text-sm text-gray-500">{instrumentMerk || ""} {instrumenTipe || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "user_email",
    header: "Peminjam",
    cell: ({ row }) => {
      const userEmail = row.getValue("user_email") as string;
      const userName = row.original.user_name;
      
      return (
        <div>
          <div className="font-medium">{userName || "N/A"}</div>
          <div className="text-xs text-gray-500">{userEmail || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "purpose",
    header: "Tujuan",
    cell: ({ row }) => (
      <span className="truncate max-w-[200px] block" title={String(row.getValue("purpose") || "")}>
        {row.getValue("purpose") || ""}
      </span>
    )
  },
  {
    accessorKey: "start_date",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      try {
        const date = row.getValue("start_date");
        // Check if date is a valid value that can be passed to Date constructor
        return date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date) 
          ? format(new Date(date as string | number | Date), "dd/MM/yyyy") 
          : "N/A";
      } catch {
        return "Invalid Date";
      }
    }
  },
  {
    accessorKey: "end_date",
    header: "Tanggal Selesai",
    cell: ({ row }) => {
      try {
        const date = row.getValue("end_date");
        // Check if date is a valid value that can be passed to Date constructor
        return date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date) 
          ? format(new Date(date as string | number | Date), "dd/MM/yyyy") 
          : "N/A";
      } catch {
        return "Invalid Date";
      }
    }
      
    
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      return (
        <Badge variant={
          status === "PENDING" ? "outline" :
          status === "DISETUJUI" || status === "AKTIF" ? "default" :
          status === "DITOLAK" ? "destructive" :
          status === "SELESAI" ? "secondary" : "outline"
        }>
          {status || "N/A"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal Pengembalian",
    cell: ({ row }) => {
      try {
        const date = row.getValue("updatedAt");
        // Check if date is a valid value that can be passed to Date constructor
        return date && (typeof date === 'string' || typeof date === 'number' || date instanceof Date) 
          ? format(new Date(date), "dd/MM/yyyy HH:mm") 
          : "N/A";
      } catch {
        return "Invalid Date";
      }
    }
  },
  
]
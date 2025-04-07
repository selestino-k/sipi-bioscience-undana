"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"



// Define the type for the rental data
type Rental = {
  id: string
  purpose: string
  start_date: Date | string
  end_date: Date | string
  status: string
  image_url?: string
  // Optional image_url field for the image preview
  createdAt: Date | string
  updatedAt: Date | string
  instrument_id?: string
  instrument_name?: string  // Add flattened instrument fields
  instrument_merk?: string
  user_name?: string        // Add flattened user fields
  user_email?: string
}

// Add this component for image preview
function ImagePreview({ imageUrl, instrumentName }: { imageUrl: string, instrumentName: string }) {
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
  
      return image_url ? (
        <ImagePreview imageUrl={image_url} instrumentName={instrument_name} />
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
      const instrumentName = row.getValue("instrument_name");
      const instrumentMerk = row.original.instrument_merk;
      
      return (
        <div>
          <div className="font-medium">{instrumentName || "N/A"}</div>
          <div className="text-sm text-gray-500">{instrumentMerk || ""}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "user_email",
    header: "Peminjam",
    cell: ({ row }) => {
      const userEmail = row.getValue("user_email");
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
        return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
      } catch (e) {
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
        return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
      } catch (e) {
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
        return date ? format(new Date(date), "dd/MM/yyyy HH:mm") : "N/A";
      } catch (e) {
        return "Invalid Date";
      }
    }
  },
  
]
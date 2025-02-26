import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const getRentalStatusLabel = (status: string) => {
  switch (status) {
    case "PENDING":
      return { label: "Menunggu", variant: "outline" };
    case "APPROVED":
      return { label: "Disetujui", variant: "success" };
    case "REJECTED":
      return { label: "Ditolak", variant: "destructive" };
    case "ACTIVE":
      return { label: "Sedang Dipinjam", variant: "default" };
    case "RETURNED":
      return { label: "Dikembalikan", variant: "secondary" };
    default:
      return { label: status, variant: "outline" };
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "instrumen.name",
    header: "Nama Instrumen",
  },
  {
    accessorKey: "startDate",
    header: "Tanggal Mulai",
    cell: ({ row }) => format(new Date(row.getValue("startDate")), "dd/MM/yyyy"),
  },
  {
    accessorKey: "endDate",
    header: "Tanggal Selesai",
    cell: ({ row }) => format(new Date(row.getValue("endDate")), "dd/MM/yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const { label, variant } = getRentalStatusLabel(status);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    accessorKey: "purpose",
    header: "Tujuan",
  },
];
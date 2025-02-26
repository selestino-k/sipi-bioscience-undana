import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";

export default async function AdminRentals() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  
  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  
  if (user?.role !== "ADMIN") {
    redirect("/");
  }
  
  // Get all rentals
  const rentals = await prisma.rental.findMany({
    include: {
      instrumen: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex min-h-screen flex-col p-8">
      <h2 className="text-2xl font-bold mb-6">Manajemen Peminjaman</h2>
      
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={rentals} />
      </div>
    </div>
  );
}
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";

export default async function MyRentals() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  
  // Get user rentals
  const rentals = await prisma.rental.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      instrumen: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex min-h-screen flex-col p-8">
      <h2 className="text-2xl font-bold mb-6">Peminjaman Saya</h2>
      
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={rentals} />
      </div>
    </div>
  );
}
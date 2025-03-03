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
      instrument: true,
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
     <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                    <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                    Manajemen Peminjaman
                    </h2>          
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={rentals} />
                    </div>
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    
                </footer>
            </div>
  );
}
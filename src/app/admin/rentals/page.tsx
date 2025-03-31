import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";
import { Rental } from "@prisma/client";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached

async function fetchRentals(): Promise<Rental[]> {
  return prisma.rental.findMany({
    include: {
      instrumen: true,
      user: true,
    },
  });
}

export default async function RentalsPage({
}: {
    searchParams: { refresh?: string }
}) {
  const rentals = await fetchRentals();
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
  
  // Transform the data to flatten relations
  const transformedRentals = rentals.map(rental => ({
    ...rental,
    // Add flattened instrument fields
    instrument_name: rental.instrumen?.nama_instrumen || null,
    instrument_merk: rental.instrumen?.merk_instrumen || null,
    // Add flattened user fields
    user_name: rental.user?.name || null,
    user_email: rental.user?.email || null,
    // Convert dates to strings to avoid serialization issues
    start_date: rental.start_date ? rental.start_date.toISOString() : null,
    end_date: rental.end_date ? rental.end_date.toISOString() : null,
    createdAt: rental.createdAt ? rental.createdAt.toISOString() : null,
    updatedAt: rental.updatedAt ? rental.updatedAt.toISOString() : null,
  }));

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
          Manajemen Peminjaman
        </h2>          
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={transformedRentals} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
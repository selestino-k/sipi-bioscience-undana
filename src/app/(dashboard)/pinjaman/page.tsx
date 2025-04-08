import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";
import { Rental } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached

// Update the fetchRentals function to accept a userId parameter
async function fetchRentals(userId: string): Promise<Rental[]> {
  return prisma.rental.findMany({
    where: {
      user_id: userId, // Filter rentals by the current user's ID
    },
    include: {
      instrumen: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc', // Get newest rentals first
    },
  });
}

export default async function RentalsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  
  // Check if user exists in session
  if (!session.user || !session.user.id) {
    // Handle the case where user ID is missing
    redirect("/sign-in"); // Or show an error message
  }
  
  // Get userId from session
  const userId = session.user.id;
  
  // Fetch only rentals for this user
  const rentals = await fetchRentals(userId);

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
    // Access the image URL through the relation
    image_url: rental.instrumen?.image_url || null,
  }));

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
              Pinjaman Saya
            </h2>
            <Button asChild>
              <Link href="/pinjam">
                <PlusCircle className="mr-2 h-4 w-4" />
                Pinjam Instrumen
              </Link>
            </Button>
          </div>
          
          {rentals.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-gray-500 mb-4">Anda belum memiliki peminjaman</p>
              <Button asChild>
                <Link href="/pinjam">Lihat Katalog Instrumen</Link>
              </Button>
            </div>
          ) : (
            <DataTable columns={columns} data={transformedRentals} />
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
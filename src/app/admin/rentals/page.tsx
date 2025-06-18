import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { RentalPDF } from "@/components/pdf/rental-pdf";
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page
export const metadata: Metadata = {
  title: "Daftar Peminjaman",
  description: "Daftar semua peminjaman yang tersedia.",
};

async function fetchRentals() {
  
  return prisma.rental.findMany({
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
  const rentals = await fetchRentals();
  const session = await auth();
  if (!session || !session.user) redirect("/sign-in");
  
  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  
  if (user?.role !== "ADMIN") {
    redirect("/");
  }
  
  type RentalWithRelations = Prisma.rentalGetPayload<{
    include: {
      instrumen: true;
      user: true;
    }
  }>;
  
  function transformRental(rental: RentalWithRelations) {
      return {
        ...rental,
        // Add flattened instrument fields
        instrument_name: rental.instrumen?.nama_instrumen || null,
        instrument_merk: rental.instrumen?.merk_instrumen || null,
        instrument_tipe: rental.instrumen?.tipe_instrumen || null,
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
      // Convert id to string if it's a number
      id: rental.id.toString(),
    };
  }


  
  const transformedRentals = rentals.map(transformRental);
  
  return (
    
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <div className="container mx-auto">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 sm:mb-10">
          Manajemen Peminjaman
        </h2> 
        <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
          <PDFDownloadButton<RentalWithRelations>
            data={rentals}
            PDFDocument={RentalPDF}
            filename="daftar-peminjaman"
            label="Unduh Daftar Peminjaman"
          />
        </div>
          <DataTable columns={columns} data={transformedRentals} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );

}
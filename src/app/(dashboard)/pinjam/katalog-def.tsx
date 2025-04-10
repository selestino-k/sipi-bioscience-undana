import { Suspense } from "react"
import ProductCatalog from "./katalog-lab"
import db from "@/lib/db/db"

// Define the proper interface that matches your data
interface Katalog {
  instrumen_id: number;
  nama_instrumen: string;
  merk_instrumen: string;
  tipe_instrumen: string;
  layanan: string;
  status: string;
  image_url: string; // Now non-nullable
  image: string;
}

// Fetch function
export async function getCatalogue(): Promise<Katalog[]> {
  // Fetch instruments data from Prisma DB
  try {
    // Fetch instruments data from Prisma DB
    const instruments = await db.instrumen.findMany({
      select: {
        instrumen_id: true,
        merk_instrumen: true,
        nama_instrumen: true,
        tipe_instrumen: true,
        layanan: true,
        status: true,
        image_url: true,
      },
    });
    
    // Map to the expected format
    return instruments.map(instrumen => ({
      ...instrumen,
      // Handle missing image field
      image_url: instrumen.image_url || "/placeholder.svg", // Default to empty string if null
      image: instrumen.image_url || "/placeholder.svg", // Default to empty string if null
    }));
  } catch (error) {
    console.error("Failed to fetch instruments:", error);
    return []; // Return empty array on error
  }
}

export default async function KatalogPage() {
  // Fetch data 
  const catalogueData = await getCatalogue();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductCatalog initialData={catalogueData} />
    </Suspense>
  );
}
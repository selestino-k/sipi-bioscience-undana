import { Suspense } from "react"
import ProductCatalog from "./katalog-lab"
import db from "@/lib/db/db"

// Fetch function
export async function getCatalogue() {
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
      // Optional: Add any filters you need
      // where: { ... }
    });
    
    // Map to the expected format
    return instruments.map(instrumen => ({
      ...instrumen,
      // Handle missing image field
      image:  "/placeholder.svg"
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
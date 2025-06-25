import KatalogPage from "./katalog-def";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { Suspense } from "react";
import { CircleLoader } from "@/components/ui/circle-loader";


export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page
export const metadata: Metadata = {
    title: "Katalog Instrumen",  
    description: "Katalog semua instrumen dan alat laboratorium.",
};



// Add this loading component
async function LoadingCatalog() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return <KatalogPage />;
}

export default async function Katalog() {
    const session = await auth();
    if (!session) redirect ('/sign-in');
    
    return (
        <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                        
                <div className="container mx-auto">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
                        Pinjam Instrumen dan Alat Laboratorium
                    </h2>  
                    <Suspense 
                      fallback={
                        <div className="flex justify-center items-center h-dvh">
                          <CircleLoader size="xl"/>
                        </div>
                      }
                    >
                      <LoadingCatalog />
                    </Suspense>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>

    );
}



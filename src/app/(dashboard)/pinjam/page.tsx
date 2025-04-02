import KatalogPage from "./katalog-def";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached

export default async function Katalog(
    {
    }: {
        searchParams: { refresh?: string }
    }
) {
    const session = await auth();
    if (!session) redirect ('/sign-in');
    
    return (
        <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                        
                <div className="container mx-auto">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
                        Pinjam Instrumen dan Alat Laboratorium
                    </h2>  
                    <KatalogPage/>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>

    );
}
  
     
    
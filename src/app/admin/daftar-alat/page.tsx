import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import { Alat } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";  


export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached


async function getData(): Promise<Alat[]> {
    // Fetch data from your API here.
    return await prisma.alat.findMany();
}

export default async function DaftarAlat({
}: {
    searchParams: { refresh?: string }
}) {
    const data = await getData()
    const session = await auth();
        if (!session) redirect ('/sign-in');

    return (
        <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
               Manajemen Daftar Alat Laboratorium
                </h2>          
                <div className="container mx-auto py-10">
                    <Button>
                        <Link href="/admin/daftar-alat/tambah">Tambah Alat Laboratorium</Link>
                    </Button>
                    <DataTable columns={columns} data={data} />
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
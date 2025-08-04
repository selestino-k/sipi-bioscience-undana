import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import { ruang } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";  
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Ruang Laboratorium",
    description: "Daftar semua ruang lab yang tersedia.",
};

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page


async function getData(): Promise<ruang[]> {
    // Fetch data from your API here.
    return await prisma.ruang.findMany({
        orderBy: {
            nama_ruang: 'asc',
        },
    });
}

export default async function DaftarRuang() {
    const ruangData = await getData()
    const session = await auth();
        if (!session) redirect ('/sign-in');

    return (
        <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col row-start-1 items-center sm:items-start">
                <div className="container mx-auto">
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 sm:mb-10">
                    Manajemen Daftar Ruang Laboratorium
                </h2>    
                <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
                    <Button>
                        <Link href="/admin/daftar-ruang/tambah">Tambah Ruang Laboratorium</Link>
                    </Button>
                </div>
                    <DataTable columns={columns} data={ruangData} />
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {barang} from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page

export const metadata: Metadata = {
    title: "Daftar Barang",
    description: "Daftar semua barang yang tersedia.",
};

async function getData(): Promise<barang[]> {
    // Fetch data from your API here.
    return await prisma.barang.findMany()
}

export default async function DaftarBarang() {
    const data = await getData()
    const session = await auth();
    if (!session) redirect ('/sign-in');    

    return (
        <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">  
                <div className="container mx-auto">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 sm:mb-10">
                        Manajemen Daftar Barang
                    </h2>  
                    <Button>
                        <Link href="/admin/daftar-barang/tambah">Tambah Barang</Link>
                    </Button>
                    <DataTable columns={columns} data={data} />
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
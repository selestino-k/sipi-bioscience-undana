import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import { alat } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";  
import { Metadata } from "next";
import { AlatPDF } from "@/components/pdf/alat-pdf";
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button";

export const metadata: Metadata = {
    title: "Daftar Alat",
    description: "Daftar semua alat yang tersedia.",
};

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page


async function getData(): Promise<alat[]> {
    // Fetch data from your API here.
    return await prisma.alat.findMany({
        orderBy: {
            alat_id: 'asc',
        },
    });
}

export default async function DaftarAlat() {
    const alatData = await getData()
    const session = await auth();
        if (!session) redirect ('/sign-in');

    return (
        <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col row-start-1 items-center sm:items-start">
                <div className="container mx-auto">
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 sm:mb-10">
                    Manajemen Daftar Alat Laboratorium
                </h2>    
                <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
                    <Button>
                        <Link href="/admin/daftar-alat/tambah">Tambah Alat Laboratorium</Link>
                    </Button>
                     <PDFDownloadButton<alat>
                        data={alatData}
                        PDFDocument={AlatPDF}
                        filename="daftar-alat"
                        label="Unduh Daftar Alat"
                    />
                </div>
                    <DataTable columns={columns} data={alatData} />
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
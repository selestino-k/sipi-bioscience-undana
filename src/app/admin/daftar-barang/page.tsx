import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {barang} from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { BarangPDF } from "@/components/pdf/barang-pdf";
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button";

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page

export const metadata: Metadata = {
    title: "Daftar Barang",
    description: "Daftar semua barang yang tersedia.",
};

async function getData(): Promise<barang[]> {
    // Fetch data from your API here.
    return await prisma.barang.findMany({
        orderBy: {
            barang_id: 'asc',
        },
    })
}

export default async function DaftarBarang() {
    const barangData = await getData()
    const session = await auth();
    if (!session) redirect ('/sign-in');    

    return (
        <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">  
                <div className="container mx-auto">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 sm:mb-10">
                        Manajemen Daftar Barang
                    </h2>  
                    <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
                    <Button>
                        <Link href="/admin/daftar-barang/tambah">Tambah Barang</Link>
                    </Button>
                    <PDFDownloadButton 
                        data={barangData} 
                        PDFDocument={BarangPDF}                        
                        filename="daftar-barang-inventaris"
                        label="Unduh Daftar Barang"                 
                    />
                    </div>
                    <DataTable columns={columns} data={barangData} />
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
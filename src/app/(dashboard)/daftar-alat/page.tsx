import { DataTable } from "@/components/ui/data-table";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import { alat } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { CircleLoader } from "@/components/ui/circle-loader";

export const metadata: Metadata = {
    title: "Daftar Alat",
    description: "Daftar semua alat yang tersedia.",
};

export const dynamic = 'force-dynamic'; // This ensures the page is not statically cached
export const revalidate = 0; // Disable static generation for this page

async function getData(): Promise<alat[]> {
    // Fetch data from your API here.
    return await prisma.alat.findMany(
        {
            orderBy: {
                alat_id: 'asc',
            },
        }
    );
}
async function LoadingAlat() {
    // Simulate a loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const data = await getData();
    return <DataTable columns={columns} data={data} />;
}

export default async function DaftarAlat() {
    const session = await auth();
    if (!session) redirect ('/sign-in');

 
    return (
        <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                <div className="container mx-auto py-10">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
                        Daftar Alat Laboratorium
                    </h2>   
                    <Suspense 
                        fallback={
                            <div className="flex justify-center items-center h-dvh">
                                <CircleLoader size="xl"/>
                            </div>
                        }
                    >
                        <LoadingAlat />
                    </Suspense>
                </div>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
  
     
    
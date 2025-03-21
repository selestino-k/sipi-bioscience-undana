import type { Metadata } from "next";

import NavBar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sistem Peminjaman Lab Bioscience",
  description: "UPT Laboratorium Terpadu Universitas Nusa Cendana",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  
  return (

        <main className="gap-3 w-full">
        <NavBar/>
        <SessionProvider>
            <div className="flex w-full min-h-screen items-center justify-center">
                {children}
            </div>
        </SessionProvider>
        <Footer/>
        </main>

    

  );
}



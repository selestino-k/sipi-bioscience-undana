import type { Metadata } from "next";

import NavBar from "@/components/home/navbar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/home/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sistem Peminjaman dan Inventaris Lab Bioscience",
  description: "UPT Laboratorium Terpadu Universitas Nusa Cendana",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
          >
        <main className="gap-3 w-full scroll-smooth">
        <NavBar/>
        <SessionProvider>
            <div className="flex w-full min-h-screen items-center justify-center">
                {children}
                <Toaster position="bottom-right" />
            </div>
        </SessionProvider>
        <Footer/>
        </main>
    </ThemeProvider>
  );
}



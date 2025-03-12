import type { Metadata } from "next";
import { AdminAppSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "SI Inventaris Lab Bioscience",
  description: "Sistem Informasi Inventaris Lab Bioscience - UPT Laboratorium Terpadu Universitas Nusa Cendana",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  
  return (
    <SessionProvider>
    <SidebarProvider>
        <AdminAppSidebar/> 
        <main className="gap-3 w-full">
            <SidebarTrigger />
            <div className="flex w-full min-h-screen items-center justify-items-center">
                {children}
            </div>
        </main>
    </SidebarProvider>
    </SessionProvider>
    

  );
}



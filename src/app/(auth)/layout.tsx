import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SI Inventaris Lab Bioscience",
  description: "Sistem Informasi Inventaris Lab Bioscience - UPT Laboratorium Terpadu Universitas Nusa Cendana",
};

export default function AuthLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  
  return (

    <main className="gap-3 w-full">
        <div className="flex  min-h-screen items-center justify-items-center">
        {children}
        </div>
    </main>

  );
}



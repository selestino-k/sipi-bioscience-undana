import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const Page = async () => {
    const session = await auth();
     if (!session || !session.user) redirect("/sign-in");

     // Check if user is admin
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });
    
    if (user?.role !== "ADMIN") {
        redirect("/");
    }
    
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 row-start-2 items-center sm:items-start">
                <h3 className="text-lg">
                    Selamat datang di Panel Admin
                </h3>
                <h2 className="text-2xl/7 font-bold  sm:truncate sm:text-5xl sm:tracking-tight">
                 SI Inventaris dan Peminjaman Lab Bioscience
                </h2>   
                <h3 className="text-lg">
                    UPT Laboratorium Terpadu - Universitas Nusa Cendana
                </h3> 
                <h3 className="text-lg">
                    Masuk sebagai : <b>ADMIN</b> ({session.user?.name} - {session.user?.email})
                </h3>         
            </main>
        </div>
    );
};

export default Page;

   
  
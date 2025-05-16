import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChartBox } from "@/components/admin/chart-box.";
import { getStats } from "@/lib/actions/admin/stats-actions";


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
    
    const stats = await getStats();

    return (
        <div className="grid grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            
            <main className="flex flex-col gap-3 row-start-[1] items-center sm:items-start">
                
                <h3 className="text-lg">
                    Selamat datang  <b>{session.user?.name}</b> ({session.user?.email})  di Panel Admin
                </h3>
                <h2 className="text-2xl/7 font-bold  sm:truncate sm:text-5xl sm:tracking-tight">
                 SI Inventaris dan Peminjaman Lab Bioscience
                </h2>   
                <h3 className="text-lg">
                    UPT Laboratorium Terpadu - Universitas Nusa Cendana
                </h3> 
                    
                <ChartBox 
                    rentCount={stats.rentCount}
                    instrumenCount={stats.instrumenCount}
                    barangCount={stats.barangCount}
                    alatCount={stats.alatCount}
                    userCount={stats.userCount}
                    chartData={stats.chartData}
                />
                
            </main>
        </div>
    );
};

export default Page;

   
  
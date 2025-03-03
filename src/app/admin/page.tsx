import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";



const Page = async () => {
    const session = await auth();
     if (!session) redirect("/sign-in");

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
                    Selamat datang di
                </h3>
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                Panel Admin SI Inventaris Lab Bioscience
                </h2>   
                <h3 className="text-lg">
                    Universitas Nusa Cendana
                </h3> 
                <h3 className="text-lg">
                    Masuk sebagai : <b>ADMIN</b> ({session.user?.email})
                </h3>            
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default Page;

   
  
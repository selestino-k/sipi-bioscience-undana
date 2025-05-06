import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";


const Page = async () => {
    const session = await auth();
    if (!session || !session.user) redirect("/sign-in");
    // Check if user is admin
    // const user = await prisma.user.findUnique({
    //     where: { id: session.user.id },
    //     select: { role: true },
    // });
    
    // if (user?.role == "ADMIN") {
    //     redirect("/admin");
    // }

    return (
        <div>
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/background.jpg" // Replace with your image path
                    alt="Background"
                    fill
                    className="object-cover opacity-95" // 45% opacity
                    priority
                />
            </div>
            
            <main className="relative z-10 flex flex-col gap-3 text-white row-start-2 justify-center sm:items-start">
                <h3 className="text-lg">
                    Selamat datang di
                </h3>
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
                Sistem Peminjaman Alat Laboratorium
                </h2>   
                <h3 className="text-lg mb-6">
                    UPT Lab Terpadu Universitas Nusa Cendana
                </h3>            
                <Button asChild className="primary sm:w-1/2 h-12 text-lg">
                    <Link href="/pinjam">
                     <Plus/>Mulai Pinjam
                    </Link>
                </Button>
            </main>
            
            <footer className="relative z-10 row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default Page;

   
  
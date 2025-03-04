import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


const Page = async () => {
    const session = await auth();
     if (!session) redirect("/sign-in");
    
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 row-start-2 items-center sm:items-start">
                <h3 className="text-lg">
                    Selamat datang di
                </h3>
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                SI Inventaris Lab Bioscience
                </h2>   
                <h3 className="text-lg">
                    UPT Lab Terpadu Universitas Nusa Cendana
                </h3> 
                <h3 className="text-lg">
                    Masuk sebagai : <b>{session.user?.email}</b> 
                </h3>            
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default Page;

   
  
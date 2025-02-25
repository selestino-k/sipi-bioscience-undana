import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = async () => {
    const session = await auth();
     if (!session) redirect("/sign-in");
    
    return (
        <div className="flex w-full items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                Cari
                </h2>   
                <h3 className="text-lg">
                    Silahkan ketik item yang ingin dicari
                </h3> 
                <div className="flex w-full max-w-lg items-center space-x-2">
                    <Input type="email" placeholder="Cari di sini" />
                    <Button type="submit">Cari</Button>
                </div>       
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default Page;

   
  
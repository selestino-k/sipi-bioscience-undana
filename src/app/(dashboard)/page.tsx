import NavBar from "@/components/navbar";

const Page = async () => {
    
    return (
        <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/* <div className="absolute inset-0 z-0">
                <Image 
                    src="/public/biosains.jpg" // Replace with your image path
                    alt="Background"
                    fill
                    className="object-cover opacity-20" // 20% opacity
                    priority
                />
            </div> */}
            
            <main className="relative z-10 flex flex-col gap-3 row-start-2 items-center sm:items-start">
            
                <h3 className="text-lg">
                    Selamat datang di
                </h3>
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                Sistem Peminjaman Alat Laboratorium
                </h2>   
                <h3 className="text-lg">
                    UPT Lab Terpadu Universitas Nusa Cendana
                </h3>            
            </main>
            
            <footer className="relative z-10 row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default Page;

   
  
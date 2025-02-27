"use client";


import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/search-input";

const SearchPage =  () => {
    const search = useSearchParams();
    const searchQuery  = search ? search.get("q"): null;
    const encodedQuery = encodeURI(searchQuery|| "" );

        console.log("search params: ",encodedQuery);

    
    return (
        <div className="flex w-full items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                Cari
                </h2>   
                <h3 className="text-lg">
                    Silahkan ketik item yang ingin dicari
                </h3> 
                <SearchInput/>
            </main>
            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
};

export default SearchPage;

   
  
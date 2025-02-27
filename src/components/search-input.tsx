"use client";// beacuse we are using prisma client, also beacuse we use state in this component

import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); 
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Encode the search query, put the %20 for space in the query into the URL
        const encodedQuery = encodeURI(searchQuery); 
        router.push('/search?q=${encodedQuery}');
        
        console.log("current query : ", encodedQuery);
        // Do something with the searchQuery
    }

return(
    <form className="flex w-full max-w-lg items-center space-x-2" onSubmit={onSearch}>
        <Input 
        value={searchQuery}
        onChange={handleSearch} 
        placeholder="Cari di sini" />
        <Button type="submit">Cari</Button>
    </form>
);
}

export default SearchInput;
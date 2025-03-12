"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Product type definition
interface Katalog {
  instrument_id: number
  merk_instrumen: string
  nama_instrumen: string
  tipe_instrumen: string
  layanan: string
  status: string
  image: string
}

// Sample product data
const catalogue: Katalog[] = [
  {
    instrument_id: 1,
    merk_instrumen: "Merk A",
    nama_instrumen: "Instrumen A",  
    tipe_instrumen: "Tipe A",
    layanan: "Layanan A",
    status: "TERSEDIA",
    image: "/placeholder.svg",
  }
]

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("name")

  // Filter products based on search query
  const filteredCatalogue = catalogue.filter((item) => item.nama_instrumen.toLowerCase().includes(searchQuery.toLowerCase()))
 // Sort products based on selectedy option
  const sortedCatalogue = [...filteredCatalogue].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.nama_instrumen.localeCompare(b.nama_instrumen)
      default:
        return 0 // featured - keep original order
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari disini..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCatalogue.map((catalogue) => (
            <div key={catalogue.instrument_id} className="bg-background rounded-lg overflow-hidden border">
              <div className="aspect-square relative">
                <Image src={catalogue.image || "/public/placeholder.svg"} alt={catalogue.nama_instrumen} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{catalogue.nama_instrumen}</h3>
                <p className="text-muted-foreground text-sm">{catalogue.merk_instrumen}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold">{catalogue.status}</span>
                  <Button variant="default">
                    Pinjam
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


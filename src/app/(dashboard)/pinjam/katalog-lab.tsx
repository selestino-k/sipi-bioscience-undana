"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RentInstrumenDialog } from "./rent-dialog"

// Product type definition
export type Katalog ={
  instrumen_id: number
  merk_instrumen: string
  nama_instrumen: string
  tipe_instrumen: string
  layanan: string
  status: string
  image_url: string
}

// Default catalog in case data isn't passed
const defaultCatalog: Katalog[] = [
  {
    instrumen_id: 1,
    merk_instrumen: "Null",
    nama_instrumen: "Null",  
    tipe_instrumen: "Null",
    layanan: "Null",
    status: "NULL",
    image_url: "Null",
  }
]

interface ProductCatalogProps {
  initialData?: Katalog[]
}

export default function ProductCatalog({ initialData = defaultCatalog }: ProductCatalogProps) {
  const [catalogue] = useState<Katalog[]>(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("name")

  // Filter products based on search query
  const filteredCatalogue = catalogue.filter((item) => 
    item.nama_instrumen.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Sort products based on selected option
  const sortedCatalogue = [...filteredCatalogue].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.nama_instrumen.localeCompare(b.nama_instrumen)
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return 0 // featured - keep original order
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      {/* Rest of your component remains the same */}
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
            <span className="text-sm">Urutkan:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedCatalogue.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">Tidak ada instrumen atau alat yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCatalogue.map((item) => (
              <div key={item.instrumen_id} className="bg-background rounded-lg overflow-hidden border">
                <div className="aspect-square relative">
                  <Image 
                    src={item.image_url || "/placeholder.svg"} 
                    alt={item.nama_instrumen} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.nama_instrumen}</h3>
                  <p className="text-muted-foreground text-sm">{item.merk_instrumen}</p>
                  <p className="text-muted-foreground text-sm">{item.tipe_instrumen}</p>
                  <p className="text-muted-foreground text-sm">Layanan: {item.layanan}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block
                      ${item.status === 'TERSEDIA' ? 'bg-green-100 text-green-800' : 
                      item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                    <PinjamButton 
                      instrumen={item} 
                      disabled={item.status !== 'TERSEDIA'} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Updated PinjamButton component that accepts instrument data
function PinjamButton({ 
  instrumen, 
  disabled = false 
}: { 
  instrumen: Katalog, 
  disabled?: boolean 
}) {
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
  const { data: session } = useSession()
  
  // Remove console log for better performance
  // Replace hardcoded user with session data
  const user = session?.user ? {
      id: session.user.id || "", 
      email: session.user.email || ""
  } : null

  return (
    <>
      <Button 
        variant="default" 
        disabled={disabled}
        onClick={() => setIsRentDialogOpen(true)}>
        Pinjam
      </Button>
      {user && (
        <RentInstrumenDialog 
          instrumen={instrumen}
          isOpen={isRentDialogOpen} 
          onOpenChange={setIsRentDialogOpen} 
          user={user}
        />
      )}
    </>
  )
}


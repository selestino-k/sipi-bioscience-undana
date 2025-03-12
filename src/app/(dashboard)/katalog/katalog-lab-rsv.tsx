"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Product type definition
interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Stylish Sunglasses",
    description: "UV protection",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    description: "Stylish and practical",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Cozy Sweater",
    description: "Soft and warm",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Comfortable Sneakers",
    description: "All-day wear",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    description: "Premium sound quality",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Smart Watch",
    description: "Track your fitness",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Portable Charger",
    description: "Fast charging",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Laptop Backpack",
    description: "Water resistant",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function ProductCatalogReserve() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")

  // Filter products based on search query
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0 // featured - keep original order
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
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
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-background rounded-lg overflow-hidden border">
              <div className="aspect-square relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Button variant="default" size="sm">
                    Add to Cart
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


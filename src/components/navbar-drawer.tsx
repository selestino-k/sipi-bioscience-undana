"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function NavDrawer() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // Function to handle navigation and close drawer
  const handleNavigation = (href: string) => {
    setOpen(false) // Close the drawer
    router.push(href) // Navigate to the link
  }
return (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button variant="outline">Menu</Button>
    </DrawerTrigger>
    <DrawerContent className="pt-2">
      <DrawerHeader className="text-left">
        <DrawerTitle>Menu</DrawerTitle>
        
      </DrawerHeader>
      {/* Replace Link components with Buttons that handle navigation */}
      <Button 
          variant="outline" 
          className="w-full justify-start mb-2"
          onClick={() => handleNavigation("/")}
        >
          Beranda
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start mb-2"
          onClick={() => handleNavigation("/daftar-instrumen")}
        >
          Pinjam
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start mb-2"
          onClick={() => handleNavigation("/daftar-barang")}
        >
          Inventaris
        </Button>


      <DrawerFooter className="pt-2">
        
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)
}

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
import { Armchair, Calculator, Ellipsis, FlaskConical, Pipette, Plus, Home, User,Settings } from "lucide-react"
import { SignOut } from "../sign-out"

export function NavDrawer({
  user,
}: {
  user: {
    name: string
    email: string
  | null;
  }
}) {
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
      <Button variant="ghost"><Ellipsis/></Button>
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
            <Home/>Beranda
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/pinjam")}
          >
            <Plus/>Pinjam
          </Button>
        <DrawerHeader className="text-left">
          <DrawerTitle>Inventaris</DrawerTitle>
        </DrawerHeader>
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/daftar-alat")}
          >
            <Pipette/>Daftar Alat
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/daftar-instrumen")}
          >
            <Calculator/>Daftar Instrumen
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/daftar-bahan")}
          >
            <FlaskConical/>Daftar Bahan
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/daftar-barang")}
          >
            <Armchair/>Daftar Barang
          </Button>
          <DrawerHeader className="text-left">
          <DrawerTitle>Profil</DrawerTitle>
        </DrawerHeader>
         
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigation("/pengaturan-akun")}
          >
            <Settings/>Pengaturan Akun
          </Button>
          {user ? (
            <Button 
              variant="outline" 
              className="w-full justify-start mb-2"
              onClick={() => handleNavigation("/pengaturan-akun")}
            >
              <User/>{user.name} ({user.email})
            </Button>
          ) : (
            <Button variant="outline" 
                  className="w-full justify-start mb-2"
                  onClick={() => handleNavigation("/sign-in")}
            >
              <User/>Masuk
            </Button>
         )}
      <DrawerFooter className="pt-2">
        <SignOut/>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

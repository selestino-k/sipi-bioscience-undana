"use client";
import Link from "next/link"
import { Facebook, Instagram,  Mail, MapPin, Phone } from "lucide-react"
import { scrollToElement } from "@/utils/scroll"

export function Footer() {
  return (
    <footer className="border-t bg-primary w-full dark:bg-gray-950/80">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 place-items-center md:place-items-start">
          {/* Company Info & Address */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">UPT Lab Terpadu</h3>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-secondary dark:text-primary" />
                <Link href="https://maps.app.goo.gl/arv4yaMvVRDdXUs27" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline cursor-pointer">
                <span>
                  Jl. Adisucipto, Penfui
                  <br />
                  Kupang, NTT 85361
                </span>
                </Link>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-secondary dark:text-primary" />
                <span>(0380) 881597</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-secondary dark:text-primary" />
                <span>lab.terpadu@undana.ac.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/pinjam" className="hover:underline cursor-pointer">
                  Pinjam Sekarang
                </Link>
              </li>
              <li>
                <Link href="/daftar-alat" className="hover:underline cursor-pointer">
                  Inventaris Lab
                </Link>
              </li>
              <li>
                <Link href="/#tentang" className="hover:underline cursor-pointer" onClick={() => scrollToElement('tentang')}>
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/#stats" className="hover:underline cursor-pointer" onClick={() => scrollToElement('stats')}>
                  Statistik
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Ikuti Kami</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link
                href="https://www.facebook.com/profile.php?id=61554126157733&locale=id_ID"
                className="rounded-full border border-border p-2 text-white transition-colors hover:border-white hover:text-white cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/uptlabterpaduundana/"
                className="rounded-full border border-border p-2 text-white transition-colors hover:border-white hover:text-white cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <div className="pt-4 text-sm text-white">
              <p>Dapatkan berita terbaru dari kami</p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Email anda"
                  className="w-full rounded-l-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-text dark:bg-gray-950 dark:border-border dark:text-white"
                  style={{ caretColor: 'auto' }}
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-secondary px-4 py-2 text-sm font-medium text-black hover:bg-light-gray cursor-pointer dark:bg-primary dark:text-white"
                >
                  Langganan
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-white">
          <p>© {new Date().getFullYear()} UPT Lab Terpadu Universitas Nusa Cendana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


"use server";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { HoverMotion } from "@/components/motion/hover-motion";
import { PrescenceMotion } from "@/components/motion/presence-motion";
import FeatureCardList from "@/components/home/feature-card";
import prisma  from "@/lib/prisma";
import {StatsCard} from "@/components/home/stats-card";

async function getStats() {
  const [instrumenCount, alatCount, barangCount, userCount, rentCount] = await Promise.all([
    prisma.instrumen.count(),
    prisma.alat.count(),
    prisma.barang.count(),
    prisma.user.count(),
    prisma.rental.count(),
  ]);

  return {
    instrumenCount,
    alatCount,
    barangCount,
    userCount,
    rentCount,
  };
}

const Page = async () => {
    const stats = await getStats();
    
   
    return (
        <div className="grid w-full">
        <PrescenceMotion>

        <div className="flex items-center justify-center h-screen w-full relative">
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/images/background-hd.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-95"
                    priority
                />
            </div>
                <main className="relative z-10 flex flex-col gap-3 text-white items-center p-8 w-full">
                    <div className="text-center w-full">
              
                        <h1 className="text-4xl md:text-5xl/9 font-bold sm:tracking-tight mt-2">
                            Selamat datang di SIPI
                        </h1>  
                        <h1 className="text-2xl md:text-3xl/9 font-bold sm:tracking-tight mt-3">
                            Sistem Informasi Peminjaman dan Inventaris
                        </h1>   
                        <h2 className="text-2xl mt-4 mb-6">
                            UPT Lab Terpadu Universitas Nusa Cendana
                        </h2>
                    </div>
                    <HoverMotion>
                        <Button asChild className="h-12 text-lg px-6" variant="secondary">
                            <Link href="/pinjam" className="flex items-center gap-2">
                                <Plus className="w-5 h-5"/>
                                Mulai Pinjam
                            </Link>
                        </Button>
                    </HoverMotion>
                </main>
        </div>
        </PrescenceMotion>
        <PrescenceMotion>
        <div id="tentang" className="flex items-center justify-center h-full w-full relative">
                <main className="relative z-10 flex flex-col gap-3 items-center p-8 w-full mt-10">
                    <div className="text-center w-full">
                      
                        <h1 className="text-3xl md:text-4xl/9 font-bold sm:tracking-tight mt-2">
                            Tentang SIPI Lab Bioscience
                        </h1>  
                        <h2 className="text-xl mt-4 mb-6">
                            UPT Lab Terpadu Universitas Nusa Cendana
                        </h2>
                        <p className="text-lg mt-4 mb-6 w-2/3 mx-auto">
                            <b>SIPI</b> atau <b>S</b>istem <b>I</b>nformasi <b>P</b>eminjaman alat dan <b>I</b>nventaris laboratorium adalah sistem yang dirancang untuk memudahkan proses peminjaman alat dan inventaris di UPT Laboratorium Terpadu Universitas Nusa Cendana. Sistem ini bertujuan untuk meningkatkan efisiensi dan transparansi dalam pengelolaan alat dan inventaris, serta memberikan kemudahan bagi pengguna dalam melakukan peminjaman.  
                        </p>
                    </div>
                    <FeatureCardList/>
                </main>
        </div>
        </PrescenceMotion>
        <PrescenceMotion>
        <div id="stats" className="flex items-center justify-center w-full relative py-20">
          <main className="relative z-10 flex flex-col gap-8 items-center p-8 w-full max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Statistik Inventaris
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              <PrescenceMotion>
                <StatsCard
                  title="Total Instrumen"
                  value={stats.instrumenCount}
                  iconType="instrumen"
                  href="/daftar-instrumen"
                />
              </PrescenceMotion>
              <PrescenceMotion>
                <StatsCard
                  title="Total Alat"
                  value={stats.alatCount}
                  iconType="alat"
                  href="/daftar-alat"
                />
              </PrescenceMotion>
              <PrescenceMotion>
                <StatsCard
                  title="Total Barang"
                  value={stats.barangCount}
                  iconType="barang"
                  href="/daftar-barang"
                />
              </PrescenceMotion>
              <PrescenceMotion>
                <StatsCard
                  title="Total Pengguna"
                  value={stats.userCount}
                  iconType="user"
                  href="#"
                />
              </PrescenceMotion>
              <PrescenceMotion>
                <StatsCard
                  title="Total Peminjaman"
                  value={stats.rentCount}
                  iconType="rental"
                  href="/pinjaman"
                />
              </PrescenceMotion>
            </div>
          </main>
        </div>
      </PrescenceMotion>
        </div>
    );
};

export default Page;



"use client";

import { ClipboardList, Search, Clock, CalendarCheck, ShieldCheck, BarChart3 } from "lucide-react";
import { FeatureCard } from "@/components/motion/card-hover-motion";

export const features = [
{
    title: "Manajemen Instrumen",
    description: "Kelola dan pantau seluruh instrumen laboratorium dengan mudah dan efisien",
    Icon: ClipboardList
  },
  {
    title: "Pencarian Cepat",
    description: "Temukan instrumen yang dibutuhkan dengan fitur pencarian yang powerful",
    Icon: Search
  },
  {
    title: "Penjadwalan",
    description: "Atur jadwal peminjaman dan pengembalian instrumen dengan sistematis",
    Icon: Clock
  },
  {
    title: "Peminjaman Online",
    description: "Ajukan peminjaman secara online dengan proses yang cepat dan mudah",
    Icon: CalendarCheck
  },
  {
    title: "Verifikasi Peminjaman",
    description: "Sistem verifikasi untuk memastikan keamanan dan keteraturan peminjaman",
    Icon: ShieldCheck
  },
  {
    title: "Laporan & Statistik",
    description: "Pantau statistik penggunaan dan generate laporan dengan mudah",
    Icon: BarChart3
  }
];
 export default function FeatureCardList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto mt-10">
        {features.map((feature, index) => (
            <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            Icon={feature.Icon}
            />
        ))}
        </div>
    );
}
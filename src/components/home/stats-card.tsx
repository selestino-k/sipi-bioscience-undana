"use client"

import { motion } from "framer-motion"
import { LucideIcon, Microscope, Pipette, Armchair, Users, ClipboardList } from "lucide-react"
import Link from "next/link"

type IconType = "instrumen" | "alat" | "barang" | "user" | "rental"

interface StatsCardProps {
  title: string
  value: number
  iconType: IconType
  href: string
}

const iconMap: Record<IconType, LucideIcon> = {
  instrumen: Microscope,
  alat: Pipette,
  barang: Armchair,
  user: Users,
  rental: ClipboardList
}

export function StatsCard({ title, value, iconType, href }: StatsCardProps) {
  const Icon = iconMap[iconType]

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm 
        border border-white/10 hover:border-primary/50 transition-colors"
      >
        <Icon className="w-8 h-8 mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <p className="text-sm">{title}</p>
      </motion.div>
    </Link>
  )
}
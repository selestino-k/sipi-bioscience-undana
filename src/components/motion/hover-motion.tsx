"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface HoverMotionProps {
  children: ReactNode
}

export function HoverMotion({ children }: HoverMotionProps) {
  return (
    <motion.div
        initial={{ scale: 1 }}

        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  )
}
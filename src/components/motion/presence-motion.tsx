"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PrescenceMotionProps {
  children: ReactNode
}

export function PrescenceMotion({ children }: PrescenceMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}    
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }}
      viewport={{ 
        once: false,
        amount: 0.3,
        margin: "0px 0px -100px 0px"
      }} 
    >
      {children}
    </motion.div>
  )
}
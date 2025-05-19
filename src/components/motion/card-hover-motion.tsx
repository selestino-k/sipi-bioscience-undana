"use client"

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center"
    >
      <Icon className="w-8 h-8 mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </motion.div>
  );
}
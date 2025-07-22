import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PulseBorderProps {
  children: ReactNode;
  className?: string;
}

export default function PulseBorder({ children, className = "" }: PulseBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-cyan-400/50"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </div>
  );
}
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedIconProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedIcon({ children, delay = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 1 }}
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
import { motion } from "framer-motion";

interface AnimatedDotsProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function AnimatedDots({ position }: AnimatedDotsProps) {
  const dots = Array.from({ length: 9 }, (_, i) => i);
  
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-8 left-8";
      case "top-right":
        return "top-8 right-8";
      case "bottom-left":
        return "bottom-8 left-8";
      case "bottom-right":
        return "bottom-8 right-8";
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} pointer-events-none z-10`}>
      <div className="grid grid-cols-3 gap-2">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: dot * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
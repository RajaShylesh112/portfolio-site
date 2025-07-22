import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'waves';
}

export default function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className="flex justify-center py-8">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className="relative h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="url(#wave-gradient)"
            animate={{ 
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                "M321.39,46.44c58-15.79,114.16-25.13,172-36.86,82.39-11.72,168.19-12.73,250.45,4.61C823.78,36,906.67,77,985.66,97.83c70.05,23.48,146.53,31.09,214.34,8V0H0V32.35A600.21,600.21,0,0,0,321.39,46.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
              <stop offset="50%" stopColor="rgba(255, 0, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 255, 0, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-background px-4">
          <motion.div
            className="w-12 h-px bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
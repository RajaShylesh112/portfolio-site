import { motion } from "framer-motion";

interface BlueprintSectionDividerProps {
  label: string;
  variant?: "primary" | "secondary";
}

export default function BlueprintSectionDivider({ 
  label, 
  variant = "primary" 
}: BlueprintSectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Blueprint Line */}
        <div className="relative">
          {/* Horizontal line with grid pattern */}
          <div 
            className={`h-[2px] w-full ${
              variant === "primary" 
                ? "bg-gradient-to-r from-transparent via-[var(--architect-teal)] to-transparent" 
                : "bg-gradient-to-r from-transparent via-[var(--architect-rust)] to-transparent"
            } relative`}
          >
            {/* Grid markers along the line */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                viewport={{ once: true }}
                className={`absolute top-0 w-[1px] h-4 ${
                  variant === "primary" ? "bg-[var(--architect-teal)]" : "bg-[var(--architect-rust)]"
                } opacity-60`}
                style={{ 
                  left: `${(i / 23) * 100}%`,
                  transform: "translateX(-50%)"
                }}
              />
            ))}
          </div>

          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute left-8 -top-3"
          >
            <div className={`
              px-4 py-1 
              ${variant === "primary" ? "bg-[var(--architect-charcoal)]" : "bg-[var(--architect-navy)]"}
              border border-[var(--architect-teal)]/30
              backdrop-blur-sm
            `}>
              <span className={`
                text-sm font-medium tracking-[0.2em] uppercase
                ${variant === "primary" ? "text-[var(--architect-teal)]" : "text-[var(--architect-rust)]"}
                font-mono
              `}>
                // {label}
              </span>
            </div>
          </motion.div>

          {/* Corner brackets */}
          <div className="absolute left-0 top-0 w-8 h-8 -translate-y-4">
            <div 
              className={`absolute top-0 left-0 w-4 h-[2px] ${
                variant === "primary" ? "bg-[var(--architect-teal)]" : "bg-[var(--architect-rust)]"
              } opacity-60`}
            />
            <div 
              className={`absolute top-0 left-0 w-[2px] h-4 ${
                variant === "primary" ? "bg-[var(--architect-teal)]" : "bg-[var(--architect-rust)]"
              } opacity-60`}
            />
          </div>
          
          <div className="absolute right-0 top-0 w-8 h-8 -translate-y-4">
            <div 
              className={`absolute top-0 right-0 w-4 h-[2px] ${
                variant === "primary" ? "bg-[var(--architect-teal)]" : "bg-[var(--architect-rust)]"
              } opacity-60`}
            />
            <div 
              className={`absolute top-0 right-0 w-[2px] h-4 ${
                variant === "primary" ? "bg-[var(--architect-teal)]" : "bg-[var(--architect-rust)]"
              } opacity-60`}
            />
          </div>
        </div>

        {/* Technical specifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute right-8 -bottom-2"
        >
          <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-wider">
            SEC.{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
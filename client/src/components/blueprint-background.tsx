import { motion } from "framer-motion";

export default function BlueprintBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute inset-0 blueprint-grid-large opacity-20" />
      
      {/* Architectural elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Corner technical markers */}
        <div className="absolute top-8 left-8 w-16 h-16">
          <div className="border-l-2 border-t-2 border-[var(--architect-teal)]/40 w-full h-full" />
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--architect-teal)]/60" />
        </div>
        
        <div className="absolute top-8 right-8 w-16 h-16">
          <div className="border-r-2 border-t-2 border-[var(--architect-teal)]/40 w-full h-full" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--architect-teal)]/60" />
        </div>
        
        <div className="absolute bottom-8 left-8 w-16 h-16">
          <div className="border-l-2 border-b-2 border-[var(--architect-teal)]/40 w-full h-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--architect-teal)]/60" />
        </div>
        
        <div className="absolute bottom-8 right-8 w-16 h-16">
          <div className="border-r-2 border-b-2 border-[var(--architect-teal)]/40 w-full h-full" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--architect-teal)]/60" />
        </div>

        {/* Central measuring lines */}
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] h-full bg-[var(--architect-teal)]/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        <motion.div
          className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--architect-teal)]/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />

        {/* Floating blueprint elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.1,
              scale: 1,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 2, 
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 5
            }}
          >
            <div className="w-8 h-8 border border-[var(--architect-teal)]/30">
              <div className="w-full h-full border-2 border-[var(--architect-rust)]/20 transform rotate-45" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ambient blueprint glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[var(--architect-teal)]/5 via-transparent to-transparent" />
      
      {/* Depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--architect-charcoal)]/20 to-[var(--architect-charcoal)]/40" />
    </div>
  );
}
import { motion } from "framer-motion";

export default function FloatingElements() {
  const elements = [
    { id: 1, size: "w-2 h-2", color: "bg-cyan-400/40", top: "10%", left: "5%" },
    { id: 2, size: "w-1 h-1", color: "bg-purple-400/60", top: "20%", right: "8%" },
    { id: 3, size: "w-1.5 h-1.5", color: "bg-green-400/50", top: "70%", left: "3%" },
    { id: 4, size: "w-1 h-1", color: "bg-cyan-400/30", top: "80%", right: "15%" },
    { id: 5, size: "w-2 h-2", color: "bg-purple-400/40", top: "40%", left: "90%" },
    { id: 6, size: "w-1 h-1", color: "bg-green-400/60", top: "60%", right: "5%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.color} rounded-full`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 border border-cyan-400/30 rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-4 left-4 w-6 h-6 border border-purple-400/30 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
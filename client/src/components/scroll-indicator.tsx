import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

export default function ScrollIndicator() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
      onClick={scrollToNext}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Scroll to explore
        </span>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground group-hover:border-cyan-400 rounded-full flex justify-center transition-colors">
            <motion.div
              animate={{ y: [2, 6, 2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-muted-foreground group-hover:bg-cyan-400 rounded-full mt-2 transition-colors"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
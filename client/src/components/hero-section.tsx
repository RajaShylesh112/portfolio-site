import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./typing-animation";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background to-slate-50 dark:from-slate-900 dark:to-slate-800">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary dark:bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary dark:bg-blue-400 rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4 text-foreground">
            Hi, I'm <span className="text-primary dark:text-blue-400">Raja</span>
          </h1>
          
          <div className="text-2xl lg:text-3xl text-muted-foreground mb-8 min-h-[3rem]">
            <TypingAnimation 
              text="Backend Developer"
              speed={100}
              startDelay={1000}
            />
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Adaptable and driven professional with a strong interest in backend development. 
            Focused on building scalable, reliable solutions.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3"
            >
              View Projects
            </Button>
          </div>
          
          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/RajaShylesh112"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Github />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/raja-shylesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Linkedin />
            </motion.a>
            <motion.a
              href="mailto:rajashylesh@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Mail />
            </motion.a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-80 h-80 rounded-full bg-gradient-to-br from-primary to-blue-700 dark:from-blue-500 dark:to-blue-700 p-1"
            >
              <div className="w-full h-full rounded-full bg-secondary dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-6xl text-slate-500 dark:text-slate-400">
                  👨‍💻
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Available for projects
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="text-2xl text-muted-foreground" />
      </motion.div>
    </section>
  );
}

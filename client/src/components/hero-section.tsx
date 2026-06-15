import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./typing-animation";
import Hero3DBackground from "./hero-3d-background";
import ScrollIndicator from "./scroll-indicator";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background dark:bg-black">
      {/* 3D Dynamic Background */}
      <Hero3DBackground />

      <div className="max-w-7xl mx-auto container-padding grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title text-5xl lg:text-7xl font-bold leading-tight mb-4 text-foreground">
            Hi, I'm <span className="text-primary dark:neon-text">Raja</span>
          </h1>
          
          <div className="hero-subtitle text-2xl lg:text-3xl text-muted-foreground mb-8 min-h-[3rem]">
            <TypingAnimation 
              text="Full Stack Developer & AI Enthusiast"
              speed={100}
              startDelay={1000}
            />
          </div>
          
          <p className="hero-description text-lg text-muted-foreground mb-8 max-w-2xl">
            Adaptable and driven professional with a strong interest in backend development. 
            Focused on building scalable, reliable solutions.
          </p>
          
          <div className="hero-buttons flex flex-wrap gap-4 mb-8">
            <Button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-300 cursor-pointer"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://github.com/RajaShylesh112?tab=repositories", "_blank")}
              className="px-8 py-3 border-primary dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10 cursor-pointer"
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
          className="flex justify-center lg:justify-end order-first lg:order-last"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 dark:from-cyan-400 dark:to-purple-600 p-1 glow-effect"
            >
              <div className="w-full h-full rounded-full bg-background dark:bg-black flex items-center justify-center overflow-hidden backdrop-blur-sm border border-cyan-400/30 text-7xl">
                💻
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-cyan-400 text-black px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium neon-border"
            >
              Available for projects
            </motion.div>
            {/* Floating elements around profile */}
            <motion.div
              className="absolute -top-4 -right-8 w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full floating-particle"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-8 -left-4 w-2 h-2 md:w-3 md:h-3 bg-purple-400/60 rounded-full floating-particle"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}

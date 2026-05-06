import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";
import TypingAnimation from "./typing-animation";
import Hero3DBackground from "./hero-3d-background";
import FloatingTechIcons from "./floating-tech-icons";
import ModernShapes from "./modern-shapes";
import profileImage from "@assets/image.png";
import resumePDF from "@assets/Resume.pdf";

export default function HeroSectionSimplified() {
  const scrollToProjects = () => {
    const element = document.getElementById("featured-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Hero3DBackground />
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Radial gradient overlay for better focus */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image with Enhanced Effects */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Animated outer glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(99, 230, 222, 0.4)",
                  "0 0 60px rgba(99, 230, 222, 0.6)",
                  "0 0 40px rgba(99, 230, 222, 0.4)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Rotating border rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                background: "linear-gradient(45deg, #00ffff, #6366f1, #00ffff) border-box",
                mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract"
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              className="absolute -inset-2 rounded-full border border-cyan-400/20"
              animate={{ rotate: -360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl z-10">
              <img
                src={profileImage}
                alt="Raja Shylesh"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gradient halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
          </div>

          {/* Name with enhanced animations */}
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="text-4xl md:text-5xl font-bold mb-6 relative z-10"
          >
            <motion.span
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Backend Developer
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ml-2"
            >
              | AI Explorer
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-300">
              Building scalable backend systems with an interest in intelligent applications.
            </p>
          </motion.div>

          {/* Brief Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
          >
            <span className="text-gray-400">
              Experienced in building reliable APIs, database-backed services, and scalable server architectures.
            </span>
          </motion.div>

          {/* CTA Buttons with enhanced hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button 
                size="lg" 
                onClick={() => window.open("https://github.com/RajaShylesh112?tab=repositories", "_blank")}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg shadow-cyan-500/25"
              >
                View Projects
              </Button>
            </motion.div>
            {/* View Bio removed per request */}

            <a href={resumePDF} download className="ml-0 sm:ml-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-cyan-300 hover:text-cyan-100 px-8 py-3 text-lg"
                >
                  Download Resume
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="mailto:raja@example.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/RajaShylesh112"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/raja-shylesh-886421256"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToProjects}
            >
              <ArrowDown className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
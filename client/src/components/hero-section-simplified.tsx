import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";
import { Link } from "wouter";
import TypingAnimation from "./typing-animation";
import Hero3DBackground from "./hero-3d-background";
import profileImage from "@assets/1000025260-removebg_1753213343295.png";

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
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl">
              <img
                src={profileImage}
                alt="Raja Shylesh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
          </div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Raja{" "}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Shylesh
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            <div className="text-xl md:text-2xl">
              <TypingAnimation
                text="I build backends that don't break."
              />
            </div>
          </motion.div>

          {/* Brief Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
          >
            I'm a backend developer who thrives on building systems that scale and ship fast. 
            I turn complex logic into clean, maintainable APIs. Currently diving deep into cloud infra and distributed systems.
            <br /><br />
            <span className="text-cyan-400 font-medium">Currently open to internship opportunities in backend or cloud dev.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg"
            >
              View Projects
            </Button>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 text-lg"
              >
                Hire Me
              </Button>
            </Link>
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
              href="https://github.com/rajashylesh"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/rajashylesh"
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
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import BlueprintBackground from "./blueprint-background";
import profileImage from "@assets/1000025260-removebg_1753213343295.png";

export default function HeroSectionSimplified() {
  const scrollToProjects = () => {
    const element = document.getElementById("featured-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--architect-charcoal)]">
      <BlueprintBackground />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left side - Profile and Identity */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Blueprint Frame */}
            <div className="relative p-8 border-2 border-[var(--architect-teal)]/30 bg-[var(--architect-navy)]/20 backdrop-blur-sm">
              {/* Corner markers */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[var(--architect-teal)]" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-[var(--architect-teal)]" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-[var(--architect-teal)]" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-[var(--architect-teal)]" />
              
              {/* Technical specs overlay */}
              <div className="absolute top-2 right-2 text-xs font-mono text-[var(--architect-concrete)]/60 tracking-wider">
                REF.001
              </div>
              
              {/* Profile Image */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--architect-teal)]/20 to-[var(--architect-rust)]/20" />
                <img
                  src={profileImage}
                  alt="Raja Shylesh - Backend Architect"
                  className="w-full h-full object-cover filter contrast-110 brightness-90"
                />
                
                {/* Crosshair overlay */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--architect-teal)]/40" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[var(--architect-teal)]/40" />
                </div>
              </div>
              
              {/* Identity Grid */}
              <div className="space-y-2 text-center font-mono">
                <div className="text-sm text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">// DESIGNATION</div>
                <div className="text-lg font-medium text-[var(--architect-teal)] tracking-wider">BACKEND ARCHITECT</div>
                
                <div className="flex justify-center items-center space-x-4 pt-4 text-xs text-[var(--architect-concrete)]/80">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>COIMBATORE, IN</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>GMT+5:30</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Mission Statement */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Name and Title */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-2"
              >
                <div className="text-sm font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase">// IDENTITY</div>
                <h1 className="text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                  <div>RAJA</div>
                  <div className="text-[var(--architect-teal)]">SHYLESH</div>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-2xl lg:text-3xl text-[var(--architect-rust)] font-medium tracking-wider uppercase"
              >
                The Underground Architect
              </motion.div>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="space-y-6"
            >
              <div className="text-sm font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">// MISSION</div>
              <p className="text-xl lg:text-2xl text-[var(--architect-concrete)] leading-relaxed font-light">
                I architect systems in the shadows. <span className="text-[var(--architect-teal)]">No noise, no drama</span> — 
                just bulletproof backends that scale quietly and deliver consistently.
              </p>
              <p className="text-lg text-[var(--architect-concrete)]/80 leading-relaxed">
                While others chase trends, I build foundations. 
                <span className="text-[var(--architect-rust)] font-medium">Infrastructure that endures. Code that survives.</span>
              </p>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="p-6 border border-[var(--architect-teal)]/30 bg-[var(--architect-navy)]/30 backdrop-blur-sm"
            >
              <div className="text-sm font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">// STATUS</div>
              <div className="text-lg text-[var(--architect-teal)] font-medium mb-2">Available for Strategic Partnerships</div>
              <div className="text-sm text-[var(--architect-concrete)]/80">
                Seeking backend engineering roles where precision and performance matter more than politics.
              </div>
            </motion.div>

            {/* Action Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <Button 
                onClick={scrollToProjects}
                className="bg-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/80 text-[var(--architect-charcoal)] font-medium tracking-wider uppercase px-6 py-4 h-auto"
              >
                <div className="text-center">
                  <div className="text-sm">REVIEW</div>
                  <div className="text-xs font-mono">PROJECTS</div>
                </div>
              </Button>
              
              <Link href="/about">
                <Button 
                  variant="outline"
                  className="border-[var(--architect-rust)] text-[var(--architect-rust)] hover:bg-[var(--architect-rust)]/10 font-medium tracking-wider uppercase px-6 py-4 h-auto w-full"
                >
                  <div className="text-center">
                    <div className="text-sm">INITIATE</div>
                    <div className="text-xs font-mono">CONTACT</div>
                  </div>
                </Button>
              </Link>
              
              <a href="mailto:raja@example.com" className="col-span-2">
                <Button 
                  variant="ghost"
                  className="w-full text-[var(--architect-concrete)] hover:text-[var(--architect-teal)] font-mono text-sm tracking-wider border border-[var(--architect-concrete)]/20 hover:border-[var(--architect-teal)]/50 py-3"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  ESTABLISH SECURE COMMUNICATION
                </Button>
              </a>
            </motion.div>
            
            {/* External Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex justify-start space-x-6 pt-8"
            >
              <a
                href="https://github.com/rajashylesh"
                className="text-[var(--architect-concrete)]/60 hover:text-[var(--architect-teal)] transition-colors duration-200 font-mono text-xs tracking-wider uppercase"
              >
                GITHUB.REPO
              </a>
              <a
                href="https://linkedin.com/in/rajashylesh"
                className="text-[var(--architect-concrete)]/60 hover:text-[var(--architect-teal)] transition-colors duration-200 font-mono text-xs tracking-wider uppercase"
              >
                LINKEDIN.NETWORK
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer text-center"
            onClick={scrollToProjects}
          >
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-wider uppercase mb-2">SCROLL</div>
            <ArrowDown className="w-4 h-4 text-[var(--architect-teal)] mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
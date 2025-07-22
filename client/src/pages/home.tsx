import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import CustomCursor from "@/components/custom-cursor";
import AnimatedBackground from "@/components/animated-background";
import SectionDivider from "@/components/section-divider";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import CertificationsSection from "@/components/certifications-section";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";
import { useGSAPAnimations } from "@/hooks/use-gsap-animations";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Initialize GSAP animations
  useGSAPAnimations();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground custom-cursor relative">
      <AnimatedBackground />
      <CustomCursor />
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <SectionDivider variant="gradient" />
      <AboutSection />
      <SectionDivider variant="dots" />
      <ProjectsSection />
      <SectionDivider variant="waves" />
      <SkillsSection />
      <SectionDivider variant="gradient" />
      <ExperienceSection />
      <SectionDivider variant="dots" />
      <CertificationsSection />
      <SectionDivider variant="gradient" />
      <ContactSection />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-blue-400 dark:hover:bg-blue-500 shadow-lg"
            >
              <ChevronUp className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import CustomCursor from "@/components/custom-cursor";
import BlueprintSectionDivider from "@/components/blueprint-section-divider";
import HeroSectionSimplified from "@/components/hero-section-simplified";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import ShortAboutSection from "@/components/short-about-section";
import SkillsSummarySection from "@/components/skills-summary-section";
import QuickContactSection from "@/components/quick-contact-section";
import CallToActionSection from "@/components/call-to-action-section";
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
    <div className="min-h-screen bg-[var(--architect-charcoal)] text-[var(--blueprint-text)] custom-cursor relative">
      <CustomCursor />
      <Navigation />
      <ScrollProgress />
      <HeroSectionSimplified />
      <BlueprintSectionDivider label="FEATURED WORKS" variant="primary" />
      <FeaturedProjectsSection />
      <BlueprintSectionDivider label="ARCHITECT PROFILE" variant="secondary" />
      <ShortAboutSection />
      <BlueprintSectionDivider label="TECHNICAL SPECIFICATIONS" variant="primary" />
      <SkillsSummarySection />
      <BlueprintSectionDivider label="THE BACKROOM" variant="secondary" />
      <QuickContactSection />
      <BlueprintSectionDivider label="MISSION BRIEF" variant="primary" />
      <CallToActionSection />

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
              className="w-12 h-12 bg-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/80 text-[var(--architect-charcoal)] shadow-lg border border-[var(--architect-teal)]/50"
            >
              <ChevronUp className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

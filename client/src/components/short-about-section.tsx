import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, GraduationCap, Clock, Target } from "lucide-react";
import { Link } from "wouter";

export default function ShortAboutSection() {
  return (
    <section id="short-about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Dossier Header */}
          <div className="text-center">
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
              // ARCHITECT PROFILE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">
              PERSONNEL DOSSIER
            </h2>
          </div>

          {/* Dossier Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Primary Intelligence */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-[var(--architect-navy)]/40 p-6 border-l-4 border-[var(--architect-teal)]">
                  <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">
                    // FOUNDATIONAL TRAINING
                  </div>
                  <p className="text-[var(--architect-concrete)] leading-relaxed mb-4">
                    Computer Science student specializing in backend system architecture. 
                    Focused on building infrastructure that operates efficiently under pressure 
                    without requiring constant oversight.
                  </p>
                  <p className="text-[var(--architect-concrete)] leading-relaxed">
                    Philosophy: <span className="text-[var(--architect-teal)] font-medium">
                    Systems should be designed to fail gracefully and scale silently.</span>
                  </p>
                </div>
                
                <div className="bg-[var(--architect-charcoal)]/50 p-6 border border-[var(--architect-rust)]/30">
                  <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">
                    // TACTICAL CURIOSITIES
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-[var(--architect-concrete)]">
                    <div>• Red Dead Redemption 2</div>
                    <div>• Cyberpunk 2077</div>
                    <div>• Peaky Blinders</div>
                    <div>• System Architecture</div>
                    <div>• API Design Patterns</div>
                    <div>• Database Optimization</div>
                  </div>
                </div>
                
                <div className="bg-[var(--architect-navy)]/40 p-6 border-l-4 border-[var(--architect-rust)]">
                  <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">
                    // OPERATIONAL DOCTRINE
                  </div>
                  <p className="text-[var(--architect-concrete)] leading-relaxed">
                    "Build once, run forever. Write code that doesn't need explanation. 
                    Architecture should be invisible when it works and obvious when it doesn't."
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Tactical Specifications */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-4">
                  // TACTICAL SPECIFICATIONS
                </div>
                
                <div className="space-y-4">
                  <Card className="bg-[var(--architect-navy)]/30 border border-[var(--architect-teal)]/30">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-[var(--architect-teal)]" />
                        <span className="text-sm font-mono text-[var(--architect-concrete)] tracking-wider uppercase">Base of Operations</span>
                      </div>
                      <p className="text-sm text-[var(--architect-teal)] font-medium">Coimbatore, India</p>
                      <p className="text-xs text-[var(--architect-concrete)]/80 font-mono">GMT+5:30 | Active Hours: 09:00-23:00</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[var(--architect-navy)]/30 border border-[var(--architect-rust)]/30">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <GraduationCap className="w-5 h-5 text-[var(--architect-rust)]" />
                        <span className="text-sm font-mono text-[var(--architect-concrete)] tracking-wider uppercase">Training Protocol</span>
                      </div>
                      <p className="text-sm text-[var(--architect-rust)] font-medium">Computer Science</p>
                      <p className="text-xs text-[var(--architect-concrete)]/80 font-mono">Backend Systems Specialization</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[var(--architect-navy)]/30 border border-[var(--architect-teal)]/30">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Target className="w-5 h-5 text-[var(--architect-teal)]" />
                        <span className="text-sm font-mono text-[var(--architect-concrete)] tracking-wider uppercase">Current Objective</span>
                      </div>
                      <p className="text-sm text-[var(--architect-teal)] font-medium">Backend Internship</p>
                      <p className="text-xs text-[var(--architect-concrete)]/80 font-mono">Strategic partnerships available</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[var(--architect-navy)]/30 border border-[var(--architect-concrete)]/30">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-[var(--architect-concrete)]" />
                        <span className="text-sm font-mono text-[var(--architect-concrete)] tracking-wider uppercase">System Uptime</span>
                      </div>
                      <p className="text-sm text-[var(--architect-teal)] font-medium">2+ Years Active</p>
                      <p className="text-xs text-[var(--architect-concrete)]/80 font-mono">Continuous learning protocol</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-6">
                  <Link href="/about">
                    <Button 
                      size="lg" 
                      className="w-full bg-[var(--architect-rust)] hover:bg-[var(--architect-rust)]/80 text-white font-mono tracking-wider uppercase"
                    >
                      ACCESS FULL DOSSIER
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
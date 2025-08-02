import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, MessageCircle, ArrowRight, Terminal, FileText, Send } from "lucide-react";
import { Link } from "wouter";

export default function CallToActionSection() {
  return (
    <section id="call-to-action" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[var(--architect-navy)]/40 border-2 border-[var(--architect-teal)]/50 overflow-hidden relative blueprint-grid">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--architect-teal)]/5 to-[var(--architect-rust)]/5"></div>
            <CardContent className="p-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
                  // MISSION BRIEF
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-mono tracking-tight">
                  STRATEGIC PARTNERSHIP AVAILABLE
                </h2>
                <div className="max-w-4xl mx-auto mb-12">
                  <p className="text-xl text-[var(--architect-concrete)] mb-6 leading-relaxed">
                    I operate best in environments where <span className="text-[var(--architect-teal)] font-medium">precision matters more than politics</span>. 
                    Backend systems that scale quietly. Infrastructure that endures.
                  </p>
                  <div className="bg-[var(--architect-charcoal)]/50 p-6 border-l-4 border-[var(--architect-rust)]">
                    <div className="text-sm font-mono text-[var(--architect-concrete)] text-left">
                      <span className="text-[var(--architect-rust)] font-medium">TARGET ENGAGEMENTS:</span> 
                      Backend engineering roles, cloud infrastructure, distributed systems, API architecture, 
                      performance optimization, database design.
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full h-20 bg-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/80 text-[var(--architect-charcoal)] font-mono tracking-wider uppercase flex flex-col items-center justify-center space-y-1"
                      onClick={() => window.open('mailto:raja@example.com?subject=Strategic Partnership Inquiry', '_blank')}
                    >
                      <Send className="w-6 h-6" />
                      <div className="text-sm">INITIATE</div>
                      <div className="text-xs">CONTACT</div>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full h-20 border-[var(--architect-rust)] text-[var(--architect-rust)] hover:bg-[var(--architect-rust)]/10 font-mono tracking-wider uppercase flex flex-col items-center justify-center space-y-1"
                      onClick={() => {
                        // In a real app, this would trigger a download
                        console.log('Download tactical resume');
                      }}
                    >
                      <Download className="w-6 h-6" />
                      <div className="text-sm">DOWNLOAD</div>
                      <div className="text-xs">DOSSIER</div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link href="/about">
                      <Button 
                        size="lg" 
                        variant="ghost"
                        className="w-full h-20 border border-[var(--architect-concrete)]/30 text-[var(--architect-concrete)] hover:bg-[var(--architect-concrete)]/10 font-mono tracking-wider uppercase flex flex-col items-center justify-center space-y-1"
                      >
                        <FileText className="w-6 h-6" />
                        <div className="text-sm">ACCESS</div>
                        <div className="text-xs">FULL PROFILE</div>
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t border-[var(--architect-teal)]/30"
                >
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-[var(--architect-charcoal)]/30 p-6 border-l-2 border-[var(--architect-teal)]/50">
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">
                        // OPERATIONAL PARAMETERS
                      </div>
                      <div className="space-y-2 text-sm text-[var(--architect-concrete)]">
                        <div><span className="text-[var(--architect-teal)] font-medium">Availability:</span> Immediate deployment</div>
                        <div><span className="text-[var(--architect-teal)] font-medium">Location:</span> Remote-first, GMT+5:30</div>
                        <div><span className="text-[var(--architect-teal)] font-medium">Engagement:</span> Internship → Full-time</div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--architect-charcoal)]/30 p-6 border-l-2 border-[var(--architect-rust)]/50">
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-3">
                        // MISSION ALIGNMENT
                      </div>
                      <div className="space-y-2 text-sm text-[var(--architect-concrete)]">
                        <div><span className="text-[var(--architect-rust)] font-medium">Expertise:</span> Backend systems, APIs</div>
                        <div><span className="text-[var(--architect-rust)] font-medium">Philosophy:</span> Code that endures</div>
                        <div><span className="text-[var(--architect-rust)] font-medium">Approach:</span> Silent execution</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
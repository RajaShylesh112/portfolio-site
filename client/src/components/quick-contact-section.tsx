import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Github, ExternalLink, Radio, Shield, Zap } from "lucide-react";

export default function QuickContactSection() {
  return (
    <section id="quick-contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--architect-charcoal)]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
            // THE BACKROOM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">
            SECURE COMMUNICATIONS
          </h2>
          <p className="text-lg text-[var(--architect-concrete)] max-w-3xl mx-auto font-light leading-relaxed">
            Encrypted channels available for strategic discussions. All communications secured and monitored.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Primary Communication Channel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[var(--architect-navy)]/40 border-2 border-[var(--architect-teal)]/50 hover:border-[var(--architect-teal)] transition-all duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[var(--architect-charcoal)]/50 border border-[var(--architect-teal)]/30">
                      <Mail className="w-6 h-6 text-[var(--architect-teal)]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                        CHANNEL.01
                      </div>
                      <h3 className="text-lg font-mono text-white tracking-wider">SECURE EMAIL</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[var(--architect-teal)] animate-pulse" />
                    <span className="text-xs font-mono text-[var(--architect-teal)]">ACTIVE</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[var(--architect-charcoal)]/30 p-4 border-l-2 border-[var(--architect-teal)]/50">
                    <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-2">
                      // PROTOCOL
                    </div>
                    <p className="text-sm text-[var(--architect-concrete)]">
                      Direct communication line. Response time: <span className="text-[var(--architect-teal)] font-medium">&lt; 24 hours</span>
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/80 text-[var(--architect-charcoal)] font-mono tracking-wider uppercase"
                    onClick={() => window.open('mailto:raja@example.com', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    INITIATE CONTACT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Network */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[var(--architect-navy)]/40 border-2 border-[var(--architect-rust)]/50 hover:border-[var(--architect-rust)] transition-all duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[var(--architect-charcoal)]/50 border border-[var(--architect-rust)]/30">
                      <Linkedin className="w-6 h-6 text-[var(--architect-rust)]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                        CHANNEL.02
                      </div>
                      <h3 className="text-lg font-mono text-white tracking-wider">PROFESSIONAL NETWORK</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[var(--architect-rust)] animate-pulse" />
                    <span className="text-xs font-mono text-[var(--architect-rust)]">MONITORING</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[var(--architect-charcoal)]/30 p-4 border-l-2 border-[var(--architect-rust)]/50">
                    <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-2">
                      // NETWORK ACCESS
                    </div>
                    <p className="text-sm text-[var(--architect-concrete)]">
                      Strategic partnerships and professional connections.
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-[var(--architect-rust)] text-[var(--architect-rust)] hover:bg-[var(--architect-rust)]/10 font-mono tracking-wider uppercase"
                    onClick={() => window.open('https://linkedin.com/in/rajashylesh', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    ESTABLISH LINK
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Code Repository */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[var(--architect-navy)]/40 border-2 border-[var(--architect-concrete)]/30 hover:border-[var(--architect-concrete)]/60 transition-all duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[var(--architect-charcoal)]/50 border border-[var(--architect-concrete)]/30">
                      <Github className="w-6 h-6 text-[var(--architect-concrete)]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                        CHANNEL.03
                      </div>
                      <h3 className="text-lg font-mono text-white tracking-wider">CODE ARCHIVE</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[var(--architect-concrete)] animate-pulse" />
                    <span className="text-xs font-mono text-[var(--architect-concrete)]">SYNCED</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[var(--architect-charcoal)]/30 p-4 border-l-2 border-[var(--architect-concrete)]/50">
                    <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-2">
                      // REPOSITORY ACCESS
                    </div>
                    <p className="text-sm text-[var(--architect-concrete)]">
                      Open-source contributions and project implementations.
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost"
                    className="w-full border border-[var(--architect-concrete)]/30 text-[var(--architect-concrete)] hover:bg-[var(--architect-concrete)]/10 font-mono tracking-wider uppercase"
                    onClick={() => window.open('https://github.com/rajashylesh', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    ACCESS REPOSITORY
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-[var(--architect-navy)]/20 p-6 border border-[var(--architect-teal)]/30">
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
              // SYSTEM STATUS
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Radio className="w-4 h-4 text-[var(--architect-teal)]" />
                  <span className="text-sm font-mono text-[var(--architect-teal)] tracking-wider">ONLINE</span>
                </div>
                <div className="text-xs font-mono text-[var(--architect-concrete)]/60">Communication Channels</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4 text-[var(--architect-rust)]" />
                  <span className="text-sm font-mono text-[var(--architect-rust)] tracking-wider">SECURED</span>
                </div>
                <div className="text-xs font-mono text-[var(--architect-concrete)]/60">Encrypted Protocols</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4 text-[var(--architect-teal)]" />
                  <span className="text-sm font-mono text-[var(--architect-teal)] tracking-wider">ACTIVE</span>
                </div>
                <div className="text-xs font-mono text-[var(--architect-concrete)]/60">Response Systems</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
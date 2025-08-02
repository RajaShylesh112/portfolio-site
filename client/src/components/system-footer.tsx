import { motion } from "framer-motion";
import { Activity, Clock, Terminal, Shield } from "lucide-react";

export default function SystemFooter() {
  const currentDate = new Date();
  const buildDate = "Aug 2, 2025";
  const uptime = Math.floor((currentDate.getTime() - new Date('2023-01-01').getTime()) / (1000 * 60 * 60 * 24));
  const buildVersion = "v0.3-beta";
  
  return (
    <footer className="bg-[var(--architect-charcoal)] border-t border-[var(--architect-teal)]/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 items-center"
        >
          {/* System Status */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase">
              // SYSTEM STATUS
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Activity className="w-4 h-4 text-[var(--architect-teal)]" />
                <span className="text-sm font-mono text-[var(--architect-concrete)]">
                  OPERATIONAL
                </span>
                <div className="w-2 h-2 bg-[var(--architect-teal)] animate-pulse rounded-full" />
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-[var(--architect-rust)]" />
                <span className="text-sm font-mono text-[var(--architect-concrete)]">
                  SECURED
                </span>
                <div className="w-2 h-2 bg-[var(--architect-rust)] animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* Build Information */}
          <div className="text-center space-y-2">
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase">
              // BUILD INFO
            </div>
            <div className="font-mono text-sm text-[var(--architect-concrete)]">
              Last Sync: {buildDate} | Uptime: {uptime} days | Build {buildVersion}
            </div>
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60">
              Portfolio.Underground-Architect.v3
            </div>
          </div>

          {/* Copyright and Credits */}
          <div className="text-right space-y-2">
            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase">
              // ARCHITECT
            </div>
            <div className="space-y-1">
              <div className="text-sm font-mono text-[var(--architect-concrete)]">
                Raja Shylesh © {currentDate.getFullYear()}
              </div>
              <div className="text-xs font-mono text-[var(--architect-concrete)]/60">
                Systems built to endure
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terminal Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-[var(--architect-teal)]/20"
        >
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[var(--architect-concrete)]/60">
            <Terminal className="w-3 h-3" />
            <span>raja@underground-architect:~$ sudo systemctl status portfolio</span>
            <span className="text-[var(--architect-teal)]">● active (running)</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
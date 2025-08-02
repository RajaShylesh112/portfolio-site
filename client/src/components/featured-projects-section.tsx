import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const systemBlueprints = [
  {
    id: "ecommerce-api",
    designation: "COMMERCE GATEWAY",
    objective: "High-throughput transaction processing with integrated payment infrastructure",
    specifications: {
      "CPU": "Node.js",
      "FRAMEWORK": "Express",
      "DATA_STORE": "MongoDB",
      "AUTH_PROTOCOL": "JWT",
      "PAYMENT_BUS": "Stripe"
    },
    status: "OPERATIONAL",
    classification: "LEVEL-3",
    githubUrl: "https://github.com/rajashylesh/ecommerce-api",
    deploymentUrl: "https://ecommerce-api-demo.com",
    strategyNote: "Microservice architecture chosen for horizontal scaling under variable load conditions."
  },
  {
    id: "task-manager",
    designation: "WORKFLOW ENGINE",
    objective: "Real-time task coordination with persistent state management",
    specifications: {
      "CPU": "Node.js",
      "COMM_LAYER": "Socket.io",
      "DATA_STORE": "PostgreSQL",
      "UI_INTERFACE": "React",
      "TYPE_SYSTEM": "TypeScript"
    },
    status: "OPERATIONAL",
    classification: "LEVEL-2",
    githubUrl: "https://github.com/rajashylesh/task-manager",
    deploymentUrl: "https://task-manager-demo.com",
    strategyNote: "WebSocket implementation ensures sub-100ms update propagation across client nodes."
  },
  {
    id: "blog-cms",
    designation: "CONTENT CONTROL SYSTEM",
    objective: "Centralized content management with administrative oversight",
    specifications: {
      "CPU": "Node.js",
      "FRAMEWORK": "Express",
      "DATA_STORE": "MySQL",
      "CACHE_LAYER": "Redis",
      "EDITOR_MODULE": "TinyMCE"
    },
    status: "PROTOTYPE",
    classification: "LEVEL-1",
    githubUrl: "https://github.com/rajashylesh/blog-cms",
    strategyNote: "Redis caching reduces database queries by 75% during peak content delivery."
  }
];

export default function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--architect-navy)]/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
            // SYSTEM BLUEPRINTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">
            DEPLOYED SYSTEMS
          </h2>
          <p className="text-lg text-[var(--architect-concrete)] max-w-3xl font-light leading-relaxed">
            Strategic implementations demonstrating systems thinking, scalable architecture, and operational excellence.
          </p>
        </motion.div>

        <div className="space-y-8 mb-12">
          {systemBlueprints.map((system, index) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-[var(--architect-navy)]/30 border-2 border-[var(--architect-teal)]/30 hover:border-[var(--architect-teal)]/60 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* System Header */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                              REF.{String(index + 1).padStart(3, '0')}
                            </div>
                            <div className={`px-2 py-1 text-xs font-mono border ${
                              system.status === 'OPERATIONAL' 
                                ? 'text-[var(--architect-teal)] border-[var(--architect-teal)]/50 bg-[var(--architect-teal)]/10'
                                : 'text-[var(--architect-rust)] border-[var(--architect-rust)]/50 bg-[var(--architect-rust)]/10'
                            }`}>
                              {system.status}
                            </div>
                            <div className="px-2 py-1 text-xs font-mono text-[var(--architect-concrete)] border border-[var(--architect-concrete)]/30">
                              {system.classification}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white font-mono tracking-wider mb-3">
                            {system.designation}
                          </h3>
                          <p className="text-[var(--architect-concrete)] leading-relaxed mb-4">
                            {system.objective}
                          </p>
                          <div className="bg-[var(--architect-charcoal)]/50 p-4 border-l-2 border-[var(--architect-rust)]/50">
                            <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-2">
                              // STRATEGY NOTES
                            </div>
                            <p className="text-sm text-[var(--architect-concrete)] italic">
                              {system.strategyNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Specifications */}
                    <div className="space-y-4">
                      <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                        // TECH SPECIFICATIONS
                      </div>
                      <div className="space-y-2">
                        {Object.entries(system.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-1 border-b border-[var(--architect-teal)]/20">
                            <span className="text-xs font-mono text-[var(--architect-concrete)]/80 tracking-wider">
                              {key}:
                            </span>
                            <span className="text-sm font-medium text-[var(--architect-teal)]">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Controls */}
                      <div className="pt-4 space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full border-[var(--architect-teal)]/50 text-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/10 font-mono text-xs tracking-wider"
                          onClick={() => window.open(system.githubUrl, '_blank')}
                        >
                          <Github className="w-3 h-3 mr-2" />
                          ACCESS REPOSITORY
                        </Button>
                        {system.deploymentUrl && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full border-[var(--architect-rust)]/50 text-[var(--architect-rust)] hover:bg-[var(--architect-rust)]/10 font-mono text-xs tracking-wider"
                            onClick={() => window.open(system.deploymentUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            VIEW DEPLOYMENT
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/projects">
            <Button 
              size="lg" 
              className="bg-[var(--architect-teal)] hover:bg-[var(--architect-teal)]/80 text-[var(--architect-charcoal)] font-mono tracking-wider uppercase px-8 py-4"
            >
              ACCESS FULL ARCHIVE
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
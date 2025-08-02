import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Database, 
  Code, 
  Globe, 
  Shield, 
  Zap, 
  Activity,
  Network
} from "lucide-react";

const technicalSpecs = [
  {
    category: "BACKEND SYSTEMS",
    designation: "Core Infrastructure",
    icon: Server,
    capabilities: [
      { name: "Node.js", proficiency: 85, classification: "OPERATIONAL" },
      { name: "Express.js", proficiency: 80, classification: "OPERATIONAL" },
      { name: "RESTful APIs", proficiency: 90, classification: "MASTERED" },
      { name: "Microservices", proficiency: 70, classification: "DEVELOPING" }
    ],
    color: "var(--architect-teal)",
    description: "Real-time logging system using Redis and Bun"
  },
  {
    category: "DATA ARCHITECTURE",
    designation: "Information Systems", 
    icon: Database,
    capabilities: [
      { name: "PostgreSQL", proficiency: 85, classification: "OPERATIONAL" },
      { name: "MongoDB", proficiency: 75, classification: "OPERATIONAL" },
      { name: "Redis", proficiency: 80, classification: "OPERATIONAL" },
      { name: "Database Design", proficiency: 85, classification: "MASTERED" }
    ],
    color: "var(--architect-rust)",
    description: "Optimized query performance by 75% in production"
  },
  {
    category: "PROGRAMMING PROTOCOLS",
    designation: "Language Mastery",
    icon: Code,
    capabilities: [
      { name: "JavaScript", proficiency: 90, classification: "MASTERED" },
      { name: "TypeScript", proficiency: 85, classification: "OPERATIONAL" },
      { name: "Python", proficiency: 70, classification: "DEVELOPING" },
      { name: "SQL", proficiency: 80, classification: "OPERATIONAL" }
    ],
    color: "var(--architect-teal)",
    description: "Type-safe development across full-stack implementations"
  },
  {
    category: "INTERFACE SYSTEMS",
    designation: "User Integration",
    icon: Globe,
    capabilities: [
      { name: "React", proficiency: 75, classification: "OPERATIONAL" },
      { name: "HTML5", proficiency: 85, classification: "MASTERED" },
      { name: "CSS3", proficiency: 80, classification: "OPERATIONAL" },
      { name: "Tailwind CSS", proficiency: 90, classification: "MASTERED" }
    ],
    color: "var(--architect-concrete)",
    description: "Component-based architecture for scalable frontends"
  },
  {
    category: "SECURITY PROTOCOLS",
    designation: "Defense Systems",
    icon: Shield,
    capabilities: [
      { name: "JWT", proficiency: 85, classification: "OPERATIONAL" },
      { name: "OAuth", proficiency: 75, classification: "OPERATIONAL" },
      { name: "bcrypt", proficiency: 80, classification: "OPERATIONAL" },
      { name: "API Security", proficiency: 85, classification: "MASTERED" }
    ],
    color: "var(--architect-rust)",
    description: "Zero-breach authentication across distributed systems"
  },
  {
    category: "DEVELOPMENT ARSENAL",
    designation: "Tactical Tools",
    icon: Zap,
    capabilities: [
      { name: "Git", proficiency: 90, classification: "MASTERED" },
      { name: "Docker", proficiency: 75, classification: "OPERATIONAL" },
      { name: "Postman", proficiency: 85, classification: "OPERATIONAL" },
      { name: "VS Code", proficiency: 95, classification: "MASTERED" }
    ],
    color: "var(--architect-teal)",
    description: "Containerized deployments with CI/CD automation"
  }
];

export default function SkillsSummarySection() {
  return (
    <section id="skills-summary" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--architect-navy)]/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.3em] uppercase mb-4">
            // TECHNICAL SPECIFICATIONS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">
            SYSTEM CAPABILITIES
          </h2>
          <p className="text-lg text-[var(--architect-concrete)] max-w-3xl font-light leading-relaxed">
            Network architecture demonstrating operational readiness across distributed systems and real-world implementations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {technicalSpecs.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[var(--architect-navy)]/30 border-2 border-[var(--architect-teal)]/30 hover:border-[var(--architect-teal)]/60 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[var(--architect-charcoal)]/50 border border-[var(--architect-teal)]/30">
                        <spec.icon className="w-5 h-5" style={{ color: spec.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase">
                          {spec.category}
                        </div>
                        <CardTitle className="text-lg font-mono text-white tracking-wider">
                          {spec.designation}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[var(--architect-concrete)]/60">
                      NODE.{String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="bg-[var(--architect-charcoal)]/30 p-3 border-l-2 border-[var(--architect-rust)]/50">
                    <div className="text-xs font-mono text-[var(--architect-concrete)]/60 tracking-[0.2em] uppercase mb-1">
                      // IMPLEMENTATION NOTE
                    </div>
                    <p className="text-sm text-[var(--architect-concrete)] italic">
                      {spec.description}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {spec.capabilities.map((capability, capIndex) => (
                    <motion.div
                      key={capability.name}
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: (index * 0.1) + (capIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-[var(--architect-concrete)]">
                            {capability.name}
                          </span>
                          <span className={`px-2 py-1 text-xs font-mono border ${
                            capability.classification === 'MASTERED' 
                              ? 'text-[var(--architect-teal)] border-[var(--architect-teal)]/50 bg-[var(--architect-teal)]/10'
                              : capability.classification === 'OPERATIONAL'
                              ? 'text-[var(--architect-rust)] border-[var(--architect-rust)]/50 bg-[var(--architect-rust)]/10'
                              : 'text-[var(--architect-concrete)] border-[var(--architect-concrete)]/30 bg-[var(--architect-concrete)]/10'
                          }`}>
                            {capability.classification}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[var(--architect-concrete)]/60">
                          {capability.proficiency}%
                        </span>
                      </div>
                      
                      <div className="relative h-2 bg-[var(--architect-charcoal)]/50 overflow-hidden">
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--architect-teal)] to-[var(--architect-rust)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${capability.proficiency}%` }}
                          transition={{ duration: 1, delay: (index * 0.1) + (capIndex * 0.1) }}
                          viewport={{ once: true }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
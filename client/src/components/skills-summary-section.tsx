import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  Code, 
  Globe, 
  Shield, 
  Zap 
} from "lucide-react";

const skillCategories = [
  {
    title: "Backend Development",
    icon: Server,
    skills: ["Node.js", "Express.js", "RESTful APIs", "Microservices"],
    color: "text-cyan-400"
  },
  {
    title: "Database Technologies",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Database Design"],
    color: "text-blue-400"
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
    color: "text-green-400"
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS"],
    color: "text-purple-400"
  },
  {
    title: "Authentication & Security",
    icon: Shield,
    skills: ["JWT", "OAuth", "bcrypt", "API Security"],
    color: "text-red-400"
  },
  {
    title: "Development Tools",
    icon: Zap,
    skills: ["Git", "Docker", "Postman", "VS Code"],
    color: "text-yellow-400"
  }
];

export default function SkillsSummarySection() {
  return (
    <section id="skills-summary" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          
          {/* Terminal-style output */}
          <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-6 font-mono text-base">
            <div className="text-cyan-400 mb-4">raja@portfolio:~$ cat technical_skills.txt</div>
            
            <div className="space-y-3 text-gray-300">
              <div><span className="text-cyan-400">&gt;</span> primary_languages: JavaScript, TypeScript, Python</div>
              <div><span className="text-cyan-400">&gt;</span> backend_frameworks: Node.js, Express.js</div>
              <div><span className="text-cyan-400">&gt;</span> databases: PostgreSQL, MongoDB, Redis</div>
              <div><span className="text-cyan-400">&gt;</span> frontend_tech: React, HTML5, CSS3, Tailwind CSS</div>
              <div><span className="text-cyan-400">&gt;</span> tools: Git, Docker, Postman, VS Code</div>
              <div><span className="text-cyan-400">&gt;</span> current_focus: API Design, Database Optimization</div>
              <div><span className="text-cyan-400">&gt;</span> learning: Next.js, GraphQL, AWS</div>
            </div>
            
            <div className="text-cyan-400 mt-4">raja@portfolio:~$ █</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
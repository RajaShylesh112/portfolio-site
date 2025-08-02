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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My technical expertise spans across modern backend technologies and development tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <category.icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
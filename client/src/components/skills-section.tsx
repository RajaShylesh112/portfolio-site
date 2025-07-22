import { motion } from "framer-motion";
import { Code, Server, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "JavaScript", level: 85, color: "bg-yellow-500" },
      { name: "Python", level: 80, color: "bg-blue-500" },
      { name: "React.js", level: 75, color: "bg-cyan-500" },
      { name: "Flutter", level: 70, color: "bg-blue-400" },
    ],
  },
  {
    title: "Backend & Databases",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "SQL", level: 80, color: "bg-orange-500" },
      { name: "Supabase", level: 75, color: "bg-emerald-500" },
      { name: "Firebase", level: 70, color: "bg-yellow-600" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Git", level: 85, color: "bg-red-500" },
      { name: "VS Code", level: 90, color: "bg-purple-500" },
      { name: "Netlify", level: 75, color: "bg-blue-600" },
      { name: "Stripe API", level: 65, color: "bg-indigo-500" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-muted/50 dark:bg-slate-800/50 section-reveal">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Technical <span className="text-primary dark:neon-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modern technologies and frameworks I work with to build scalable solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card dark:bg-slate-800 border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-blue-400 flex items-center">
                    {category.icon}
                    <span className="ml-3">{category.title}</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-muted-foreground text-sm">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-muted dark:bg-slate-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${skill.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.5, 
                                delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 
                              }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
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

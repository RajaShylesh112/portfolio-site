import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "MuseMap",
    description: "A full-stack museum ticketing site with intelligent chatbot for guided reservations. Built with React.js frontend, Supabase backend, and integrated Stripe payments for seamless user experience.",
    technologies: ["React.js", "Supabase", "Stripe API", "Chatbot"],
    period: "March 2025 – June 2025",
    icon: "🏛️",
  },
  {
    title: "Sidekick",
    description: "A comprehensive mobile platform designed to streamline everyday college life. Built with Flutter for cross-platform compatibility and Firebase for real-time data synchronization.",
    technologies: ["Flutter", "Firebase", "Real-time", "Cross-platform"],
    period: "July 2025 – Present",
    icon: "📱",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Featured <span className="text-primary dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest work showcasing full-stack development and problem-solving skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full bg-card dark:bg-slate-800 border-border hover:border-primary dark:hover:border-blue-400 transition-all duration-300 group">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{project.icon}</span>
                      <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/10 text-primary dark:bg-blue-400/10 dark:text-blue-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{project.period}</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border hover:border-primary dark:hover:border-blue-400"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
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

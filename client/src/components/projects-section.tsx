import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMouseFollower } from "@/hooks/use-gsap-animations";
import { useRef } from "react";
import { useProjects } from "@/components/project-provider";

function ProjectCard({ project, index }: { project: ReturnType<typeof useProjects>["projects"][number], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useMouseFollower(cardRef);

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="project-card"
    >
      <Card 
        ref={cardRef}
        className="h-full bg-card dark:bg-black/50 border-border hover:border-primary dark:hover:neon-border transition-all duration-300 group glow-effect backdrop-blur-sm overflow-hidden"
      >
        <CardContent className="p-8 h-full flex flex-col relative overflow-hidden">
          <div className="mb-6 aspect-video rounded-lg overflow-hidden bg-slate-800/60">
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-4xl">{project.icon}</div>
            )}
          </div>
          {/* Floating particles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full floating-particle opacity-60" />
          <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400 rounded-full floating-particle opacity-40" />
          <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-green-400 rounded-full floating-particle opacity-50" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{project.icon}</span>
              <h3 className="text-2xl font-bold text-foreground group-hover:neon-text transition-all duration-300">{project.title}</h3>
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
                className="bg-primary/10 text-primary dark:bg-cyan-400/10 dark:text-cyan-400 hover:bg-cyan-400/20 transition-colors"
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
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-black transition-all"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Demo
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-border hover:border-primary dark:hover:border-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { projects } = useProjects();

  return (
    <section id="projects" className="section-padding section-reveal">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Featured <span className="text-primary dark:neon-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest editable project showcase
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
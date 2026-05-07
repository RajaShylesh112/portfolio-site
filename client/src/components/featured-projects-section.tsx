import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useProjects } from "@/components/project-provider";

export default function FeaturedProjectsSection() {
  const { projects } = useProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = projects.filter((project) => !project.featured);
  const displayProjects = [...featuredProjects, ...nonFeaturedProjects].slice(0, 3);

  return (
    <section id="featured-projects" className="py-20 px-4 sm:px-6 lg:px-8">
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
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my featured work, kept editable from the admin panel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                rotateY: 5,
                rotateX: 5
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}
            >
              <Card className="group bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden">
                <div className="aspect-video bg-slate-700/50 rounded-t-lg overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-4xl">🚀</div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-400/50 hover:bg-cyan-400/10"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-400/50 hover:bg-cyan-400/10"
                        onClick={() => window.open(project.demoUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
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
            <Button size="lg" variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
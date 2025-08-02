import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const featuredProjects = [
  {
    id: "ecommerce-api",
    title: "E-commerce API",
    description: "RESTful API for online shopping platform with authentication, payment processing, and order management. Built with scalability and security in mind.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    githubUrl: "https://github.com/rajashylesh/ecommerce-api",
    demoUrl: "https://ecommerce-api-demo.com"
  },
  {
    id: "task-manager",
    title: "Task Management System",
    description: "Full-stack task management application with real-time updates, user collaboration, and project organization features.",
    technologies: ["Node.js", "Socket.io", "PostgreSQL", "React", "TypeScript"],
    githubUrl: "https://github.com/rajashylesh/task-manager",
    demoUrl: "https://task-manager-demo.com"
  },
  {
    id: "blog-cms",
    title: "Blog CMS",
    description: "Content Management System for blogs with admin dashboard, rich text editor, and caching for optimal performance.",
    technologies: ["Node.js", "Express", "MySQL", "Redis", "TinyMCE"],
    githubUrl: "https://github.com/rajashylesh/blog-cms"
  }
];

export default function FeaturedProjectsSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A selection of my best work showcasing full-stack development skills and modern technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-slate-800/50 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 h-full">
                <div className="aspect-video bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-t-lg flex items-center justify-center border-b border-cyan-400/20">
                  <div className="text-4xl opacity-60">🚀</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="text-xs bg-slate-700/50 text-gray-300 border border-slate-600/50 font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-mono text-xs"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                    {project.demoUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 font-mono text-xs"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
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
            <Button 
              size="lg" 
              variant="outline"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-3 font-mono transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
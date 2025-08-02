import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Filter, X } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "ecommerce-api",
    title: "E-commerce API",
    description: "RESTful API for online shopping platform with authentication and payment processing",
    longDescription: "A comprehensive e-commerce backend API built with Node.js and Express, featuring user authentication, product management, shopping cart functionality, order processing, and Stripe payment integration. Includes JWT-based authentication, role-based access control, and comprehensive API documentation.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    category: "Backend",
    githubUrl: "https://github.com/RajaShylesh112/ecommerce-api",
    demoUrl: "https://ecommerce-api-demo.com",
    featured: true
  },
  {
    id: "task-manager",
    title: "Task Management System",
    description: "Full-stack task management application with real-time updates",
    longDescription: "A collaborative task management system with real-time updates using WebSocket connections. Features include project creation, task assignment, progress tracking, team collaboration, and notification system. Built with modern tech stack focusing on performance and user experience.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Socket.io", "PostgreSQL", "React", "TypeScript"],
    category: "Full-stack",
    githubUrl: "https://github.com/RajaShylesh112/task-manager",
    demoUrl: "https://task-manager-demo.com",
    featured: true
  },
  {
    id: "blog-cms",
    title: "Blog CMS",
    description: "Content Management System for blogs with admin dashboard",
    longDescription: "A complete content management system designed for bloggers and content creators. Features include rich text editor, media management, SEO optimization, comment system, user roles, and analytics dashboard. Built with focus on performance and SEO best practices.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Express", "MySQL", "Redis", "TinyMCE"],
    category: "Backend",
    githubUrl: "https://github.com/RajaShylesh112/blog-cms",
    featured: true
  },
  {
    id: "chat-app",
    title: "Real-time Chat Application",
    description: "WebSocket-based chat application with rooms and file sharing",
    longDescription: "A real-time chat application supporting multiple chat rooms, private messaging, file sharing, and emoji reactions. Built with Socket.io for real-time communication, featuring message encryption, user presence indicators, and message history.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Socket.io", "MongoDB", "Multer", "bcrypt"],
    category: "Real-time",
    githubUrl: "https://github.com/RajaShylesh112/chat-app",
    demoUrl: "https://chat-app-demo.com",
    featured: false
  },
  {
    id: "weather-api",
    title: "Weather Dashboard API",
    description: "Weather data aggregation service with caching and analytics",
    longDescription: "A weather data aggregation service that collects data from multiple weather APIs, provides caching for improved performance, and offers analytics on weather patterns. Features include location-based forecasts, historical data analysis, and alert notifications.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Redis", "PostgreSQL", "Cron", "External APIs"],
    category: "Backend",
    githubUrl: "https://github.com/RajaShylesh112/weather-api",
    featured: false
  },
  {
    id: "url-shortener",
    title: "URL Shortener Service",
    description: "Custom URL shortening service with analytics and QR codes",
    longDescription: "A URL shortening service similar to bit.ly, featuring custom short URLs, click analytics, QR code generation, and link expiration. Built with focus on performance and scalability, including rate limiting and spam protection.",
    image: "/api/placeholder/400/300",
    technologies: ["Node.js", "Express", "MongoDB", "QR Code", "Rate Limiting"],
    category: "Backend",
    githubUrl: "https://github.com/RajaShylesh112/url-shortener",
    demoUrl: "https://short.ly-demo.com",
    featured: false
  }
];

const categories = ["All", "Backend", "Full-stack", "Real-time"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A collection of projects showcasing my backend development skills and passion for building scalable applications
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/50 transition-all duration-300 cursor-pointer h-full hover:shadow-lg"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video bg-gray-200 dark:bg-slate-700/50 rounded-t-lg flex items-center justify-center">
                    <div className="text-4xl">🚀</div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      {project.featured && (
                        <Badge className="bg-cyan-600 text-white">Featured</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      {project.demoUrl && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demoUrl, '_blank');
                          }}
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
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedProject.title}</h2>
                  <Badge className="bg-cyan-600 text-white">{selectedProject.category}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="aspect-video bg-gray-200 dark:bg-slate-700/50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-6xl">🚀</div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
                {selectedProject.demoUrl && (
                  <Button 
                    variant="outline" 
                    className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                    onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
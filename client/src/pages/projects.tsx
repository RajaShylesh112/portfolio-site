import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Filter, X } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useProjects } from "@/components/project-provider";
import type { ProjectRecord } from "@/lib/project-store";

export default function Projects() {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  // Dynamically collect unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach(project => {
      if (project.category) {
        uniqueCategories.add(project.category);
      }
    });
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [projects]);

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
                  className="group bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/50 transition-all duration-300 cursor-pointer h-full hover:shadow-lg overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video bg-gray-200 dark:bg-slate-700/50 rounded-t-lg overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-4xl">🚀</div>
                    )}
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
              
              <div className="aspect-video bg-gray-200 dark:bg-slate-700/50 rounded-lg overflow-hidden mb-6">
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-6xl">🚀</div>
                )}
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
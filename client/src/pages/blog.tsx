import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Terminal } from "lucide-react";
import Navigation from "@/components/navigation";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "log_2025_01_15_building_scalable_auth",
    title: "log_2025_01_15_building_scalable_auth.md",
    excerpt: "Implementing JWT authentication patterns for distributed systems. Sub-100ms token validation across microservices.",
    content: "Full blog content here...",
    date: "2025-01-15",
    readTime: "8 min",
    tags: ["auth", "jwt", "node.js"],
    featured: true
  },
  {
    id: "log_2025_01_08_database_performance",
    title: "log_2025_01_08_database_performance.md",
    excerpt: "Query optimization techniques that reduced response times by 75%. Indexing strategies for high-throughput systems.",
    content: "Full blog content here...",
    date: "2025-01-08",
    readTime: "12 min",
    tags: ["database", "postgresql", "performance"],
    featured: true
  },
  {
    id: "log_2025_01_01_microservices_patterns",
    title: "log_2025_01_01_microservices_patterns.md",
    excerpt: "Architectural patterns for resilient distributed systems. Circuit breakers, bulkheads, and graceful degradation.",
    content: "Full blog content here...",
    date: "2025-01-01",
    readTime: "15 min",
    tags: ["microservices", "architecture", "resilience"],
    featured: false
  },
  {
    id: "log_2024_12_25_api_design",
    title: "log_2024_12_25_api_design.md",
    excerpt: "RESTful API design principles for maintainable backends. Versioning, error handling, and documentation strategies.",
    content: "Full blog content here...",
    date: "2024-12-25",
    readTime: "10 min",
    tags: ["api", "rest", "design"],
    featured: false
  }
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <CustomCursor />
      <Navigation />
      <ScrollProgress />
      {/* Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Terminal className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white font-mono">
                Field Notes
              </h1>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl font-mono">
              {">> Development logs, system insights, and architectural discoveries"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terminal Logs */}
      <section className="relative pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="group bg-black/50 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-mono text-sm text-cyan-400">#{String(index + 1).padStart(3, '0')}</span>
                            <span className="font-mono text-xs text-gray-500">
                              [{new Date(post.date).toISOString().split('T')[0]}]
                            </span>
                            <span className="font-mono text-xs text-gray-500">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-mono text-lg text-white group-hover:text-cyan-400 transition-colors mb-3">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="font-mono text-xs px-2 py-1 bg-slate-800/50 text-emerald-400 border border-emerald-400/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-cyan-400 hover:text-cyan-300 font-mono ml-4"
                        >
                          cat
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Footer */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-black/80 border border-cyan-400/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="font-mono text-sm text-gray-400 mb-4">
                  raja@system:~/blog$
                </div>
                <p className="text-gray-300 mb-6 font-mono">
                  {">> More system logs and architectural insights coming soon..."}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                  >
                    cd ~/
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 font-mono"
                  >
                    ls -la
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import FloatingElements from "@/components/floating-elements";
import AnimatedDots from "@/components/animated-dots";

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
    id: "building-scalable-apis",
    title: "Building Scalable REST APIs with Node.js",
    excerpt: "Learn best practices for designing and implementing scalable REST APIs that can handle thousands of requests per second.",
    content: "Full blog content here...",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Node.js", "API Design", "Performance"],
    featured: true
  },
  {
    id: "database-optimization",
    title: "Database Optimization Techniques",
    excerpt: "Explore advanced database optimization strategies to improve query performance and reduce response times.",
    content: "Full blog content here...",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["Database", "PostgreSQL", "Performance"],
    featured: true
  },
  {
    id: "microservices-patterns",
    title: "Microservices Design Patterns",
    excerpt: "Understanding common microservices patterns and when to use them in your backend architecture.",
    content: "Full blog content here...",
    date: "2024-01-01",
    readTime: "15 min read",
    tags: ["Microservices", "Architecture", "Backend"],
    featured: false
  },
  {
    id: "jwt-authentication",
    title: "Implementing JWT Authentication",
    excerpt: "A comprehensive guide to implementing secure JWT-based authentication in Node.js applications.",
    content: "Full blog content here...",
    date: "2023-12-25",
    readTime: "10 min read",
    tags: ["Authentication", "JWT", "Security"],
    featured: false
  }
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground relative">
      <CustomCursor />
      <Navigation />
      <ScrollProgress />
      <FloatingElements />
      <AnimatedDots position="top-left" />
      <AnimatedDots position="top-right" />
      <AnimatedDots position="bottom-left" />
      <AnimatedDots position="bottom-right" />
      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about backend development, system design, and technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="group bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 h-full cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="p-0 h-auto text-cyan-400 hover:text-cyan-300">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="group bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 md:ml-4">
                          Read more
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

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-400/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Get notified when I publish new articles about backend development and system design
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400"
                  />
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    Subscribe
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
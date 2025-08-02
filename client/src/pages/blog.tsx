import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Tag, ExternalLink, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface LearningEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  context: string;
  attempt: string;
  outcome: string;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  tags: string[];
  status: 'completed' | 'in-progress' | 'stuck' | 'revisited';
}

const learningEntries: LearningEntry[] = [
  {
    id: "session-store-design",
    date: "2025-01-15",
    title: "Session Store Design: JWT vs Redis",
    category: "Backend",
    context: "Need to implement user sessions for a multi-user chat app. Debating between stateless JWT tokens and Redis-based sessions.",
    attempt: "Built sample auth microservice with both approaches. Tested JWT with refresh tokens and Redis with TTL sessions.",
    outcome: "JWT works for simple auth, but Redis gives better control for chat presence. Stuck on cache invalidation patterns.",
    links: {
      github: "https://github.com/RajaShylesh112/auth-comparison",
      demo: "https://auth-demo.vercel.app"
    },
    tags: ["Authentication", "Redis", "JWT", "Node.js"],
    status: "in-progress"
  },
  {
    id: "database-indexing-experiment",
    date: "2025-01-08",
    title: "PostgreSQL Query Optimization Deep Dive",
    category: "Database",
    context: "University project queries were taking 2+ seconds on 10k records. Professor mentioned indexing but didn't explain how.",
    attempt: "Read PostgreSQL docs, experimented with B-tree, Hash, and GIN indexes. Used EXPLAIN ANALYZE extensively.",
    outcome: "Query time down to 15ms with composite index. Learned about index bloat and maintenance overhead.",
    links: {
      github: "https://github.com/RajaShylesh112/pg-indexing-study",
      docs: "https://wiki.postgresql.org/wiki/Performance_Optimization"
    },
    tags: ["PostgreSQL", "Performance", "Indexing"],
    status: "completed"
  },
  {
    id: "docker-networking-confusion",
    date: "2025-01-02",
    title: "Docker Container Communication Patterns",
    category: "DevOps",
    context: "Containers couldn't talk to each other in my 3-tier app setup. Bridge networks, host networking - all confusing.",
    attempt: "Built test app with frontend, API, and database containers. Tried different network configurations.",
    outcome: "Docker Compose with custom networks solved it. Still don't fully understand overlay networks for production.",
    links: {
      github: "https://github.com/RajaShylesh112/docker-networking-test"
    },
    tags: ["Docker", "Networking", "DevOps"],
    status: "stuck"
  },
  {
    id: "api-rate-limiting",
    date: "2024-12-20",
    title: "Implementing Rate Limiting in Express.js",
    category: "System Design",
    context: "Assignment required API rate limiting. Simple in-memory counters vs Redis-backed sliding window.",
    attempt: "Implemented both approaches. Tested with artillery.js load testing tool.",
    outcome: "In-memory works for single instance, Redis needed for horizontal scaling. Rate limiting is harder than expected.",
    links: {
      github: "https://github.com/RajaShylesh112/rate-limiting-study"
    },
    tags: ["Rate Limiting", "Express.js", "System Design"],
    status: "completed"
  },
  {
    id: "event-driven-architecture",
    date: "2024-12-15",
    title: "Message Queues: RabbitMQ vs Redis Pub/Sub",
    category: "University",
    context: "Distributed systems course project. Need to implement event-driven communication between microservices.",
    attempt: "Built order processing system with both RabbitMQ and Redis. Compared reliability and performance.",
    outcome: "RabbitMQ better for guaranteed delivery, Redis faster for simple pub/sub. Updated after feedback from TA.",
    links: {
      github: "https://github.com/RajaShylesh112/message-queue-comparison"
    },
    tags: ["Message Queues", "RabbitMQ", "Redis", "Microservices"],
    status: "revisited"
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<LearningEntry | null>(null);
  
  const categories = ['all', ...Array.from(new Set(learningEntries.map(entry => entry.category)))];
  
  const filteredEntries = learningEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleEntryClick = (entry: LearningEntry) => {
    setSelectedEntry(entry);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'stuck': return 'text-red-400';
      case 'revisited': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };
  
  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-background dark:bg-black text-foreground relative">
        <Navigation />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedEntry(null)}
              className="mb-6 text-cyan-400 hover:text-cyan-300"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Learning Log
            </Button>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <header>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedEntry.date}</span>
                  <Badge variant="secondary">{selectedEntry.category}</Badge>
                  <span className={`font-mono ${getStatusColor(selectedEntry.status)}`}>
                    [{selectedEntry.status}]
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{selectedEntry.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-cyan-400">Context / Problem</h2>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <p className="text-gray-300">{selectedEntry.context}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-cyan-400">Attempt / Exploration</h2>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <p className="text-gray-300">{selectedEntry.attempt}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-cyan-400">Outcome / What I Learned</h2>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <p className="text-gray-300">{selectedEntry.outcome}</p>
                  </div>
                </section>
                
                {selectedEntry.links && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-cyan-400">Links / Code / Resources</h2>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div className="space-y-2">
                        {selectedEntry.links.github && (
                          <a 
                            href={selectedEntry.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            GitHub Repository
                          </a>
                        )}
                        {selectedEntry.links.demo && (
                          <a 
                            href={selectedEntry.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {selectedEntry.links.docs && (
                          <a 
                            href={selectedEntry.links.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Documentation
                          </a>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </motion.article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground relative">
      <Navigation />
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Learning Lab
            </h1>
            <p className="text-xl text-gray-400 font-mono mb-8">
              Things I've broken, built, and understood as I study CS and systems.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search experiments, tags, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 focus:border-cyan-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Entries Table */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3">
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleEntryClick(entry)}
                  className="cursor-pointer"
                >
                  <Card className="bg-slate-900/30 border-slate-700 hover:border-cyan-400/50 transition-all duration-200 hover:bg-slate-900/50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Date */}
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                            <Calendar className="w-3 h-3" />
                            <span>{entry.date}</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <div className="md:col-span-4">
                          <h3 className="font-semibold text-white hover:text-cyan-400 transition-colors">
                            {entry.title}
                          </h3>
                        </div>
                        
                        {/* Category & Status */}
                        <div className="md:col-span-2">
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-xs w-fit">
                              <Tag className="w-3 h-3 mr-1" />
                              {entry.category}
                            </Badge>
                            <span className={`text-xs font-mono ${getStatusColor(entry.status)}`}>
                              [{entry.status}]
                            </span>
                          </div>
                        </div>
                        
                        {/* Outcome Hint */}
                        <div className="md:col-span-3">
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {entry.outcome.split('.')[0]}...
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="md:col-span-1 text-right">
                          <ArrowRight className="w-4 h-4 text-gray-500 hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredEntries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-mono">No entries found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Tag, ExternalLink, ArrowRight, Clock } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface BlogEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Student Project' | 'Deep Dive';
  readTime: string;
  hook: string;
  background: string;
  whatITried: string;
  whereItFailed: string;
  finalDecision: string;
  whatILearned: string[];
  references: string[];
  tags: string[];
  featured: boolean;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

const blogEntries: BlogEntry[] = [
  {
    id: "designing-cache-strategy",
    date: "2025-01-15",
    title: "Designing a Cache Strategy for My Student Project",
    category: "System Design",
    level: "Student Project",
    readTime: "7 min read",
    hook: "While building a project management app for my CS course, I realized my database queries were getting slower as data grew. Users were complaining about 3-second load times. This led me down a rabbit hole of caching strategies that completely changed how I think about performance.",
    background: "The project was a simple task management system with users, projects, and tasks. Initially, I was making direct database calls for every page load, including nested queries to fetch user permissions and project details. With 1000+ tasks, the main dashboard query took 2.8 seconds.",
    whatITried: "I experimented with three approaches: Redis for session storage, application-level caching with Node.js Map objects, and database query optimization with indexes. I also tried implementing a simple LRU cache for frequently accessed project data.",
    whereItFailed: "The in-memory cache worked locally but failed when I deployed to multiple server instances. Redis helped but introduced complexity around cache invalidation. My biggest mistake was caching too aggressively without considering data consistency.",
    finalDecision: "I ended up using Redis for session data and a hybrid approach for application data: aggressive caching for read-heavy operations with TTL-based invalidation, and immediate cache clearing for write operations. Added database indexes as the foundation.",
    whatILearned: [
      "Cache invalidation is genuinely one of the hardest problems in CS",
      "Start with database optimization before adding cache layers",
      "TTL-based caching is safer than manual invalidation for student projects",
      "Monitor cache hit rates - I was only getting 40% initially",
      "Redis cluster setup is overkill for most student projects"
    ],
    references: [
      "Redis documentation on TTL patterns",
      "High Performance Browser Networking by Ilya Grigorik",
      "My GitHub repo with benchmarking results"
    ],
    tags: ["Caching", "Redis", "Performance", "Node.js"],
    featured: true,
    links: {
      github: "https://github.com/RajaShylesh112/cache-strategy-study",
      demo: "https://task-manager-cached.vercel.app"
    }
  },
  {
    id: "ditching-mongodb-for-postgresql",
    date: "2025-01-08",
    title: "Why I Ditched MongoDB for PostgreSQL in My Backend",
    category: "Database",
    level: "Deep Dive",
    readTime: "10 min read",
    hook: "Everyone said MongoDB was perfect for rapid prototyping. After three weeks of schema changes and query headaches on my social media clone project, I made the painful decision to migrate everything to PostgreSQL. Here's what I learned about choosing the right database.",
    background: "I was building a Twitter-like app with posts, comments, likes, and user relationships. MongoDB seemed ideal because of flexible schemas and the JSON-like document structure. The initial setup was indeed faster - no migrations, just start coding.",
    whatITried: "I started with MongoDB's flexible schema, using embedded documents for comments and references for user data. When relationships got complex, I tried population, aggregation pipelines, and even considered denormalization patterns from MongoDB's best practices.",
    whereItFailed: "Three major issues emerged: (1) Complex queries became unreadable with nested aggregations, (2) No referential integrity led to orphaned data when I deleted users, (3) Schema flexibility became a curse when I needed to refactor data structures.",
    finalDecision: "I migrated to PostgreSQL with a properly normalized schema. Used foreign keys for data integrity, created indexes for performance, and leveraged SQL's mature query capabilities. The migration took two days but solved months of headaches.",
    whatILearned: [
      "Schema flexibility is overrated for most applications",
      "SQL joins are more intuitive than MongoDB aggregations for relational data",
      "Database constraints prevent bugs that manual validation misses",
      "ACID transactions matter more than I initially thought",
      "PostgreSQL's JSON columns give you flexibility when you actually need it"
    ],
    references: [
      "PostgreSQL documentation on JSON types",
      "Use The Index, Luke! by Markus Winand",
      "MongoDB to PostgreSQL migration guide"
    ],
    tags: ["PostgreSQL", "MongoDB", "Database Design", "Migration"],
    featured: true,
    links: {
      github: "https://github.com/RajaShylesh112/mongo-to-postgres-migration"
    }
  },
  {
    id: "github-actions-journey",
    date: "2024-12-28",
    title: "My Journey with GitHub Actions: From Clueless to Confident",
    category: "DevOps",
    level: "Beginner",
    readTime: "6 min read",
    hook: "I used to manually deploy every project by SSH-ing into my server and running git pull. Then I discovered GitHub Actions. What started as a simple deployment automation turned into a deep dive into CI/CD that transformed my development workflow.",
    background: "My deployment process was manual and error-prone: pull code, install dependencies, restart services, and pray nothing broke. I wanted to automate this but was intimidated by complex CI/CD tools like Jenkins. GitHub Actions seemed approachable.",
    whatITried: "Started with a basic workflow that ran tests on push. Then added deployment to my VPS using SSH actions. Experimented with different triggers, environment variables, and tried to set up automated testing with a test database.",
    whereItFailed: "My first workflows were overly complex with unnecessary steps. I struggled with secrets management and environment differences between CI and production. Several deployments failed because I forgot to handle database migrations.",
    finalDecision: "Simplified to two workflows: one for testing (runs on all PRs) and one for deployment (runs on main branch). Used GitHub secrets for sensitive data and added proper error handling with rollback capabilities.",
    whatILearned: [
      "Start simple with basic test automation before complex deployments",
      "Environment parity between CI and production is crucial",
      "Secrets management is harder than it looks",
      "Failed deployments teach you more than successful ones",
      "Automation saves time but requires upfront investment"
    ],
    references: [
      "GitHub Actions documentation",
      "Continuous Integration by Martin Fowler",
      "My workflow templates repository"
    ],
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation"],
    featured: false,
    links: {
      github: "https://github.com/RajaShylesh112/github-actions-templates"
    }
  },
  {
    id: "state-management-nextjs",
    date: "2024-12-15",
    title: "State Management in Next.js — What They Don't Tell You",
    category: "Web Dev",
    level: "Student Project",
    readTime: "8 min read",
    hook: "Building my first serious Next.js app, I thought I could just use useState everywhere. Wrong. After prop drilling hell and state synchronization nightmares, I learned why state management libraries exist and when you actually need them.",
    background: "I was building a multi-page dashboard with user authentication, settings, and real-time notifications. Started with local component state and passing props down. It worked for the first few components, then became unmaintainable.",
    whatITried: "Experimented with Context API, Zustand, Redux Toolkit, and even tried SWR for server state. Each solution had different mental models and trade-offs. I built the same feature with different approaches to compare.",
    whereItFailed: "Context API caused unnecessary re-renders. Redux felt like overkill for simple state. Zustand was nice but I struggled with persistence. My biggest mistake was not separating server state from client state early on.",
    finalDecision: "Settled on TanStack Query for server state management and Zustand for client-side state. This separation clarified my mental model and reduced complexity significantly. Used Next.js built-in state for truly local component state.",
    whatILearned: [
      "Separate server state from client state from the beginning",
      "Not all state needs to be global - most can stay local",
      "State management libraries solve real problems, not imaginary ones",
      "Performance optimization should come after functionality",
      "The best state management is often no state management"
    ],
    references: [
      "TanStack Query documentation",
      "State Machines in React by David Khourshid",
      "Zustand GitHub repository"
    ],
    tags: ["Next.js", "State Management", "React", "Frontend"],
    featured: false,
    links: {
      github: "https://github.com/RajaShylesh112/nextjs-state-management",
      demo: "https://state-demo.vercel.app"
    }
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<BlogEntry | null>(null);
  
  const categories = ['all', ...Array.from(new Set(blogEntries.map(entry => entry.category)))];
  
  const filteredEntries = blogEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleEntryClick = (entry: BlogEntry) => {
    setSelectedEntry(entry);
  };
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-500 dark:text-green-400';
      case 'Student Project': return 'text-yellow-500 dark:text-yellow-400';
      case 'Deep Dive': return 'text-red-500 dark:text-red-400';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };
  
  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative">
        <Navigation />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedEntry(null)}
              className="mb-6 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Blog
            </Button>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <header>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedEntry.date}</span>
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">{selectedEntry.category}</Badge>
                  <Badge variant="outline" className={`${getLevelColor(selectedEntry.level)} border-current`}>
                    {selectedEntry.level}
                  </Badge>
                  <Clock className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">{selectedEntry.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{selectedEntry.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedEntry.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-900">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>
              
              <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                <section>
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 italic">
                      "{selectedEntry.hook}"
                    </p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Background</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{selectedEntry.background}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">What I Tried</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{selectedEntry.whatITried}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Where It Failed or Worked</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{selectedEntry.whereItFailed}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">The Final Decision</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{selectedEntry.finalDecision}</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">What I Learned</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <ul className="space-y-2">
                      {selectedEntry.whatILearned.map((lesson, index) => (
                        <li key={index} className="text-gray-800 dark:text-gray-300 flex items-start gap-3">
                          <span className="text-cyan-500 mt-1.5 flex-shrink-0">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">References & Next Steps</h2>
                  <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">References:</h3>
                        <ul className="space-y-1">
                          {selectedEntry.references.map((ref, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                              • {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {selectedEntry.links && (
                        <div>
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Links:</h3>
                          <div className="space-y-2">
                            {selectedEntry.links.github && (
                              <a 
                                href={selectedEntry.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm"
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
                                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </motion.article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Learning Lab
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-mono mb-8">
              In-depth case studies and explorations from my CS journey.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search posts, tags, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-slate-900/50 border-gray-300 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-slate-900/50 border-gray-300 dark:border-slate-700">
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

      {/* Blog Entries */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Featured Posts */}
            {filteredEntries.filter(entry => entry.featured).length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Featured Posts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEntries.filter(entry => entry.featured).map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => handleEntryClick(entry)}
                      className="cursor-pointer"
                    >
                      <Card className="bg-white dark:bg-slate-900/30 border-gray-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg dark:hover:bg-slate-900/50 h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                            <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                              {entry.readTime}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors line-clamp-2">
                            {entry.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                            {entry.hook}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {entry.category}
                            </Badge>
                            <span className={`text-xs px-2 py-1 rounded ${getLevelColor(entry.level)} bg-opacity-10`}>
                              {entry.level}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Posts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">All Posts</h2>
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleEntryClick(entry)}
                  className="cursor-pointer"
                >
                  <Card className="bg-white dark:bg-slate-900/30 border-gray-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400/50 transition-all duration-200 hover:shadow-md dark:hover:bg-slate-900/50">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:items-center">
                        {/* Date & Meta */}
                        <div className="lg:col-span-3">
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-mono">{entry.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {entry.readTime}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Title & Description */}
                        <div className="lg:col-span-6">
                          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {entry.hook.split('.')[0]}...
                          </p>
                        </div>
                        
                        {/* Category & Tags */}
                        <div className="lg:col-span-2">
                          <div className="flex flex-col gap-2">
                            <Badge variant="outline" className="text-xs w-fit bg-gray-50 dark:bg-gray-800">
                              <Tag className="w-3 h-3 mr-1" />
                              {entry.category}
                            </Badge>
                            <span className={`text-xs px-2 py-1 rounded w-fit ${getLevelColor(entry.level)} bg-opacity-10`}>
                              {entry.level}
                            </span>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="lg:col-span-1 flex justify-end">
                          <ArrowRight className="w-5 h-5 text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredEntries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 font-mono">No posts found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
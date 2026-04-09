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
    id: "how-i-built-wanderguide",
    date: "2026-04-09",
    title: "How I Built WanderGuide: Architecture, APIs, and Real-World Tradeoffs",
    category: "Full-stack",
    level: "Student Project",
    readTime: "11 min read",
    hook: "I wanted to build a travel planner that felt practical, not just pretty: multi-stop itineraries, route visualization, and realistic cost estimates in one place. WanderGuide became that project, and it taught me how to connect UX decisions to backend architecture.",
    background: "WanderGuide is a full-stack travel planning application built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Supabase. From day one, I scoped it around three core workflows: discover destinations, build a multi-stop trip, and understand expected costs before booking anything.",
    whatITried: "I designed the backend around Supabase tables for cities, destinations, trips, trip_stops, trip_activities, reviews, and user_profiles. For mapping and travel calculations, I integrated Geoapify for geocoding and OpenRouteService for route/distance logic, then used Leaflet for map rendering. For destination visuals, I implemented a fallback chain (Pexels to Unsplash to Wikimedia Commons) so the UI would remain rich even when one provider had limited results.",
    whereItFailed: "My first iterations surfaced common full-stack issues: API response shape mismatches between route services and map components, cost estimates that felt inconsistent when not normalized by route distance, and UI loading states that looked broken when external APIs were slow. I also had to tighten how trip-stop ordering was persisted to avoid itinerary sequencing bugs.",
    finalDecision: "I standardized API adapters for geospatial providers, moved cost estimation into a dedicated pricing flow, and treated trip ordering as first-class data in the schema. On the frontend, I paired server-rendered screens with clear loading/error states and used reusable UI primitives (shadcn + Tailwind) for consistency. This gave me a project that is easier to extend and significantly more reliable during real usage.",
    whatILearned: [
      "A clear data model for trips and stop ordering prevents a lot of downstream bugs",
      "External API integration is mostly about normalization and resilience, not just fetch calls",
      "Pricing logic should be explicit and testable instead of scattered across UI components",
      "Fallback content pipelines noticeably improve perceived product quality",
      "Docker support and reproducible setup docs make collaboration and deployment much smoother"
    ],
    references: [
      "WanderGuide README architecture and setup notes",
      "Supabase docs for relational schema and auth",
      "OpenRouteService + Geoapify API docs"
    ],
    tags: ["Next.js", "Supabase", "System Design", "Mapping APIs", "Full-stack"],
    featured: true,
    links: {
      github: "https://github.com/RajaShylesh112/WanderGuide",
      demo: "https://wander-guide-website.vercel.app/",
      docs: "https://github.com/RajaShylesh112/WanderGuide#readme"
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
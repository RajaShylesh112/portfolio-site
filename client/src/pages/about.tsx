import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Linkedin, Github, MapPin, Calendar, GraduationCap, User } from "lucide-react";
import Navigation from "@/components/navigation";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";

export default function About() {
  const timeline = [
    {
      year: "2025",
      title: "Advanced System Design",
      description: "Exploring distributed systems, microservices architecture, and cloud infrastructure"
    },
    {
      year: "2024",
      title: "Backend Development Specialization",
      description: "Deepening expertise in Node.js, Express, database optimization, and API design"
    },
    {
      year: "2023",
      title: "Computer Science Studies",
      description: "Pursuing CS degree with focus on software engineering and system architecture"
    },
    {
      year: "2022",
      title: "Programming Journey Begins",
      description: "Started with web development, discovered passion for backend systems and infrastructure"
    }
  ];

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
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <User className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white font-mono">
                About
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
              {">> CS Student | System Designer | Backend Developer"}
            </p>
          </motion.div>

          {/* Personal Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-black/50 border border-cyan-400/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 font-mono">Location</h3>
                <p className="text-gray-400 font-mono text-sm">Coimbatore, India</p>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border border-emerald-400/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 font-mono">Education</h3>
                <p className="text-gray-400 font-mono text-sm">Computer Science</p>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border border-amber-400/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 font-mono">Experience</h3>
                <p className="text-gray-400 font-mono text-sm">3+ Years Building</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">My Story</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="mb-6">
                I'm a passionate Computer Science student with a deep fascination for backend development 
                and system architecture. My journey into programming began with curiosity about how 
                applications work behind the scenes, and it has evolved into a dedicated pursuit of 
                creating robust, scalable backend solutions.
              </p>
              <p className="mb-6">
                Based in Coimbatore, India, I've been honing my skills in Node.js, Express, and 
                database technologies. I believe in writing clean, efficient code and am always 
                excited to learn new technologies that can solve real-world problems.
              </p>
              <p className="mb-6">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source 
                projects, and sharing knowledge with the developer community. I'm particularly 
                interested in API design, database optimization, and building systems that can 
                scale gracefully.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Values & Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Clean Code</h3>
                  <p className="text-muted-foreground">
                    I believe in writing code that is not just functional, but readable, 
                    maintainable, and elegant. Every line should have a purpose.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Continuous Learning</h3>
                  <p className="text-muted-foreground">
                    Technology evolves rapidly, and I embrace this change by continuously 
                    learning new tools, frameworks, and best practices.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Problem Solving</h3>
                  <p className="text-muted-foreground">
                    I love tackling complex problems and finding efficient solutions that 
                    make a real difference for users and businesses.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Collaboration</h3>
                  <p className="text-muted-foreground">
                    Great software is built by great teams. I value communication, 
                    feedback, and working together toward common goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center font-mono text-white">Development Timeline</h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-20 bg-cyan-400/30 mt-2"></div>
                    )}
                  </div>
                  <Card className="flex-1 bg-black/50 border border-cyan-400/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-mono text-sm text-cyan-400 bg-cyan-400/10 px-2 py-1 border border-cyan-400/30">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-white font-mono">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Resume */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-8 font-mono text-white">Connect & Collaborate</h2>
            <p className="text-lg text-gray-400 mb-12 font-mono max-w-2xl mx-auto">
              {">> Open to internship opportunities in backend development and system design"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 font-mono transition-all duration-300 hover:scale-105"
                onClick={() => {
                  // In a real app, this would trigger a download
                  console.log('Download resume');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-mono transition-all duration-300 hover:scale-105"
                onClick={() => window.open('mailto:raja@example.com', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 font-mono transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://linkedin.com/in/rajashylesh', '_blank')}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 font-mono transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://github.com/rajashylesh', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
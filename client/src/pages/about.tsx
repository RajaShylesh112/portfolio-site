import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Linkedin, Github, MapPin, Calendar, GraduationCap } from "lucide-react";
import Navigation from "@/components/navigation";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import FloatingElements from "@/components/floating-elements";
import AnimatedDots from "@/components/animated-dots";
import profileImage from "@assets/1000025260-removebg_1753213343295.png";

export default function About() {
  const timeline = [
    {
      year: "2024",
      title: "Backend Development Focus",
      description: "Deepening expertise in Node.js, Express, and database technologies"
    },
    {
      year: "2023",
      title: "Computer Science Studies",
      description: "Pursuing degree with focus on software engineering and backend systems"
    },
    {
      year: "2022",
      title: "Programming Journey Begins",
      description: "Started learning web development and discovered passion for backend"
    }
  ];

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
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              <img
                src={profileImage}
                alt="Raja Shylesh"
                className="w-full h-full object-cover rounded-full border-4 border-cyan-400/20 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Raja Shylesh
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Computer Science student and passionate backend developer from Coimbatore, India
            </p>
          </motion.div>

          {/* Personal Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">Coimbatore, India</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">Computer Science Student</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-muted-foreground">2+ Years Coding</p>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-cyan-400/30 mt-2"></div>
                    )}
                  </div>
                  <Card className="flex-1 bg-slate-800/50 border-cyan-400/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-mono text-cyan-400">{item.year}</span>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Resume */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Interested in working together or have questions? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400/50 hover:bg-cyan-400/10">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400/50 hover:bg-cyan-400/10">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400/50 hover:bg-cyan-400/10">
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
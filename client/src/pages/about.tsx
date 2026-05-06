import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Linkedin, Github, MapPin, Calendar, GraduationCap } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import profileImage from "@assets/image.png";

export default function About() {
  const timeline = [
    {
      year: "2025",
      title: "System Design & Scalability",
      description: "Learning about distributed systems, caching strategies, and database optimization through hands-on projects"
    },
    {
      year: "2024",
      title: "Backend Development Focus",
      description: "Built multiple Node.js applications, learned PostgreSQL, and experimented with different architectural patterns"
    },
    {
      year: "2023",
      title: "Computer Science Foundation",
      description: "Started CS degree, learned fundamental programming concepts, and discovered passion for server-side development"
    },
    {
      year: "2022",
      title: "First Steps in Programming",
      description: "Began with basic web technologies (HTML, CSS, JavaScript) and built first simple projects"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative">
      <Navigation />
      
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
                className="w-full h-full object-cover rounded-full border-4 border-cyan-500/20 dark:border-cyan-400/20 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 dark:from-cyan-400/20 dark:to-blue-500/20"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              About Raja Shylesh
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Computer Science student and aspiring backend developer from Coimbatore, India
            </p>
          </motion.div>

          {/* Personal Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Coimbatore, India</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Education</h3>
                <p className="text-gray-600 dark:text-gray-400">Computer Science Student</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Experience</h3>
                <p className="text-gray-600 dark:text-gray-400">2+ Years Learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">My Journey</h2>
            <div className="prose prose-lg text-gray-700 dark:text-gray-300 max-w-none">
              <p className="mb-6">
                My programming journey started in my first year of Computer Science, when I was curious 
                about how web applications actually work behind the scenes. What began as simple HTML 
                and CSS projects evolved into a deep interest in server-side development and system design.
              </p>
              <p className="mb-6">
                Currently pursuing my CS degree in Coimbatore, India, I spend most of my time learning 
                Node.js, working with databases, and building projects that solve real problems. Each 
                assignment and personal project teaches me something new about writing better code and 
                designing efficient systems.
              </p>
              <p className="mb-6">
                My goal is to become proficient in building scalable backend systems. I'm particularly 
                drawn to API design, database optimization, and understanding how large-scale systems 
                handle millions of users. I document my learning journey through blog posts and open-source contributions.
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
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Learning Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Learning by Building</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I learn best by building real projects. Each application teaches me 
                    something new about code structure, user needs, and system design.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Systems Thinking</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm fascinated by how individual components work together to create 
                    robust, scalable systems that can handle real-world complexity.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Open Documentation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I document my learning process publicly, sharing both successes and 
                    failures to help other students navigate similar challenges.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Practical Focus</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I prioritize learning technologies and patterns that solve real problems, 
                    focusing on practical skills over theoretical complexity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Learning Timeline</h2>
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
                    <div className="w-4 h-4 rounded-full bg-cyan-600 dark:bg-cyan-400"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-cyan-600/30 dark:bg-cyan-400/30 mt-2"></div>
                    )}
                  </div>
                  <Card className="flex-1 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-cyan-400/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400">{item.year}</span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
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
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Let's Connect</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Interested in discussing backend development or have questions about my projects? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                onClick={() => window.open('mailto:raja@example.com', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                onClick={() => window.open('https://www.linkedin.com/in/raja-shylesh-886421256', '_blank')}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500 dark:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10"
                onClick={() => window.open('https://github.com/RajaShylesh112', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
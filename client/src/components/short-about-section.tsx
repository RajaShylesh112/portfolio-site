import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import profileImage from "@assets/1000025260-removebg_1753213343295.png";

export default function ShortAboutSection() {
  return (
    <section id="short-about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-96 h-96 mx-auto"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-cyan-400/30 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Raja Shylesh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate Computer Science student with a deep fascination for backend development 
                  and system architecture. My journey into programming began with curiosity about how 
                  applications work behind the scenes.
                </p>
                <p>
                  Based in Coimbatore, India, I've been honing my skills in Node.js, Express, and 
                  database technologies. I believe in writing clean, efficient code and am always 
                  excited to learn new technologies.
                </p>
                <p>
                  When I'm not coding, I enjoy exploring new technologies and contributing to 
                  open-source projects, particularly interested in API design and database optimization.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <Card className="bg-slate-800/50 border-cyan-400/20">
                  <CardContent className="p-4 text-center">
                    <MapPin className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Location</p>
                    <p className="text-xs text-muted-foreground">Coimbatore, India</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-cyan-400/20">
                  <CardContent className="p-4 text-center">
                    <GraduationCap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Education</p>
                    <p className="text-xs text-muted-foreground">Computer Science</p>
                  </CardContent>
                </Card>
              </div>

              <Link href="/about">
                <Button size="lg" variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                  Learn More About Me
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
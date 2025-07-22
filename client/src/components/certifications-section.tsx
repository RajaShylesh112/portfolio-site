import { motion } from "framer-motion";
import { ExternalLink, Target, Clock } from "lucide-react";
import { SiFreecodecamp } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CertificationsSection() {
  const futureGoals = [
    "AWS Cloud Practitioner",
    "Node.js Backend Development", 
    "System Design Fundamentals",
    "Docker & Containerization"
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Certifications & <span className="text-primary dark:text-blue-400">Learning</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Continuous learning and professional development achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* freeCodeCamp Certification */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card dark:bg-slate-800 border-border">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <SiFreecodecamp className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Responsive Web Design</h3>
                      <p className="text-muted-foreground">freeCodeCamp</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400"
                    onClick={() => window.open("https://www.freecodecamp.org/certification/fcc81a82f0c-070c-4173-af09-2f50c9d05f2a/responsive-web-design", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </div>
                
                <p className="text-foreground mb-4">
                  Comprehensive certification covering HTML5, CSS3, responsive design principles, 
                  accessibility, and modern web development best practices.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400">
                    HTML5
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400">
                    CSS3
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400">
                    Responsive Design
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400">
                    Accessibility
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Future Learning Goals */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card dark:bg-slate-800 border-2 border-dashed border-muted-foreground/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                  <Target className="text-primary dark:text-blue-400 mr-3" />
                  Future Learning Goals
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {futureGoals.map((goal, index) => (
                    <motion.div
                      key={goal}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-muted-foreground"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground/60" />
                      <span>{goal}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

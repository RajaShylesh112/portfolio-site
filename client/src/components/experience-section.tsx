import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding section-reveal">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Experience & <span className="text-primary dark:neon-text">Activities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leadership roles and volunteer experiences that showcase my collaborative spirit
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card dark:bg-slate-800 border-border">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary dark:bg-blue-400 rounded-full flex items-center justify-center">
                    <Shield className="text-2xl text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-2xl font-semibold text-foreground">The Eye Club</h3>
                    <span className="text-muted-foreground text-sm">April 2025 - Present</span>
                  </div>
                  
                  <p className="text-primary dark:text-blue-400 font-medium mb-3">Volunteer</p>
                  
                  <div className="space-y-3 text-foreground mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-emerald-500 mt-1 text-sm flex-shrink-0" />
                      <p>Plan and coordinate cybersecurity workshops and Capture The Flag (CTF) competitions</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-emerald-500 mt-1 text-sm flex-shrink-0" />
                      <p>Oversee event planning and technical setup for cybersecurity educational programs</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-emerald-500 mt-1 text-sm flex-shrink-0" />
                      <p>Collaborate with team members to create engaging learning experiences for students</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400">
                      Cybersecurity
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400">
                      Event Planning
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400">
                      Team Leadership
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400">
                      CTF
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

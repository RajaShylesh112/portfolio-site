import { motion } from "framer-motion";
import { GraduationCap, MapPin, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-muted/50 dark:bg-slate-900/50 backdrop-blur-sm section-reveal">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            About <span className="text-primary dark:neon-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating efficient backend solutions and building scalable applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              Adaptable and driven professional with a strong interest in backend development. 
              Focused on building scalable, reliable solutions and eager to grow in high-impact, technically challenging environments.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-primary dark:text-blue-400 text-xl" />
                <div>
                  <h4 className="font-semibold text-foreground">PSG College of Technology</h4>
                  <p className="text-muted-foreground">Bachelor of Computer Science and Engineering (Aug 2023 – Present)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary dark:text-blue-400 text-xl" />
                <div>
                  <h4 className="font-semibold text-foreground">Coimbatore, Tamil Nadu, India</h4>
                  <p className="text-muted-foreground">Available for remote and on-site opportunities</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Languages className="text-primary dark:text-blue-400 text-xl" />
                <div>
                  <h4 className="font-semibold text-foreground">Languages</h4>
                  <p className="text-muted-foreground">Fluent in Tamil and English</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card dark:bg-slate-800 border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-blue-400">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Experience Level</span>
                    <span className="font-semibold text-foreground">Student/Entry Level</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Focus Areas</span>
                    <span className="font-semibold text-foreground">Backend & Systems</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-semibold text-emerald-500">Open to opportunities</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Preferred Role</span>
                    <span className="font-semibold text-foreground">Backend Developer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

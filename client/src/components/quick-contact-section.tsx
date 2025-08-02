import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function QuickContactSection() {
  return (
    <section id="quick-contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss your next project or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">
                  Drop me a line and I'll get back to you within 24 hours
                </p>
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => window.open('mailto:raja@example.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Linkedin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with me for professional networking and opportunities
                </p>
                <Button 
                  variant="outline" 
                  className="border-cyan-400/50 hover:bg-cyan-400/10"
                  onClick={() => window.open('https://linkedin.com/in/rajashylesh', '_blank')}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center items-center space-x-6">
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-cyan-400"
              onClick={() => window.open('https://github.com/rajashylesh', '_blank')}
            >
              <Github className="w-6 h-6 mr-2" />
              GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
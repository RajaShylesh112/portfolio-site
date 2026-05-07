import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Github, ArrowRight, Mail, Check } from "lucide-react";
import { Link } from "wouter";
import resumePDF from "@assets/Resume.pdf";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CallToActionSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("rajashylesh@gmail.com");
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: "rajashylesh@gmail.com has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
    
    // Still try to open mailto
    window.location.href = "mailto:rajashylesh@gmail.com";
  };

  return (
    <section id="call-to-action" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-400/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5"></div>
            <CardContent className="p-12 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Interested in My Work?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Check out my projects and see what I've been learning. I'm always open to discussing 
                  backend development, databases, and system design.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg"
                    onClick={() => window.open('https://github.com/RajaShylesh112?tab=repositories', '_blank')}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Projects
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg"
                    onClick={copyEmail}
                  >
                    {copied ? <Check className="w-5 h-5 mr-2" /> : <Mail className="w-5 h-5 mr-2" />}
                    {copied ? "Copied!" : "Send Email"}
                  </Button>

                  <a href={resumePDF} download="Raja_Shylesh_Resume.pdf">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  </a>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t border-cyan-400/20"
                >
                  <p className="text-muted-foreground mb-4">
                    Want to learn more about my background and experience?
                  </p>
                  <Link href="/about">
                    <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                      View Full Bio
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
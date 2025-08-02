import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CallToActionSection() {
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
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Let's collaborate to build something amazing together. Whether you need a robust backend API, 
                  a full-stack application, or technical consultation, I'm here to help.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg"
                    onClick={() => window.open('mailto:raja@example.com?subject=Project Inquiry', '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start a Conversation
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg"
                    onClick={() => {
                      // In a real app, this would trigger a download
                      console.log('Download resume');
                    }}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
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
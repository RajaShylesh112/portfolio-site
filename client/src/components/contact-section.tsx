import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:rajashylesh@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    
    // Copy to clipboard as fallback
    navigator.clipboard.writeText("rajashylesh@gmail.com");
    toast({
      title: "Message Prepared!",
      description: "Email copied to clipboard. Your mail app should open now.",
    });

    // Using a hidden anchor tag and clicking it is the most reliable way 
    // to trigger mailto without opening a blank tab in most browsers.
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.click();
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      value: "rajashylesh@gmail.com",
      href: "mailto:rajashylesh@gmail.com",
      bgColor: "bg-primary dark:bg-blue-400"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: "LinkedIn",
      value: "raja-shylesh",
      href: "https://linkedin.com/in/raja-shylesh",
      bgColor: "bg-blue-600"
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "GitHub",
      value: "RajaShylesh112",
      href: "https://github.com/RajaShylesh112",
      bgColor: "bg-gray-700"
    }
  ];

  return (
    <section id="contact" className="section-padding section-reveal">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Let's <span className="text-primary dark:neon-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate on exciting projects or discuss backend development opportunities
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card dark:bg-slate-800 border-border">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.title}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="group block p-6 rounded-xl hover:bg-muted dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 text-white`}>
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{method.title}</h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                        {method.value}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card dark:bg-slate-800 border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-muted dark:bg-slate-700 border-border focus:ring-primary dark:focus:ring-blue-400 focus:border-primary dark:focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-muted dark:bg-slate-700 border-border focus:ring-primary dark:focus:ring-blue-400 focus:border-primary dark:focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Project Discussion"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-muted dark:bg-slate-700 border-border focus:ring-primary dark:focus:ring-blue-400 focus:border-primary dark:focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Let's discuss your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-muted dark:bg-slate-700 border-border focus:ring-primary dark:focus:ring-blue-400 focus:border-primary dark:focus:border-blue-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-blue-400 dark:hover:bg-blue-500"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-primary dark:text-blue-400 mb-2">Raja Shylesh</h3>
              <p className="text-muted-foreground">Full Stack Developer</p>
              <p className="text-muted-foreground/80 text-sm mt-1 flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-1" />
                Coimbatore, Tamil Nadu, India
              </p>
            </div>
            
            <div className="flex space-x-6">
              <motion.a
                href="https://github.com/RajaShylesh112"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/raja-shylesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:rajashylesh@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground/80 text-sm">
              © 2025 Raja Shylesh. All rights reserved. Built with React & Tailwind CSS.
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Mail, MessageSquare, Github, Linkedin, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters").max(500, "Message cannot exceed 500 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Footer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      toast({
        title: "Feedback received!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-2 mr-2">
                <span className="text-white font-bold text-xl">BN</span>
              </div>
              <div className="text-xl font-bold">
                <span className="text-blue-600 dark:text-blue-400">BUSINESS</span>
                <span className="text-blue-400 dark:text-blue-300">NEWS</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Delivering the latest business news, analysis, and insights to help you stay ahead in today's fast-paced market.
            </p>

            <div className="flex space-x-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Youtube size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Business
                </Link>
              </li>
              <li>
                <Link to="/category/finance" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/property" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Property
                </Link>
              </li>
              <li>
                <Link to="/data-insights" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  <ArrowRight size={14} className="mr-1" />
                  Data Insights
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">contact@businessnews.com</span>
              </li>
              <li className="flex items-start">
                <MessageSquare size={18} className="mr-2 mt-1 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="text-gray-600 dark:text-gray-400 mt-4">
                123 Business Avenue<br />
                Financial District<br />
                New York, NY 10001
              </li>
            </ul>
          </div>
          
          {/* Feedback Form */}
          <div>
            <h3 className="font-bold text-lg mb-4">Send Us Feedback</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} className="text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your feedback" {...field} className="resize-none text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Business News. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-blue-500 dark:hover:text-blue-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-500 dark:hover:text-blue-400">Terms of Service</Link>
            <Link to="/faq" className="hover:text-blue-500 dark:hover:text-blue-400">FAQ</Link>
            <Link to="/advertise" className="hover:text-blue-500 dark:hover:text-blue-400">Advertise</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

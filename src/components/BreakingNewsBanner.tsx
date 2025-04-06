
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BreakingNews {
  id: string;
  title: string;
}

const BreakingNewsBanner = () => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mock breaking news data
  const breakingNews: BreakingNews[] = [
    { id: "breaking-1", title: "Major tech company announces layoffs affecting thousands" },
    { id: "breaking-2", title: "Government unveils new economic stimulus package" },
    { id: "breaking-3", title: "Unexpected weather system approaching the coast" }
  ];
  
  // Rotate through breaking news every 5 seconds
  useEffect(() => {
    if (!visible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [visible, breakingNews.length]);
  
  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
  };
  
  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length);
  };
  
  if (!visible) return null;
  
  return (
    <div className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 relative animate-fade-in z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold mr-3 text-sm sm:text-base">BREAKING:</span>
          <div className="flex-1 overflow-hidden">
            <Link to={`/news/${breakingNews[currentIndex].id}`} className="hover:underline text-sm sm:text-base">
              {breakingNews[currentIndex].title}
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white hover:bg-red-700 dark:hover:bg-red-800" 
            onClick={prevNews}
          >
            <ArrowLeft size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white hover:bg-red-700 dark:hover:bg-red-800" 
            onClick={nextNews}
          >
            <ArrowRight size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white hover:bg-red-700 dark:hover:bg-red-800" 
            onClick={() => setVisible(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;

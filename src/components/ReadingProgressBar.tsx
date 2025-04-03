
import React, { useState, useEffect } from "react";

const ReadingProgressBar = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  const calculateReadingProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollHeight <= clientHeight) {
      return 100; // If there's nothing to scroll, we've "read" 100%
    }
    
    const scrollDistance = scrollHeight - clientHeight;
    const progress = (scrollTop / scrollDistance) * 100;
    
    return Math.min(100, Math.max(0, progress));
  };

  useEffect(() => {
    const updateReadingProgress = () => {
      setReadingProgress(calculateReadingProgress());
    };
    
    window.addEventListener("scroll", updateReadingProgress);
    
    // Calculate initial progress
    updateReadingProgress();
    
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200 dark:bg-gray-800">
      <div 
        className="h-full bg-blue-600 transition-all duration-100 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;

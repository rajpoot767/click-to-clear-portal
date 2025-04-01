
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  // Check if we're in browser environment to avoid SSR issues
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );
  
  // Set mounted state once component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Don't render anything until component is mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-600 hover:text-gray-900 transition-colors" />
      ) : (
        <Sun size={20} className="text-yellow-300 hover:text-yellow-500 transition-colors" />
      )}
    </Button>
  );
};

export default ThemeToggle;

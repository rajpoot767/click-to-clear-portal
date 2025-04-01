
import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" />
      ) : (
        <Sun size={20} className="text-yellow-300 hover:text-yellow-500 transition-colors" />
      )}
    </Button>
  );
};

export default ThemeToggle;

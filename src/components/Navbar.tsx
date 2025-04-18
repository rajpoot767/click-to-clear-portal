
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SearchModal from "./SearchModal";
import AuthModal from "./AuthModal";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Categories for dropdown
  const categories = [
    "Business",
    "Finance",
    "Technology", 
    "Property",
    "Mining",
    "Energy",
    "Agriculture",
    "Tourism",
    "Health",
    "Education",
    "Politics",
    "Sports",
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900">
      {/* Top navigation bar */}
      <div className="bg-navy-900 dark:bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/" className="text-sm hover:underline">Publications</Link>
            <Link to="/" className="text-sm hover:underline">Events</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-sm bg-blue-500 text-white hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md transition-colors">Subscribe</Link>
            <div className="flex items-center gap-2">
              <AuthModal 
                trigger={
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                  >
                    <User size={16} className="mr-1" />
                    <span className="text-sm">Login</span>
                  </Button>
                } 
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo and search bar */}
      <div className="bg-white dark:bg-gray-800 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-500 p-2 mr-2">
                <span className="text-white font-bold text-xl">BN</span>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-blue-600 dark:text-blue-400">BUSINESS</span>
                <span className="text-blue-400 dark:text-blue-300">NEWS</span>
              </div>
            </Link>
          </div>
          
          <div className="relative w-80">
            <SearchModal
              trigger={
                <div className="flex items-center border dark:border-gray-600 rounded-md cursor-pointer">
                  <span className="absolute right-3">
                    <Search size={20} className="text-gray-400" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="News, people, companies, projects..." 
                    className="w-full px-4 py-2 pr-10 text-sm border-none dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 cursor-pointer rounded-md"
                    onClick={(e) => e.preventDefault()}
                    readOnly
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
      
      {/* Category navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <Link to="/" className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white border-b-2 border-blue-500">Latest News</Link>
            <Link to="/category/resources" className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Resources</Link>
            <Link to="/category/property" className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Property</Link>
            <Link to="/category/commercial" className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Commercial Content</Link>
            
            {/* All Categories dropdown */}
            <div className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                  All Categories
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-gray-800">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category}>
                      <Link to={`/category/${category.toLowerCase()}`} className="w-full">
                        {category}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Link to="/category/data-insights" className="px-4 py-3 whitespace-nowrap text-white bg-blue-500 hover:bg-blue-600 ml-auto">Data & Insights</Link>
          </div>
        </div>
      </div>
      
      {/* Page content spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-[175px]"></div>
    </div>
  );
};

export default Navbar;

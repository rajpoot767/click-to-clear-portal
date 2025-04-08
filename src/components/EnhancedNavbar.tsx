
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, User, Bell, LayoutDashboard, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchModal from "./SearchModal";
import AuthModal from "./AuthModal";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "./NavLinks";

const EnhancedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New finance report available", read: false },
    { id: 2, text: "Breaking news: Market update", read: false },
    { id: 3, text: "Your saved article was updated", read: false },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state for now
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''} bg-white dark:bg-gray-900`}>
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
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white hover:text-white transition-colors animate-pulse"
                  asChild
                >
                  <Link to="/dashboard">
                    <LayoutDashboard size={16} className="mr-1" />
                    <span className="text-sm">Dashboard</span>
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell size={18} className="text-white" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 animate-pulse">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800">
                  <div className="p-2 font-medium border-b flex justify-between items-center">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} onClick={() => markAsRead(notification.id)}>
                        <div className={`p-2 w-full ${!notification.read ? 'font-medium' : 'opacity-70'}`}>
                          {notification.text}
                          {!notification.read && (
                            <span className="inline-block ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No new notifications</div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 mr-2 rounded-md transform hover:rotate-3 transition-transform">
                <span className="text-white font-bold text-xl">BN</span>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-blue-600 dark:text-blue-400">BUSINESS</span>
                <span className="text-blue-400 dark:text-blue-300">NEWS</span>
              </div>
            </Link>
          </div>
          
          <div className="relative w-80 hidden md:block">
            <SearchModal
              trigger={
                <div className="flex items-center border dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-400 transition-all">
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
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Category navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className={`${mobileMenuOpen ? 'flex flex-col' : 'hidden md:flex'} overflow-x-auto scrollbar-hide`}>
            <NavLinks />
            
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
            
            <Link to="/data-insights" className="px-4 py-3 whitespace-nowrap text-white bg-blue-500 hover:bg-blue-600 ml-auto">Data & Insights</Link>
          </div>
        </div>
      </div>
      
      {/* Mobile search (shown when mobile menu is open) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          <SearchModal
            trigger={
              <div className="flex items-center border dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-400 transition-all">
                <span className="absolute right-3">
                  <Search size={20} className="text-gray-400" />
                </span>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-2 pr-10 text-sm border-none dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 cursor-pointer rounded-md"
                  onClick={(e) => e.preventDefault()}
                  readOnly
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedNavbar;

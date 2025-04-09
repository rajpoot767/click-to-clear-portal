
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Briefcase, 
  Globe, 
  LineChart, 
  BarChart3, 
  PieChart,
  Sparkles
} from "lucide-react";

const NavLinks = () => {
  const location = useLocation();
  
  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Business", path: "/category/business", icon: Briefcase, isNew: true },
    { name: "Technology", path: "/category/technology", icon: Globe },
    { name: "Finance", path: "/category/finance", icon: LineChart },
    { name: "Markets", path: "/category/markets", icon: BarChart3 },
    { name: "Data Insights", path: "/data-insights", icon: PieChart },
    { name: "For You", path: "/for-you", icon: Sparkles, isNew: true, isPrimary: true },
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-hide pb-1 gap-1 sm:gap-2 no-scrollbar">
      {links.map((link) => {
        const isActive = location.pathname === link.path || 
                        (link.path !== '/' && location.pathname.startsWith(link.path));
        
        const isPrimary = link.isPrimary;
        
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative flex items-center gap-1.5 whitespace-nowrap
                      ${isActive 
                        ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                        : isPrimary
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            {link.icon && <link.icon size={16} />}
            <span>{link.name}</span>
            
            {link.isNew && (
              <Badge className="ml-1 bg-blue-500 text-xs py-0 px-1.5 h-4">New</Badge>
            )}
            
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;

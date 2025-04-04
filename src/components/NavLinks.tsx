
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Briefcase, 
  Globe, 
  LineChart, 
  BarChart3, 
  LayoutDashboard,
  PieChart
} from "lucide-react";

const NavLinks = () => {
  const location = useLocation();
  
  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Business", path: "/category/business", icon: Briefcase, isNew: true },
    { name: "Technology", path: "/category/technology", icon: Globe },
    { name: "Finance", path: "/category/finance", icon: LineChart },
    { name: "Markets", path: "/category/markets", icon: BarChart3 },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Data Insights", path: "/data-insights", icon: PieChart },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
      {links.map((link) => {
        const isActive = location.pathname === link.path || 
                        (link.path !== '/' && location.pathname.startsWith(link.path));
        
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative flex items-center gap-1.5
                      ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'}
                      ${link.name === 'Dashboard' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800' : ''}`}
          >
            {link.icon && <link.icon size={16} />}
            <span>{link.name}</span>
            
            {link.isNew && (
              <Badge className="ml-1 bg-blue-500 text-xs py-0 px-1.5 h-4">New</Badge>
            )}
            
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
            )}

            {/* Hover effect */}
            <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-md opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;

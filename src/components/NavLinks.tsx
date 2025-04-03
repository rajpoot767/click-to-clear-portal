
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();
  
  const links = [
    { name: "Home", path: "/" },
    { name: "Business", path: "/category/business" },
    { name: "Technology", path: "/category/technology" },
    { name: "Finance", path: "/category/finance" },
    { name: "Markets", path: "/category/markets" },
    { name: "Data Insights", path: "/data-insights" },
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
            className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative
                      ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {link.name}
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

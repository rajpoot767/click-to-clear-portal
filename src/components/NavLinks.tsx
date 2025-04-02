
import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
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
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

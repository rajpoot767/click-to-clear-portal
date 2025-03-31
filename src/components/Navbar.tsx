
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Top navigation bar */}
      <div className="bg-navy-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/" className="text-sm hover:underline">Publications</Link>
            <Link to="/" className="text-sm hover:underline">Events</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-sm hover:underline">Subscribe</Link>
            <Link to="/" className="text-sm hover:underline">MyBN</Link>
            <Link to="/" className="text-sm hover:underline flex items-center gap-1">
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Logo and search bar */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-500 p-2 mr-2">
                <span className="text-white font-bold text-xl">BN</span>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-blue-600">BUSINESS</span>
                <span className="text-blue-400">NEWS</span>
              </div>
            </Link>
          </div>
          
          <div className="relative w-80">
            <div className="flex items-center border rounded-md">
              <span className="absolute right-3">
                <Search size={20} className="text-gray-400" />
              </span>
              <input 
                type="text" 
                placeholder="News, people, companies, projects..." 
                className="w-full px-4 py-2 pr-10 text-sm border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <Link to="/" className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 border-b-2 border-blue-500">Latest News</Link>
            <Link to="/" className="px-4 py-3 whitespace-nowrap text-gray-600 hover:text-gray-900">Resources</Link>
            <Link to="/" className="px-4 py-3 whitespace-nowrap text-gray-600 hover:text-gray-900">Property</Link>
            <Link to="/" className="px-4 py-3 whitespace-nowrap text-gray-600 hover:text-gray-900">Commercial Content</Link>
            <Link to="/" className="px-4 py-3 whitespace-nowrap text-gray-600 hover:text-gray-900">All Categories</Link>
            <Link to="/" className="px-4 py-3 whitespace-nowrap text-white bg-blue-500 hover:bg-blue-600 ml-auto">Data & Insights</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

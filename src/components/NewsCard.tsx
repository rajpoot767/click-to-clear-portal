
import React from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
  url: string;
  hoursAgo?: number;
}

const NewsCard = ({ title, description, imageUrl, category, date, url, hoursAgo }: NewsCardProps) => {
  return (
    <div className="flex flex-col h-full border border-gray-200 rounded overflow-hidden">
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">
            {category}
          </span>
        </div>
        <Link to={url} className="block aspect-[16/10] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-bold mb-2 text-gray-900 line-clamp-2">
          <Link to={url} className="hover:text-blue-600">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-1">
          {description}
        </p>
        {hoursAgo && (
          <div className="text-xs text-gray-500 flex items-center mt-auto">
            {hoursAgo} HOURS AGO
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;

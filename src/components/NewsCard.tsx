
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  url: string;
}

const NewsCard = ({ title, description, imageUrl, category, date, url }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-blue-600 uppercase">{category}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <CardTitle className="text-lg font-bold line-clamp-2 mb-2">
          <Link to={url} className="hover:text-blue-600 transition-colors">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default NewsCard;

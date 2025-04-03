
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EnhancedNewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
  url: string;
  hoursAgo?: number;
}

const EnhancedNewsCard = ({ 
  title, 
  description, 
  imageUrl, 
  category, 
  date, 
  url, 
  hoursAgo 
}: EnhancedNewsCardProps) => {
  const { toast } = useToast();
  const id = url.split('/').pop() || "default";
  
  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: `Subscribed to ${category}`,
      description: `You'll receive updates for ${category} news`,
      duration: 3000,
    });
  };

  return (
    <Link to={`/news/${id}`} className="block h-full">
      <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 group">
        <div className="relative">
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">
              {category}
            </span>
          </div>
          <div className="block aspect-[16/10] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 flex-1">
            {description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            {hoursAgo && (
              <div className="text-xs text-gray-500 flex items-center">
                {hoursAgo} HOURS AGO
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={handleSubscribe}
            >
              <Heart size={16} className="mr-1" />
              <span className="text-xs">Follow</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnhancedNewsCard;

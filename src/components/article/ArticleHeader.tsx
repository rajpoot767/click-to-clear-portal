
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, Bookmark, Share2 } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ArticleHeaderProps {
  article: any;
  category: string;
  isPlaying?: boolean;
  isBookmarked?: (id: string) => boolean;
  handleBookmark?: () => void;
  handleShare?: () => void;
  toggleAudioPlayback?: () => void;
}

const ArticleHeader = ({ 
  article, 
  category,
  isPlaying,
  isBookmarked,
  handleBookmark,
  handleShare,
  toggleAudioPlayback
}: ArticleHeaderProps) => {
  return (
    <div>
      <Link 
        to={`/category/${category.toLowerCase()}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to {category}
      </Link>
      
      <div className="mb-2">
        <span className="text-blue-600 text-sm font-bold uppercase">
          {category}
        </span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date || `${article.hoursAgo} hours ago`}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {toggleAudioPlayback && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant={isPlaying ? "default" : "outline"}
                    onClick={toggleAudioPlayback}
                    className="w-9 h-9 rounded-full"
                  >
                    <Volume2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Stop" : "Listen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {handleShare && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShare}
                    className="w-9 h-9 rounded-full"
                  >
                    <Share2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {handleBookmark ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={isBookmarked && isBookmarked(article.id) ? "default" : "outline"}
                    size="icon" 
                    onClick={handleBookmark}
                    className="w-9 h-9 rounded-full"
                  >
                    <Bookmark size={18} className={isBookmarked && isBookmarked(article.id) ? "fill-current" : ""} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBookmarked && isBookmarked(article.id) ? "Bookmarked" : "Bookmark"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <BookmarkButton articleId={article.id} title={article.title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;

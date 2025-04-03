
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import { Button } from "@/components/ui/button";

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
            <Button 
              size="sm" 
              variant={isPlaying ? "default" : "outline"}
              onClick={toggleAudioPlayback}
              className="flex items-center gap-1"
            >
              <Volume2 size={16} />
              <span>{isPlaying ? "Stop" : "Listen"}</span>
            </Button>
          )}
          
          {handleShare && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
            >
              Share
            </Button>
          )}
          
          {handleBookmark ? (
            <Button 
              variant={isBookmarked && isBookmarked(article.id) ? "default" : "outline"}
              size="sm" 
              onClick={handleBookmark}
            >
              {isBookmarked && isBookmarked(article.id) ? "Bookmarked" : "Bookmark"}
            </Button>
          ) : (
            <BookmarkButton articleId={article.id} title={article.title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;


import React from "react";
import { Bookmark, Share2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategorySubscribeButton from "@/components/CategorySubscribeButton";

interface ArticleHeaderProps {
  article: any;
  isPlaying: boolean;
  isBookmarked: (id: string) => boolean;
  handleBookmark: () => void;
  handleShare: () => void;
  toggleAudioPlayback: () => void;
}

const ArticleHeader = ({
  article,
  isPlaying,
  isBookmarked,
  handleBookmark,
  handleShare,
  toggleAudioPlayback,
}: ArticleHeaderProps) => {
  return (
    <>
      <div className="relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase rounded">
            {article.category}
          </span>
          <CategorySubscribeButton category={article.category} className="bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBookmark}
              className={isBookmarked(article.id) ? "text-blue-600" : ""}
            >
              <Bookmark size={18} className={isBookmarked(article.id) ? "fill-blue-600" : ""} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 size={18} />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleAudioPlayback}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </div>
        </div>
        
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          <span>By {article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;

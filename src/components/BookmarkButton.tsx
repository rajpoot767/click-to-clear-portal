
import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/contexts/BookmarkContext";

interface BookmarkButtonProps {
  articleId: string;
  title: string;
  imageUrl?: string;
  category?: string;
}

const BookmarkButton = ({ articleId, title, imageUrl, category }: BookmarkButtonProps) => {
  const { addBookmark, removeBookmark, isBookmarked, addToReadLater, isInReadLater } = useBookmarks();
  const { toast } = useToast();
  
  const handleBookmark = () => {
    if (isBookmarked(articleId)) {
      removeBookmark(articleId);
      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks"
      });
    } else {
      addBookmark({
        id: articleId,
        title,
        imageUrl,
        category
      });
      toast({
        title: "Article bookmarked",
        description: "You can find this article in your bookmarks"
      });
    }
  };

  const handleReadLater = () => {
    if (!isInReadLater(articleId)) {
      addToReadLater({
        id: articleId,
        title
      });
      toast({
        title: "Added to Read Later",
        description: "Article added to your read later list"
      });
    } else {
      toast({
        title: "Already in Read Later",
        description: "This article is already in your read later list"
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleBookmark}
        className={isBookmarked(articleId) ? "text-blue-600" : "text-gray-500"}
      >
        <Bookmark size={18} className={isBookmarked(articleId) ? "fill-blue-600" : ""} />
        <span className="ml-1">{isBookmarked(articleId) ? "Bookmarked" : "Bookmark"}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReadLater}
        className="text-gray-500"
      >
        <Clock size={18} />
        <span className="ml-1">Read Later</span>
      </Button>
    </div>
  );
};

export default BookmarkButton;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  articleId: string;
  title?: string;
}

const BookmarkButton = ({ articleId, title }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  
  const toggleBookmark = () => {
    // Toggle bookmark state
    setIsBookmarked(!isBookmarked);
    
    // Get existing bookmarks from localStorage
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (!isBookmarked) {
      // Add to bookmarks
      const newBookmarks = [...existingBookmarks, { id: articleId, title }];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      
      toast({
        title: "Article bookmarked",
        description: "You can find this article in your bookmarks"
      });
    } else {
      // Remove from bookmarks
      const filteredBookmarks = existingBookmarks.filter(
        (bookmark: { id: string }) => bookmark.id !== articleId
      );
      localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
      
      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks"
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleBookmark}
      className={isBookmarked ? "text-blue-600" : "text-gray-500"}
    >
      <Bookmark size={18} className={isBookmarked ? "fill-blue-600" : ""} />
      <span className="ml-1">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
    </Button>
  );
};

export default BookmarkButton;

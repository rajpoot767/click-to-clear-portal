
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/contexts/BookmarkContext";
import BookmarkButton from "@/components/BookmarkButton";

interface ArticleActionsProps {
  article: any;
  isInReadLater: (id: string) => boolean;
  addToReadLater: (article: { id: string; title: string }) => void;
}

const ArticleActions = ({ article, isInReadLater, addToReadLater }: ArticleActionsProps) => {
  const { toast } = useToast();

  const handleSaveForLater = () => {
    if (!article) return;
    
    if (!isInReadLater(article.id)) {
      addToReadLater({
        id: article.id,
        title: article.title
      });
      toast({
        title: "Saved for later",
        description: "You can find this article in your read later list"
      });
    } else {
      toast({
        title: "Already saved",
        description: "This article is already in your read later list"
      });
    }
  };

  return (
    <div className="mb-6 mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSaveForLater}
        className={isInReadLater(article.id) ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
      >
        {isInReadLater(article.id) ? "Saved for Later" : "Save for Later"}
      </Button>
    </div>
  );
};

export default ArticleActions;

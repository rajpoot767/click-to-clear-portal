
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/contexts/BookmarkContext";
import SocialShareButtons from "@/components/SocialShareButtons";

interface ArticleActionsProps {
  article: any;
}

const ArticleActions = ({ article }: ArticleActionsProps) => {
  const { toast } = useToast();
  
  return (
    <div className="mb-6 mt-6">
      <SocialShareButtons 
        url={window.location.href} 
        title={article.title} 
      />
    </div>
  );
};

export default ArticleActions;

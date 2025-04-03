
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";

interface ArticleHeaderProps {
  article: any;
  category: string;
}

const ArticleHeader = ({ article, category }: ArticleHeaderProps) => {
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
          <BookmarkButton articleId={article.id} title={article.title} />
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;

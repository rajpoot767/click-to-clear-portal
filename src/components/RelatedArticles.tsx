
import React from "react";
import { Link } from "react-router-dom";
import { mockArticles } from "@/data/mockData";

interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
  max?: number;
}

const RelatedArticles = ({ currentArticleId, category, max = 3 }: RelatedArticlesProps) => {
  // Filter articles by same category and exclude current article
  const relatedArticles = mockArticles
    .filter(article => article.category === category && article.id !== currentArticleId)
    .slice(0, max);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-6">
      <h3 className="text-xl font-bold mb-4">Related Articles</h3>
      <div className="space-y-4">
        {relatedArticles.map((article, index) => (
          <div key={index} className="flex items-start">
            {article.imageUrl && (
              <Link to={`/article/${article.id}`} className="shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-20 h-16 object-cover rounded mr-3" 
                />
              </Link>
            )}
            <div>
              <Link to={`/article/${article.id}`} className="font-medium hover:text-blue-600">
                {article.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1">
                {article.date || `${article.hoursAgo} hours ago`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;

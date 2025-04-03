
import React from "react";
import { Link } from "react-router-dom";

interface RelatedArticle {
  id: string;
  title: string;
  imageUrl: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 p-6 pt-0">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((related, index) => (
          <Link to={`/news/${related.id}`} key={index}>
            <div className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img 
                  src={related.imageUrl} 
                  alt={related.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {related.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;

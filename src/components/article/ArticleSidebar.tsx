
import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";
import { mockArticles } from "@/data/mockData";

interface TrendingArticle {
  id: string;
  title: string;
  views?: number;
}

interface ArticleSidebarProps {
  trendingArticles?: TrendingArticle[];
}

const ArticleSidebar = ({ trendingArticles }: ArticleSidebarProps) => {
  // If trendingArticles aren't provided, get the top 5 from mockData
  const articles = trendingArticles || mockArticles
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
  
  return (
    <div className="lg:w-72 space-y-8">
      <NewsletterForm />
      
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-3">Trending Stories</h3>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <Link to={`/article/${article.id}`} className="text-sm font-medium group-hover:text-blue-600">
                {article.title}
              </Link>
              <div className="text-xs text-gray-500 mt-1">
                {article.views?.toLocaleString()} views
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSidebar;

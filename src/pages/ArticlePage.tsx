
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockArticles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import RelatedArticles from "@/components/RelatedArticles";
import CommentSection from "@/components/CommentSection";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleSidebar from "@/components/article/ArticleSidebar";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(
    mockArticles.find(article => article.id === id)
  );
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update article when ID changes
    const foundArticle = mockArticles.find(article => article.id === id);
    setArticle(foundArticle);
  }, [id]);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 pt-[220px] md:pt-[185px] text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  // Get trending articles
  const trendingArticles = mockArticles
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 pt-[220px] md:pt-[185px]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <ArticleHeader 
            article={article}
            category={article.category}
          />
          
          <ArticleContent
            article={article}
            imageUrl={article.imageUrl}
          />
          
          {/* Related Articles */}
          <RelatedArticles 
            currentArticleId={article.id} 
            category={article.category} 
          />
          
          {/* Comment Section */}
          <CommentSection articleId={article.id} />
        </div>
        
        {/* Sidebar */}
        <ArticleSidebar trendingArticles={trendingArticles} />
      </div>
    </div>
  );
};

export default ArticlePage;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockArticles } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedArticles from "@/components/RelatedArticles";
import CommentSection from "@/components/CommentSection";
import NewsletterForm from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(
    mockArticles.find(article => article.id === id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update article when ID changes
    const foundArticle = mockArticles.find(article => article.id === id);
    setArticle(foundArticle);
  }, [id]);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to={`/category/${article.category.toLowerCase()}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to {article.category}
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-blue-600 text-sm font-bold uppercase">
              {article.category}
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
          
          {/* Social share buttons */}
          <SocialShareButtons 
            url={window.location.href} 
            title={article.title} 
          />
          
          {/* Featured image */}
          <div className="mb-6">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto rounded-lg" 
            />
          </div>
          
          {/* Article content */}
          <div className="prose max-w-none mb-8">
            <p className="text-xl font-medium mb-6">{article.description}</p>
            
            {article.content ? (
              <div className="space-y-4">
                <p>{article.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, libero ut tempor varius, neque sapien congue dui, non semper diam enim eu sem. Maecenas aliquam, velit et bibendum laoreet, lorem nisl dictum tellus, at tempus nisi sem vel tortor. Donec vitae risus a ante ultrices finibus. Sed efficitur magna vitae libero congue, vel commodo urna ullamcorper.
                </p>
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec venenatis erat vel ex tincidunt, at convallis justo elementum. Suspendisse potenti. Duis mattis ligula vel urna rutrum, eget tempus mi feugiat. Integer finibus justo nec diam consequat, vel lacinia eros dictum.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, libero ut tempor varius, neque sapien congue dui, non semper diam enim eu sem. Maecenas aliquam, velit et bibendum laoreet, lorem nisl dictum tellus, at tempus nisi sem vel tortor. Donec vitae risus a ante ultrices finibus. Sed efficitur magna vitae libero congue, vel commodo urna ullamcorper.
                </p>
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec venenatis erat vel ex tincidunt, at convallis justo elementum. Suspendisse potenti. Duis mattis ligula vel urna rutrum, eget tempus mi feugiat. Integer finibus justo nec diam consequat, vel lacinia eros dictum.
                </p>
                <p>
                  Proin fringilla massa in urna vestibulum, at rutrum nulla interdum. Quisque suscipit, ligula id volutpat vehicula, nisi orci convallis justo, ut consequat turpis erat id magna. Integer consequat dignissim ex, id tempus magna sodales sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/tag/${tag.replace(/\s+/g, '-').toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          {/* Related Articles */}
          <RelatedArticles 
            currentArticleId={article.id} 
            category={article.category} 
          />
          
          {/* Comment Section */}
          <CommentSection articleId={article.id} />
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-72 space-y-8">
          <NewsletterForm />
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-3">Trending Stories</h3>
            <div className="space-y-4">
              {mockArticles
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map((article, index) => (
                  <div key={index} className="group">
                    <Link to={`/article/${article.id}`} className="text-sm font-medium group-hover:text-blue-600">
                      {article.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                      {article.views?.toLocaleString()} views
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

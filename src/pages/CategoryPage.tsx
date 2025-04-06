
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { mockArticles } from "@/data/mockData";
import ArticleFilters from "@/components/ArticleFilters";
import ArticlePagination from "@/components/ArticlePagination";
import NewsletterForm from "@/components/NewsletterForm";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  
  // Filter and sort articles based on category and current filters
  useEffect(() => {
    let articles = mockArticles;
    
    // Filter by category if provided
    if (category) {
      articles = articles.filter(article => 
        article.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const timeRanges = {
        today: 24,
        week: 24 * 7,
        month: 24 * 30,
        year: 24 * 365
      };
      
      articles = articles.filter(article => {
        if (article.hoursAgo) {
          return article.hoursAgo <= timeRanges[dateRange];
        }
        if (article.date) {
          const articleDate = new Date(article.date);
          const hoursDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60);
          return hoursDiff <= timeRanges[dateRange];
        }
        return true;
      });
    }
    
    // Sort articles
    if (sortBy === "newest") {
      articles = [...articles].sort((a, b) => {
        if (a.hoursAgo && b.hoursAgo) return a.hoursAgo - b.hoursAgo;
        if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
        return 0;
      });
    } else if (sortBy === "oldest") {
      articles = [...articles].sort((a, b) => {
        if (a.hoursAgo && b.hoursAgo) return b.hoursAgo - a.hoursAgo;
        if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
        return 0;
      });
    } else if (sortBy === "popularity") {
      articles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    
    setFilteredArticles(articles);
    setCurrentPage(1);  // Reset to first page when filters change
  }, [category, sortBy, dateRange]);
  
  // Paginate articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // Format category name for display
  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "All";

  return (
    <div className="container mx-auto px-4 py-8 pt-[220px] md:pt-[185px]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{displayCategory} News</h1>
        <p className="text-gray-600">
          Latest news and updates from the {displayCategory.toLowerCase()} sector
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <ArticleFilters
            onSortChange={setSortBy}
            onDateRangeChange={setDateRange}
          />
          
          {currentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentArticles.map((article, index) => (
                  <NewsCard
                    key={index}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    category={article.category}
                    date={article.date}
                    url={`/article/${article.id}`}
                    hoursAgo={article.hoursAgo}
                  />
                ))}
              </div>
              
              <ArticlePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later for updates.
              </p>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:w-72">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

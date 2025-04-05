
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StockTicker from "@/components/StockTicker";

interface ArticlePageLayoutProps {
  children: React.ReactNode;
}

const ArticlePageLayout = ({ children }: ArticlePageLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-background border-b border-gray-200 dark:border-gray-800">
        <StockTicker />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center text-blue-600"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Go Back
        </Button>

        {children}
      </div>
    </div>
  );
};

export default ArticlePageLayout;

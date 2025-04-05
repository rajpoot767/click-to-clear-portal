
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
    <div className="container mx-auto px-4 py-8">
      <StockTicker />
      
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
  );
};

export default ArticlePageLayout;

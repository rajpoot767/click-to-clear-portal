
import React, { useState } from "react";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleRatingProps {
  articleId: string;
}

const ArticleRating: React.FC<ArticleRatingProps> = ({ articleId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleRate = (selectedRating: number) => {
    // In a real app, you would send this to your backend
    setRating(selectedRating);
    setHasRated(true);
    
    toast({
      title: "Rating submitted",
      description: `Thank you for rating this article ${selectedRating} stars!`
    });
    
    // Store the rating in localStorage to prevent multiple ratings
    const ratedArticles = JSON.parse(localStorage.getItem('ratedArticles') || '{}');
    ratedArticles[articleId] = selectedRating;
    localStorage.setItem('ratedArticles', JSON.stringify(ratedArticles));
  };
  
  // Check if user has already rated this article
  React.useEffect(() => {
    const ratedArticles = JSON.parse(localStorage.getItem('ratedArticles') || '{}');
    if (ratedArticles[articleId]) {
      setRating(ratedArticles[articleId]);
      setHasRated(true);
    }
  }, [articleId]);
  
  return (
    <div className="flex flex-col items-center py-4 border-t border-b border-gray-200 dark:border-gray-700 my-6">
      <h3 className="text-lg font-medium mb-2">
        {hasRated ? "Thank you for rating!" : "Rate this article"}
      </h3>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="focus:outline-none"
            onClick={() => !hasRated && handleRate(star)}
            onMouseEnter={() => !hasRated && setHoveredRating(star)}
            onMouseLeave={() => !hasRated && setHoveredRating(0)}
          >
            <Star
              fill={star <= (hoveredRating || rating) ? "gold" : "none"}
              stroke={star <= (hoveredRating || rating) ? "gold" : "currentColor"}
              size={28}
              className={`mx-1 transition-all ${
                !hasRated && "hover:scale-110"
              } ${
                hasRated ? "cursor-default" : "cursor-pointer"
              }`}
            />
          </button>
        ))}
      </div>
      {hasRated ? (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          You rated this article {rating} {rating === 1 ? "star" : "stars"}
        </p>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Click to rate
        </p>
      )}
    </div>
  );
};

export default ArticleRating;

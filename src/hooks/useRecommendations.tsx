
import { useState, useEffect } from 'react';
import { mockArticles } from '@/data/mockData';
import NotificationService from '@/services/NotificationService';

// Define types for our recommendation system
export interface UserPreferences {
  interests: string[];
  categories: Record<string, number>;
  readArticles: string[];
}

export interface RecommendationResult {
  topRecommendations: any[];
  trendingArticles: any[];
  isLoading: boolean;
  userPreferences: UserPreferences;
  updatePreference: (category: string, value: number) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  recordArticleRead: (articleId: string, category: string) => void;
}

// Mock initial preferences (in a real app, this would be loaded from a database)
const defaultPreferences: UserPreferences = {
  interests: ['Business', 'Finance', 'Technology'],
  categories: {
    business: 5,
    finance: 4,
    technology: 3,
    property: 2,
    mining: 1,
    energy: 1,
  },
  readArticles: [],
};

const useRecommendations = (): RecommendationResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [topRecommendations, setTopRecommendations] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);

  // Load preferences from localStorage on initial load
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
    
    // Generate recommendations
    generateRecommendations();
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Generate recommendations based on user preferences
  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Mock API call delay
    setTimeout(() => {
      // Sort articles based on user category preferences
      const recommendations = [...mockArticles].sort((a, b) => {
        const aCategoryValue = userPreferences.categories[a.category.toLowerCase()] || 0;
        const bCategoryValue = userPreferences.categories[b.category.toLowerCase()] || 0;
        return bCategoryValue - aCategoryValue;
      });
      
      // Filter out articles the user has already read
      const filteredRecommendations = recommendations.filter(
        article => !userPreferences.readArticles.includes(article.id)
      );
      
      setTopRecommendations(filteredRecommendations.slice(0, 6));
      
      // Get trending articles (most recent ones for the mock)
      const trending = mockArticles
        .sort((a, b) => (a.hoursAgo || 100) - (b.hoursAgo || 100))
        .slice(0, 3);
        
      setTrendingArticles(trending);
      
      // Create notifications for top recommendation if it's new
      if (filteredRecommendations.length > 0) {
        const topArticle = filteredRecommendations[0];
        if (topArticle && topArticle.category) {
          // We'll only create a notification for the top recommendation
          NotificationService.createRecommendation(
            topArticle.title,
            topArticle.category,
            `/article/${topArticle.id}`
          );
        }
      }
      
      setIsLoading(false);
    }, 800);
  };

  // Update a category preference
  const updatePreference = (category: string, value: number) => {
    setUserPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category.toLowerCase()]: value,
      }
    }));
    
    // Regenerate recommendations after preference change
    generateRecommendations();
  };

  // Add a new interest
  const addInterest = (interest: string) => {
    if (!userPreferences.interests.includes(interest)) {
      setUserPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
      
      // Also set a default category value if it doesn't exist
      if (!userPreferences.categories[interest.toLowerCase()]) {
        updatePreference(interest.toLowerCase(), 3);
      }
    }
  };

  // Remove an interest
  const removeInterest = (interest: string) => {
    setUserPreferences(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest),
    }));
    
    // Regenerate recommendations after interest change
    generateRecommendations();
  };

  // Record when a user reads an article
  const recordArticleRead = (articleId: string, category: string) => {
    // Only add if not already in the list
    if (!userPreferences.readArticles.includes(articleId)) {
      setUserPreferences(prev => ({
        ...prev,
        readArticles: [...prev.readArticles, articleId],
      }));
      
      // If user reads an article, slightly increase their preference for that category
      const currentValue = userPreferences.categories[category.toLowerCase()] || 0;
      if (currentValue < 10) {
        updatePreference(category.toLowerCase(), Math.min(currentValue + 0.5, 10));
      }
      
      // Regenerate recommendations
      generateRecommendations();
    }
  };

  return {
    topRecommendations,
    trendingArticles,
    isLoading,
    userPreferences,
    updatePreference,
    addInterest,
    removeInterest,
    recordArticleRead,
  };
};

export default useRecommendations;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import EnhancedNewsCard from "@/components/EnhancedNewsCard";
import NewsletterForm from "@/components/NewsletterForm";
import { mockArticles } from "@/data/mockData";
import { Bell, Bookmark, Clock, TrendingUp, ThumbsUp } from "lucide-react";

const ForYouPage = () => {
  const [userPreferences, setUserPreferences] = useState({
    business: 5,
    technology: 3,
    finance: 4,
    property: 2,
  });

  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    breakingNews: true,
    dailyDigest: true,
    weeklyNewsletter: false,
    marketAlerts: true,
    savedTopics: true,
  });

  // Simulate loading AI recommendations based on preferences
  useEffect(() => {
    // In a real app, this would be an API call to the recommendation engine
    const getRecommendedArticles = () => {
      // Mock AI recommendation logic - prioritize articles from categories the user prefers
      const sortedArticles = [...mockArticles].sort((a, b) => {
        const aCategoryValue = userPreferences[a.category.toLowerCase()] || 0;
        const bCategoryValue = userPreferences[b.category.toLowerCase()] || 0;
        return bCategoryValue - aCategoryValue;
      });
      
      setRecommendedArticles(sortedArticles.slice(0, 6));
      
      // Get trending articles (most recent ones for the mock)
      setTrendingArticles(
        mockArticles
          .sort((a, b) => (a.hoursAgo || 100) - (b.hoursAgo || 100))
          .slice(0, 3)
      );
    };

    getRecommendedArticles();
  }, [userPreferences]);

  const handlePreferenceChange = (category, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [category]: value[0],
    }));
  };

  const toggleNotificationPreference = (key) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[210px] md:pt-[180px]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center">
            For You
            <Badge className="ml-3 bg-blue-500">AI Powered</Badge>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Personalized content based on your interests and reading history
          </p>

          <Tabs defaultValue="recommended">
            <TabsList className="mb-6">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="preferences">Your Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Recommended Content */}
            <TabsContent value="recommended" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedArticles.map((article, index) => (
                  <EnhancedNewsCard
                    key={`recommended-${index}`}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    category={article.category}
                    url={article.id ? `/article/${article.id}` : article.url}
                    hoursAgo={article.hoursAgo}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Trending Content */}
            <TabsContent value="trending">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp size={20} className="mr-2 text-blue-500" />
                  What's Trending Today
                </h2>

                <Carousel className="w-full">
                  <CarouselContent>
                    {trendingArticles.map((article, index) => (
                      <CarouselItem key={`trend-${index}`} className="md:basis-1/2 lg:basis-1/3">
                        <EnhancedNewsCard
                          title={article.title}
                          description={article.description}
                          imageUrl={article.imageUrl}
                          category={article.category}
                          url={article.id ? `/article/${article.id}` : article.url}
                          hoursAgo={article.hoursAgo}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="relative static -left-0 mx-2" />
                    <CarouselNext className="relative static -right-0 mx-2" />
                  </div>
                </Carousel>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-3">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Business", "Finance", "Technology", "Energy", "Real Estate", "Industry", "Economy"].map((tag) => (
                    <Link 
                      key={tag} 
                      to={`/category/${tag.toLowerCase()}`}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-6">Customize Your Content Preferences</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Adjust the sliders below to see more or less content from each category
                </p>

                <div className="space-y-6">
                  {Object.entries(userPreferences).map(([category, value]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <label className="font-medium capitalize">{category}</label>
                        <span className="text-sm text-gray-500">{value}/10</span>
                      </div>
                      <Slider
                        defaultValue={[value]}
                        max={10}
                        step={1}
                        onValueChange={(val) => handlePreferenceChange(category, val)}
                      />
                    </div>
                  ))}

                  <div className="pt-4">
                    <Button className="w-full mt-4">Save Preferences</Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Reading History</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock size={18} className="text-gray-500 mr-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Your recommendations are based on the last 50 articles you've read
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Reading History
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Bell size={20} className="mr-2 text-blue-500" />
                  Notification Preferences
                </h2>
                
                <div className="divide-y dark:divide-gray-700">
                  {Object.entries(notificationPreferences).map(([key, enabled]) => {
                    const prettyName = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase());
                    
                    return (
                      <div key={key} className="py-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{prettyName}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive {prettyName.toLowerCase()} notifications
                          </p>
                        </div>
                        <Button 
                          variant={enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleNotificationPreference(key)}
                        >
                          {enabled ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Followed Topics</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Business", "Finance", "Technology"].map((topic) => (
                    <div key={topic} className="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      <span>{topic}</span>
                      <Button size="icon" variant="ghost" className="h-5 w-5 ml-2 p-0 text-blue-700 dark:text-blue-300">
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="mb-8">
                  <ThumbsUp size={16} className="mr-2" />
                  Manage Topics
                </Button>
                
                <NewsletterForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ForYouPage;

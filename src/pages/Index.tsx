
import React from "react";
import { Link } from "react-router-dom";
import EnhancedNewsCard from "@/components/EnhancedNewsCard";
import StockTicker from "@/components/StockTicker";
import WeatherWidget from "@/components/WeatherWidget";
import NewsletterForm from "@/components/NewsletterForm";
import MarketIndicatorsDashboard from "@/components/MarketIndicatorsDashboard";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from "lucide-react";

const Index = () => {
  // Mock data for news articles based on the BusinessNews website
  const newsArticles = [
    {
      title: "Talison's revenue, profit tumbles in lithium landslide",
      description: "Greenbushes may have clung on to an annual profit at $72m, but a slashed spodumene market led to a sharp downturn in mine operator Talison's latest financials.",
      imageUrl: "https://picsum.photos/800/450",
      category: "Mining",
      url: "/1",
      hoursAgo: 39
    },
    {
      title: "Hames Sharley cuts out lack of investment in Perth",
      description: "The property developer says the state government should put more emphasis on the city, and has criticised a lack of investment in Perth's main train station.",
      imageUrl: "https://picsum.photos/800/451",
      category: "Property",
      url: "/2",
      hoursAgo: 4
    },
    {
      title: "At Close of Business podcast March 31 2023",
      description: "Liv Declerck and Isabel Vieira discuss a Perth film studio's foray into virtual reality documentary making.",
      imageUrl: "https://picsum.photos/800/452",
      category: "Podcasts",
      url: "/3",
      hoursAgo: 5
    },
    {
      title: "Scyne Advisory partners to start at FTI",
      description: "Consulting firm FTI is set for a boost this week with the signing of partners that left Scyne Advisory last year commence at their new employer.",
      imageUrl: "https://picsum.photos/800/453",
      category: "Professions",
      url: "/4",
      hoursAgo: 6
    },
    {
      title: "Austerity budget With public sector cuts",
      description: "The state government has announced significant cuts to public sector spending in its latest budget.",
      imageUrl: "https://picsum.photos/800/454",
      category: "Government",
      url: "/5",
      hoursAgo: 6
    },
    {
      title: "Share market traffic and business news",
      description: "Markets took a downturn today with major indexes showing significant losses across multiple sectors.",
      imageUrl: "https://picsum.photos/800/455",
      category: "News",
      url: "/6",
      hoursAgo: 7
    },
    {
      title: "Neighborhood centers boom in Perth",
      description: "Local shopping centers and community hubs are seeing increased investment and foot traffic across Perth suburbs.",
      imageUrl: "https://picsum.photos/800/456",
      category: "Property",
      url: "/7",
      hoursAgo: 8
    },
    {
      title: "EPA aims to lower carbon footprint",
      description: "New guidelines have been issued by the Environmental Protection Agency targeting industrial emissions.",
      imageUrl: "https://picsum.photos/800/457",
      category: "Government",
      url: "/8",
      hoursAgo: 9
    }
  ];
  
  // Most read articles
  const mostReadArticles = [
    {
      id: "most-1",
      title: "Global market trends show recovery signs",
      views: 5280
    },
    {
      id: "most-2",
      title: "New regulations impact tech industry",
      views: 4320
    },
    {
      id: "most-3",
      title: "Renewable energy investments surge",
      views: 3690
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[210px] md:pt-[180px]">
      <StockTicker />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <MarketIndicatorsDashboard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area - 3/4 width on desktop */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Latest Headlines</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {newsArticles.slice(0, 6).map((article, index) => (
                <EnhancedNewsCard 
                  key={index}
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  category={article.category}
                  url={article.url}
                  hoursAgo={article.hoursAgo}
                />
              ))}
            </div>
            
            <div className="flex justify-center mb-12">
              <Button asChild variant="outline">
                <Link to="/category/all">View All Articles</Link>
              </Button>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <TrendingUp className="mr-2 text-blue-600" size={24} />
                <h2 className="text-2xl font-bold">Trending Topics</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Business", "Finance", "Technology", "Energy", "Real Estate", "Industry", "Economy", "Market Analysis", "Innovation", "Sustainability"].map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/category/${tag.toLowerCase()}`}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {newsArticles.slice(6, 8).map((article, index) => (
                <EnhancedNewsCard 
                  key={index}
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  category={article.category}
                  url={article.url}
                  hoursAgo={article.hoursAgo}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar - 1/4 width on desktop */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden">
                <Link to="/search">
                  <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                    <Search size={20} />
                    <span>Search News...</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            <WeatherWidget />
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Most Read</h3>
              <div className="space-y-4">
                {mostReadArticles.map((article, index) => (
                  <Link key={index} to={`/news/${article.id}`}>
                    <div className="group">
                      <div className="font-medium group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {article.views.toLocaleString()} views
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <NewsletterForm />
            
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Premium Access</h3>
              <p className="text-sm mb-4">
                Get unlimited access to exclusive content, detailed analysis, and premium features.
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

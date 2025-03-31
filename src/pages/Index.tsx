
import React from "react";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  // Mock data for news articles
  const featuredNews = {
    title: "Western Australia's Economic Growth Outpaces National Average",
    description: "The state's economy grew by 3.7% last quarter, driven by mining exports and increased business investment in renewable energy projects.",
    imageUrl: "https://picsum.photos/800/450",
    category: "Economy",
    date: "May 15, 2023",
    url: "/"
  };
  
  const latestNews = [
    {
      title: "Major Tech Company to Open New Office in Perth CBD",
      description: "The global tech giant will create over 500 new jobs in Western Australia with its new innovation hub.",
      imageUrl: "https://picsum.photos/800/451",
      category: "Technology",
      date: "May 14, 2023",
      url: "/"
    },
    {
      title: "Local Startup Secures $5M in Series A Funding",
      description: "The Perth-based healthcare technology startup plans to expand operations across Australia and Southeast Asia.",
      imageUrl: "https://picsum.photos/800/452",
      category: "Startups",
      date: "May 14, 2023",
      url: "/"
    },
    {
      title: "New Infrastructure Project Approved for Regional Development",
      description: "The $2.3 billion project is expected to improve connectivity and create hundreds of construction jobs.",
      imageUrl: "https://picsum.photos/800/453",
      category: "Infrastructure",
      date: "May 13, 2023",
      url: "/"
    },
    {
      title: "Resources Sector Reports Record Export Values",
      description: "Western Australia's mining industry continues to drive national export growth with record commodity prices.",
      imageUrl: "https://picsum.photos/800/454",
      category: "Resources",
      date: "May 13, 2023",
      url: "/"
    },
    {
      title: "Property Market Shows Signs of Cooling After Interest Rate Hikes",
      description: "Analysts predict a moderation in Perth's housing market following the recent series of rate increases.",
      imageUrl: "https://picsum.photos/800/455",
      category: "Real Estate",
      date: "May 12, 2023",
      url: "/"
    },
    {
      title: "Local Winery Wins International Award",
      description: "The Margaret River producer took top honors at the prestigious global competition for its signature Cabernet Sauvignon.",
      imageUrl: "https://picsum.photos/800/456",
      category: "Agriculture",
      date: "May 12, 2023",
      url: "/"
    }
  ];
  
  const sidebarNews = [
    {
      title: "Stock Market Update: ASX 200 Rises on Banking Sector Gains",
      category: "Markets",
      date: "May 15, 2023",
      url: "/"
    },
    {
      title: "Digital Transformation Key Focus for WA Businesses, Survey Finds",
      category: "Digital",
      date: "May 15, 2023",
      url: "/"
    },
    {
      title: "New Trade Agreement to Boost Export Opportunities",
      category: "Trade",
      date: "May 14, 2023",
      url: "/"
    },
    {
      title: "Renewable Energy Investment Reaches Record Levels in Western Australia",
      category: "Energy",
      date: "May 14, 2023",
      url: "/"
    },
    {
      title: "Tourism Recovery Continues with Strong Interstate Visitor Numbers",
      category: "Tourism",
      date: "May 13, 2023",
      url: "/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Headlines</h1>
          <p className="text-gray-600">The most recent business news from Australia</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {/* Featured article */}
            <div className="mb-8">
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img 
                  src={featuredNews.imageUrl} 
                  alt={featuredNews.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-600 uppercase">{featuredNews.category}</span>
                <span className="text-sm text-gray-500">{featuredNews.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{featuredNews.title}</h2>
              <p className="text-gray-600 mb-4">{featuredNews.description}</p>
              <a href={featuredNews.url} className="text-blue-600 font-medium hover:underline">Read more →</a>
            </div>
            
            <Separator className="my-8" />
            
            {/* Latest news grid */}
            <h2 className="text-2xl font-bold mb-6">More Headlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestNews.map((news, index) => (
                <NewsCard 
                  key={index}
                  title={news.title}
                  description={news.description}
                  imageUrl={news.imageUrl}
                  category={news.category}
                  date={news.date}
                  url={news.url}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-xl mb-4">Market Updates</h3>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {sidebarNews.map((item, index) => (
                    <div key={index} className="pb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-blue-600">{item.category}</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <a href={item.url} className="font-medium hover:text-blue-600 transition-colors">
                        {item.title}
                      </a>
                      {index < sidebarNews.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4">Subscribe for Updates</h3>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-white text-lg mb-4">BusinessNews</h4>
              <p className="mb-4">The leading source of business news and information in Australia.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white transition-colors">Latest Headlines</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Economy</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Markets</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Companies</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Technology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Advertise</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
            <p>© 2023 BusinessNews. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

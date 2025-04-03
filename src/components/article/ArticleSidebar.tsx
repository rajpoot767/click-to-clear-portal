
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import WeatherWidget from "@/components/WeatherWidget";
import MarketIndicatorsDashboard from "@/components/MarketIndicatorsDashboard";

const ArticleSidebar = () => {
  return (
    <Tabs defaultValue="widgets">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="widgets">Widgets</TabsTrigger>
        <TabsTrigger value="markets">Markets</TabsTrigger>
      </TabsList>
      
      <TabsContent value="widgets" className="space-y-6 pt-4">
        <WeatherWidget />
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Popular Articles</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="group">
                  <Link to={`/news/${i}`} className="text-sm font-medium group-hover:text-blue-600">
                    {i === 1 ? "Global market trends show recovery signs" : 
                     i === 2 ? "New regulations impact tech industry" :
                     i === 3 ? "Renewable energy investments surge" :
                     i === 4 ? "Healthcare innovation leads to breakthrough" :
                     "Financial experts predict interest rate changes"}
                  </Link>
                  <div className="text-xs text-gray-500 mt-1">
                    {(2000 - (i * 300)).toLocaleString()} views
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["Mining", "Economy", "Business", "Finance", "Technology", "Energy", "Innovation"].map((tag) => (
                <Link 
                  key={tag}
                  to={`/category/${tag.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="markets" className="pt-4">
        <MarketIndicatorsDashboard />
      </TabsContent>
    </Tabs>
  );
};

export default ArticleSidebar;

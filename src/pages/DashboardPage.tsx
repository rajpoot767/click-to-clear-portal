
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Layout, PieChart, Bookmark, Clock } from "lucide-react";
import DashboardCustomizer from "@/components/dashboard/DashboardCustomizer";
import ReadingPreferences from "@/components/dashboard/ReadingPreferences";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [readLater, setReadLater] = useState<{id: string; title: string; date?: string}[]>([
    { id: "1", title: "Why Tech Companies Are Moving to Hybrid Work Models", date: "2 days ago" },
    { id: "2", title: "The Impact of AI on Modern Journalism", date: "1 week ago" }
  ]);
  const [activeWidgets, setActiveWidgets] = useState<string[]>(["recent-activity", "recommended", "trending"]);

  const removeFromReadLater = (id: string) => {
    setReadLater(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Button asChild>
          <Link to="/profile">View Full Profile</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="read-later">Read Later</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeWidgets.includes("recent-activity") && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">You've read 5 articles this week</p>
                      <div className="mt-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Latest read:</span> The Future of Renewable Energy
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Time spent:</span> 45 minutes today
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeWidgets.includes("recommended") && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recommended</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="text-sm hover:text-blue-600">
                          <Link to="/article/rec1">Innovations in Sustainable Finance</Link>
                        </li>
                        <li className="text-sm hover:text-blue-600">
                          <Link to="/article/rec2">Market Analysis: Q2 2025 Predictions</Link>
                        </li>
                        <li className="text-sm hover:text-blue-600">
                          <Link to="/article/rec3">Tech Startups to Watch in 2025</Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {activeWidgets.includes("trending") && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-sm">Renewable Energy</div>
                      <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full text-sm">Market Analysis</div>
                      <div className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full text-sm">AI Development</div>
                      <div className="bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">Global Economy</div>
                      <div className="bg-rose-100 dark:bg-rose-900 px-3 py-1 rounded-full text-sm">Startup Funding</div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <DashboardAnalytics />
            </TabsContent>
            
            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookmarks.length === 0 ? (
                    <p>You haven't bookmarked any articles yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="flex items-start border-b pb-3 last:border-0">
                          {bookmark.imageUrl && (
                            <Link to={`/news/${bookmark.id}`} className="shrink-0">
                              <img 
                                src={bookmark.imageUrl} 
                                alt={bookmark.title} 
                                className="w-20 h-16 object-cover rounded mr-3" 
                              />
                            </Link>
                          )}
                          <div className="flex-1">
                            <Link to={`/news/${bookmark.id}`} className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
                              {bookmark.title}
                            </Link>
                            {bookmark.category && (
                              <div className="text-xs text-blue-600 uppercase mt-1">
                                {bookmark.category}
                              </div>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeBookmark(bookmark.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="read-later">
              <Card>
                <CardHeader>
                  <CardTitle>Read Later</CardTitle>
                </CardHeader>
                <CardContent>
                  {readLater.length === 0 ? (
                    <p>You don't have any articles saved to read later.</p>
                  ) : (
                    <div className="space-y-4">
                      {readLater.map((item) => (
                        <div key={item.id} className="flex justify-between items-start border-b pb-3 last:border-0">
                          <div>
                            <Link to={`/article/${item.id}`} className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
                              {item.title}
                            </Link>
                            {item.date && (
                              <div className="text-xs text-gray-500 mt-1">
                                Added: {item.date}
                              </div>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFromReadLater(item.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customize">
              <DashboardCustomizer />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="flex items-center justify-start h-auto py-2 px-3 text-sm" size="sm" variant="outline">
                  <Bookmark className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">View Bookmarks</span>
                </Button>
                <Button className="flex items-center justify-start h-auto py-2 px-3 text-sm" size="sm" variant="outline">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Read Later</span>
                </Button>
                <Button className="flex items-center justify-start h-auto py-2 px-3 text-sm" size="sm" variant="outline">
                  <Layout className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Customize</span>
                </Button>
                <Button className="flex items-center justify-start h-auto py-2 px-3 text-sm" size="sm" variant="outline">
                  <PieChart className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Reading Stats</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reading Preferences</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <ReadingPreferences />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

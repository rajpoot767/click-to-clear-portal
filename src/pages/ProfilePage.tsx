
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { UserCircle, Bookmark, Clock, Settings, Layout, PieChart } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import DashboardCustomizer from "@/components/dashboard/DashboardCustomizer";
import ReadingPreferences from "@/components/dashboard/ReadingPreferences";

const ProfilePage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [readLater, setReadLater] = useState<{id: string; title: string; date?: string}[]>([
    { id: "1", title: "Why Tech Companies Are Moving to Hybrid Work Models", date: "2 days ago" },
    { id: "2", title: "The Impact of AI on Modern Journalism", date: "1 week ago" }
  ]);
  const [customDashboard, setCustomDashboard] = useState(false);

  const removeFromReadLater = (id: string) => {
    setReadLater(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">User Name</CardTitle>
                <p className="text-center text-gray-500 dark:text-gray-400">user@example.com</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile?tab=bookmarks">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bookmarks
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile?tab=read-later">
                    <Clock className="mr-2 h-4 w-4" />
                    Read Later
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile?tab=customize">
                    <Layout className="mr-2 h-4 w-4" />
                    Customize Dashboard
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile?tab=preferences">
                    <PieChart className="mr-2 h-4 w-4" />
                    Reading Preferences
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/profile?tab=settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="read-later">Read Later</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Welcome to your profile page. Here you can manage your bookmarks, reading list, and account settings.</p>
                  {customDashboard ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card className="p-4 border border-blue-200">
                        <h3 className="font-bold mb-2">Recent Activity</h3>
                        <p>You've read 5 articles this week</p>
                      </Card>
                      <Card className="p-4 border border-green-200">
                        <h3 className="font-bold mb-2">Recommended Topics</h3>
                        <p>Finance, Technology, Health</p>
                      </Card>
                    </div>
                  ) : (
                    <Button 
                      className="mt-4" 
                      onClick={() => setCustomDashboard(true)}
                    >
                      <Layout className="mr-2 h-4 w-4" />
                      Enable Custom Dashboard
                    </Button>
                  )}
                </CardContent>
              </Card>
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
            
            <TabsContent value="preferences">
              <ReadingPreferences />
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage your account settings and preferences here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

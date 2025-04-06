
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import ReadingPreferences from "@/components/dashboard/ReadingPreferences";
import DashboardCustomizer from "@/components/dashboard/DashboardCustomizer";

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-[220px] md:pt-[185px]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your preferences, see your reading history, and customize your experience
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full md:w-auto mb-8 grid grid-cols-3 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Activity</CardTitle>
                <CardDescription>Your reading stats for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Articles Read</span>
                    <span className="font-medium">27</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Spent Reading</span>
                    <span className="font-medium">4.3 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Favorite Category</span>
                    <span className="font-medium">Technology</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bookmarks</CardTitle>
                <CardDescription>Articles you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Bookmarks</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unread Bookmarks</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Button variant="outline" className="w-full">View All Bookmarks</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Plan</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Billing</span>
                    <span className="font-medium">May 15, 2025</span>
                  </div>
                  <Button variant="outline" className="w-full">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Unread Notifications</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Digest</span>
                    <span className="font-medium">Weekly</span>
                  </div>
                  <Button variant="outline" className="w-full">View Notifications</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Comments & Interactions</CardTitle>
                <CardDescription>Your community engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Comments Posted</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Replies Received</span>
                    <span className="font-medium">12</span>
                  </div>
                  <Button variant="outline" className="w-full">View Activity</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Searches</CardTitle>
                <CardDescription>Topics you're tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Searches</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latest Updates</span>
                    <span className="font-medium">2 today</span>
                  </div>
                  <Button variant="outline" className="w-full">Manage Searches</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <DashboardAnalytics />
        </TabsContent>
        
        <TabsContent value="preferences">
          <ReadingPreferences />
        </TabsContent>
        
        <TabsContent value="customize">
          <DashboardCustomizer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

// Sample data for charts
const readingData = [
  { day: "Mon", articles: 4 },
  { day: "Tue", articles: 3 },
  { day: "Wed", articles: 7 },
  { day: "Thu", articles: 2 },
  { day: "Fri", articles: 5 },
  { day: "Sat", articles: 6 },
  { day: "Sun", articles: 3 }
];

const categoryData = [
  { name: "Business", articles: 12, color: "#3b82f6" },
  { name: "Technology", articles: 9, color: "#10b981" },
  { name: "Finance", articles: 7, color: "#f59e0b" },
  { name: "Markets", articles: 5, color: "#8b5cf6" },
];

const trendingTopicsData = [
  { name: "Crypto", count: 24 },
  { name: "AI", count: 19 },
  { name: "Startups", count: 15 },
  { name: "Real Estate", count: 12 }
];

const engagementData = [
  { month: "Jan", articles: 15, comments: 7 },
  { month: "Feb", articles: 18, comments: 9 },
  { month: "Mar", articles: 14, comments: 12 },
  { month: "Apr", articles: 21, comments: 15 },
  { month: "May", articles: 25, comments: 18 },
];

const DashboardAnalytics = () => {
  const [activeChart, setActiveChart] = useState("weekly");

  // Toggle between different time periods
  const handleChartToggle = (chartType) => {
    setActiveChart(chartType);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <CardTitle className="text-xl text-blue-600 dark:text-blue-400">Reading Analytics</CardTitle>
          <div className="flex gap-2">
            <button 
              onClick={() => handleChartToggle("weekly")}
              className={`px-4 py-1 text-xs rounded-full ${
                activeChart === "weekly" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              Weekly
            </button>
            <button 
              onClick={() => handleChartToggle("monthly")}
              className={`px-4 py-1 text-xs rounded-full ${
                activeChart === "monthly" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Articles Read This Week</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Bar 
                      dataKey="articles"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Top Categories</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="articles"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={50}
                      animationDuration={1500}
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                      }}
                      formatter={(value, name) => [`${value} articles`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Reading Engagement Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="articles" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="comments" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingTopicsData.map((topic, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="text-gray-600 dark:text-gray-300 text-xs font-medium mb-1">Trending Topic</h4>
                <h3 className="text-lg font-semibold mb-2">{topic.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-grow overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(topic.count / Math.max(...trendingTopicsData.map(t => t.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{topic.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAnalytics;

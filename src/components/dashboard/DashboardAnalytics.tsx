
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  { name: "Business", articles: 12 },
  { name: "Technology", articles: 9 },
  { name: "Finance", articles: 7 },
  { name: "Markets", articles: 5 },
];

const DashboardAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Articles Read This Week</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={readingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="articles" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Top Categories</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={categoryData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="articles" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAnalytics;

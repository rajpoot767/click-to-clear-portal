
import React from "react";
import DataVisualization from "@/components/DataVisualization";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DataInsights = () => {
  const economicGrowthData = [
    { quarter: "Q1 2022", gdp: 2.3, unemployment: 5.7, inflation: 7.5 },
    { quarter: "Q2 2022", gdp: 1.8, unemployment: 5.2, inflation: 8.2 },
    { quarter: "Q3 2022", gdp: 0.9, unemployment: 4.9, inflation: 8.9 },
    { quarter: "Q4 2022", gdp: 0.4, unemployment: 5.1, inflation: 7.8 },
    { quarter: "Q1 2023", gdp: -0.2, unemployment: 5.4, inflation: 6.5 },
    { quarter: "Q2 2023", gdp: -0.5, unemployment: 5.9, inflation: 5.7 },
    { quarter: "Q3 2023", gdp: 0.3, unemployment: 6.2, inflation: 4.9 },
    { quarter: "Q4 2023", gdp: 1.1, unemployment: 5.8, inflation: 4.2 },
    { quarter: "Q1 2024", gdp: 1.7, unemployment: 5.3, inflation: 3.8 }
  ];

  const sectorPerformance = [
    { name: "Technology", value: 32.7 },
    { name: "Healthcare", value: 18.2 },
    { name: "Financials", value: 15.6 },
    { name: "Consumer", value: 12.9 },
    { name: "Energy", value: 9.3 },
    { name: "Utilities", value: 5.8 },
    { name: "Materials", value: 5.5 }
  ];

  const housingMarketData = [
    { month: "Jan", sales: 4200, medianPrice: 320000, inventory: 52000 },
    { month: "Feb", sales: 4350, medianPrice: 325000, inventory: 48000 },
    { month: "Mar", sales: 5100, medianPrice: 327000, inventory: 45000 },
    { month: "Apr", sales: 5700, medianPrice: 335000, inventory: 42000 },
    { month: "May", sales: 6200, medianPrice: 340000, inventory: 38000 },
    { month: "Jun", sales: 6800, medianPrice: 348000, inventory: 36000 },
    { month: "Jul", sales: 6500, medianPrice: 352000, inventory: 35000 },
    { month: "Aug", sales: 6300, medianPrice: 349000, inventory: 37000 },
    { month: "Sep", sales: 5900, medianPrice: 345000, inventory: 40000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Insights</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Interactive data visualizations to help you understand market trends and economic indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Economic Outlook Report</CardTitle>
            <CardDescription>
              Analysis of key economic indicators over the past two years shows a recovering economy after a brief recession.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Our analysis of recent economic data indicates a slow but steady recovery following the brief economic downturn in early 2023. 
              GDP growth has returned to positive territory, while inflation continues its downward trend from the peak levels seen in 2022.
            </p>
            
            <h3 className="mt-6 mb-4">Economic Indicators By Quarter</h3>
            <DataVisualization 
              title="GDP, Unemployment & Inflation Trends (2022-2024)"
              data={economicGrowthData}
              xKey="quarter"
              yKey="gdp"
            />
            
            <p className="mt-6">
              The data reveals that while GDP growth stalled in early 2023, the recovery has been gaining momentum over the past three quarters. 
              Meanwhile, inflation has been steadily decreasing, providing relief to consumers and businesses alike.
            </p>
            
            <h3 className="mt-8 mb-4">Market Sector Performance</h3>
            <DataVisualization 
              title="Market Capitalization by Sector (%)"
              description="Percentage of total market capitalization by industry sector"
              data={sectorPerformance}
            />
            
            <p className="mt-6">
              The technology sector continues to dominate the market, accounting for nearly a third of total market capitalization. 
              Healthcare and financial sectors follow as the second and third largest sectors respectively.
            </p>
            
            <h3 className="mt-8 mb-4">Housing Market Analysis</h3>
            <DataVisualization 
              title="Housing Market Trends (2023)"
              description="Monthly sales volume and median home prices"
              data={housingMarketData}
              xKey="month"
              yKey="sales"
            />
            
            <p className="mt-6">
              The housing market has shown strong seasonal patterns, with sales peaking during the summer months and tapering off into the fall. 
              Median home prices have stabilized after a period of rapid growth, suggesting a more balanced market ahead.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataInsights;

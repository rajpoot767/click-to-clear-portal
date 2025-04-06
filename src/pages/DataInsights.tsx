
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataVisualization from "@/components/DataVisualization";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import NotificationSystem from "@/components/NotificationSystem";

interface DataPoint {
  name: string;
  value: number;
}

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState("economy");

  const handleDownload = (reportType: string) => {
    NotificationSystem.success(`${reportType} report download started`, {
      description: "The report will be downloaded shortly",
    });
  };

  const handleShare = (reportType: string) => {
    NotificationSystem.info(`Share ${reportType} report`, {
      description: "Link copied to clipboard",
      action: {
        label: "Undo",
        onClick: () => {
          NotificationSystem.info("Share cancelled");
        }
      }
    });
  };

  // Transform economic data to match DataPoint interface
  const economicData: DataPoint[] = [
    { name: "Q1 2023", value: 3.2 },
    { name: "Q2 2023", value: 2.8 },
    { name: "Q3 2023", value: 3.5 },
    { name: "Q4 2023", value: 3.7 },
    { name: "Q1 2024", value: 3.1 },
    { name: "Q2 2024", value: 2.9 }
  ];

  // Full economic dataset for table view
  const fullEconomicData = [
    { quarter: "Q1 2023", gdp: 3.2, unemployment: 5.1, inflation: 4.3 },
    { quarter: "Q2 2023", gdp: 2.8, unemployment: 4.9, inflation: 4.1 },
    { quarter: "Q3 2023", gdp: 3.5, unemployment: 4.7, inflation: 3.8 },
    { quarter: "Q4 2023", gdp: 3.7, unemployment: 4.5, inflation: 3.5 },
    { quarter: "Q1 2024", gdp: 3.1, unemployment: 4.3, inflation: 3.2 },
    { quarter: "Q2 2024", gdp: 2.9, unemployment: 4.2, inflation: 3.0 }
  ];

  // Transform stock market data to match DataPoint interface
  const stockMarketData: DataPoint[] = [
    { name: "Jan", value: 4250 },
    { name: "Feb", value: 4310 },
    { name: "Mar", value: 4150 },
    { name: "Apr", value: 4290 },
    { name: "May", value: 4380 },
    { name: "Jun", value: 4450 }
  ];

  // Full stock market dataset for table view
  const fullStockMarketData = [
    { month: "Jan", indexValue: 4250, volume: 3.2, volatility: 12.4 },
    { month: "Feb", indexValue: 4310, volume: 3.5, volatility: 11.8 },
    { month: "Mar", indexValue: 4150, volume: 3.1, volatility: 14.2 },
    { month: "Apr", indexValue: 4290, volume: 2.9, volatility: 13.5 },
    { month: "May", indexValue: 4380, volume: 3.3, volatility: 12.1 },
    { month: "Jun", indexValue: 4450, volume: 3.6, volatility: 11.5 }
  ];

  // Transform real estate data to match DataPoint interface
  const realEstateData: DataPoint[] = [
    { name: "Jan", value: 520 },
    { name: "Feb", value: 515 },
    { name: "Mar", value: 535 },
    { name: "Apr", value: 550 },
    { name: "May", value: 565 },
    { name: "Jun", value: 580 }
  ];

  // Full real estate dataset for table view
  const fullRealEstateData = [
    { month: "Jan", sales: 520, medianPrice: 450000, inventory: 12500 },
    { month: "Feb", sales: 515, medianPrice: 455000, inventory: 12200 },
    { month: "Mar", sales: 535, medianPrice: 462000, inventory: 11800 },
    { month: "Apr", sales: 550, medianPrice: 468000, inventory: 11500 },
    { month: "May", sales: 565, medianPrice: 475000, inventory: 11200 },
    { month: "Jun", sales: 580, medianPrice: 482000, inventory: 10800 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-[180px] md:pt-[145px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data & Insights</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive visualizations of key business and economic data
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="economy">Economic Indicators</TabsTrigger>
          <TabsTrigger value="stockMarket">Stock Market</TabsTrigger>
          <TabsTrigger value="realEstate">Real Estate</TabsTrigger>
        </TabsList>

        <TabsContent value="economy">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>GDP Growth Rate (%)</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleShare("Economic")} className="flex items-center gap-1">
                  <Share2 size={16} /> Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload("Economic")} className="flex items-center gap-1">
                  <Download size={16} /> Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataVisualization 
                data={economicData}
                chartType="bar"
                title="Quarterly GDP Growth Rate (%)"
                xAxisLabel="Quarter"
                yAxisLabel="Growth Rate (%)"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stockMarket">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>S&P 500 Index</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleShare("Stock Market")} className="flex items-center gap-1">
                  <Share2 size={16} /> Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload("Stock Market")} className="flex items-center gap-1">
                  <Download size={16} /> Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataVisualization 
                data={stockMarketData}
                chartType="line"
                title="S&P 500 Index Value"
                xAxisLabel="Month"
                yAxisLabel="Index Value"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realEstate">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Home Sales</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleShare("Real Estate")} className="flex items-center gap-1">
                  <Share2 size={16} /> Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload("Real Estate")} className="flex items-center gap-1">
                  <Download size={16} /> Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataVisualization 
                data={realEstateData}
                chartType="area"
                title="Monthly Home Sales (thousands)"
                xAxisLabel="Month"
                yAxisLabel="Sales (thousands)"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataInsights;

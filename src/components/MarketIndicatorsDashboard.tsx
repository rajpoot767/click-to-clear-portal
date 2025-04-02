import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import Cell from "@/components/ui/cell";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity } from "lucide-react";

// Mock market data
const marketIndices = [
  { name: "S&P 500", value: "4,927.11", change: "+0.87%", trend: "up" },
  { name: "Nasdaq", value: "15,628.95", change: "+1.12%", trend: "up" },
  { name: "Dow Jones", value: "38,239.98", change: "-0.23%", trend: "down" },
  { name: "Russell 2000", value: "2,003.17", change: "+0.45%", trend: "up" },
  { name: "10-Yr Treasury", value: "4.62%", change: "+0.03", trend: "up" }
];

// Mock historical data for the charts
const generateMockData = (days = 30, baseValue = 100, volatility = 5) => {
  const data = [];
  let value = baseValue;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility;
    value += change;
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString(),
      value: Math.max(0, Number(value.toFixed(2))),
    });
  }
  
  return data;
};

const sp500Data = generateMockData(30, 450, 10);
const commoditiesData = [
  { name: "Oil (WTI)", value: "$78.26", change: "+1.26%", trend: "up" },
  { name: "Gold", value: "$2,392.60", change: "+0.32%", trend: "up" },
  { name: "Silver", value: "$28.67", change: "-0.78%", trend: "down" },
  { name: "Natural Gas", value: "$1.94", change: "-3.13%", trend: "down" }
];

const sectorPerformance = [
  { name: "Technology", value: 2.8 },
  { name: "Healthcare", value: 1.5 },
  { name: "Financials", value: -0.7 },
  { name: "Energy", value: 0.9 },
  { name: "Consumer", value: 0.3 },
  { name: "Utilities", value: -0.4 },
  { name: "Materials", value: 1.2 }
];

const currencyData = [
  { name: "EUR/USD", value: "1.0703", change: "-0.0008", trend: "down" },
  { name: "GBP/USD", value: "1.2538", change: "+0.0023", trend: "up" },
  { name: "USD/JPY", value: "157.84", change: "+0.53", trend: "up" },
  { name: "USD/CAD", value: "1.3651", change: "-0.0045", trend: "down" }
];

const MarketIndicatorsDashboard = () => {
  const [activeTab, setActiveTab] = useState("indices");
  
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <CardTitle className="text-lg font-bold flex items-center">
          <Activity size={18} className="mr-2 text-blue-600" />
          Market Indicators Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b border-gray-200 dark:border-gray-700 rounded-none bg-transparent">
            <TabsTrigger value="indices" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              Indices
            </TabsTrigger>
            <TabsTrigger value="commodities" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              Commodities
            </TabsTrigger>
            <TabsTrigger value="sectors" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              Sectors
            </TabsTrigger>
            <TabsTrigger value="currencies" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              Currencies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="indices" className="p-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Major Indices</h3>
                <div className="space-y-2">
                  {marketIndices.map((index, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800"
                    >
                      <span className="font-medium">{index.name}</span>
                      <div className="flex items-center">
                        <span className="font-mono mr-2">{index.value}</span>
                        <span className={`flex items-center ${index.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {index.trend === "up" ? (
                            <ArrowUpRight size={16} className="mr-1" />
                          ) : (
                            <ArrowDownRight size={16} className="mr-1" />
                          )}
                          {index.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-64">
                <ChartContainer config={{ primary: { theme: { dark: "#3b82f6", light: "#3b82f6" } } }}>
                  <LineChart data={sp500Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
                <p className="text-xs text-center mt-2 text-gray-500">S&P 500 - Last 30 Days</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="commodities" className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Commodities Prices</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {commoditiesData.map((commodity, i) => (
                  <Card key={i} className="bg-gray-50 dark:bg-gray-800 border-0">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">{commodity.name}</div>
                      <div className="text-xl font-bold mt-2">{commodity.value}</div>
                      <div className={`text-sm flex items-center mt-1 ${commodity.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {commodity.trend === "up" ? (
                          <ArrowUpRight size={16} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="mr-1" />
                        )}
                        {commodity.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sectors" className="p-4">
            <h3 className="font-medium mb-4">Today's Sector Performance (%)</h3>
            <div className="h-64">
              <ChartContainer
                config={{
                  positive: { theme: { dark: "#22c55e", light: "#22c55e" } },
                  negative: { theme: { dark: "#ef4444", light: "#ef4444" } }
                }}
              >
                <BarChart data={sectorPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                  <Bar dataKey="value" name="Change (%)">
                    {sectorPerformance.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value >= 0 ? "var(--color-positive)" : "var(--color-negative)"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="currencies" className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Currency Exchange Rates</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currencyData.map((currency, i) => (
                  <Card key={i} className="bg-gray-50 dark:bg-gray-800 border-0">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">{currency.name}</div>
                      <div className="text-xl font-bold mt-2">{currency.value}</div>
                      <div className={`text-sm flex items-center mt-1 ${currency.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {currency.trend === "up" ? (
                          <ArrowUpRight size={16} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="mr-1" />
                        )}
                        {currency.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketIndicatorsDashboard;

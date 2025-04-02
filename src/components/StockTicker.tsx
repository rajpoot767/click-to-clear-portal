
import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: "AAPL", price: 173.75, change: 1.25, changePercent: 0.72 },
    { symbol: "MSFT", price: 339.31, change: -2.83, changePercent: -0.83 },
    { symbol: "GOOGL", price: 153.92, change: 0.76, changePercent: 0.5 },
    { symbol: "AMZN", price: 142.45, change: -1.31, changePercent: -0.91 },
    { symbol: "META", price: 474.13, change: 8.67, changePercent: 1.86 }
  ]);
  
  const [position, setPosition] = useState(0);
  
  // In a real app, you would fetch real stock data from an API
  useEffect(() => {
    // Simulates movement of the ticker
    const tickerInterval = setInterval(() => {
      setPosition(prev => (prev - 1) % -2000); // Loop when reaching a certain negative value
    }, 30);
    
    // Update stock prices every 10 seconds
    const updateInterval = setInterval(() => {
      setStocks(prevStocks => {
        return prevStocks.map(stock => {
          // Generate random price change
          const change = Number((Math.random() * 10 - 5).toFixed(2));
          const newPrice = Number((stock.price + change).toFixed(2));
          const changePercent = Number(((change / stock.price) * 100).toFixed(2));
          
          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent
          };
        });
      });
    }, 10000);
    
    return () => {
      clearInterval(tickerInterval);
      clearInterval(updateInterval);
    };
  }, []);
  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2 overflow-hidden w-full">
      <div 
        className="flex items-center whitespace-nowrap"
        style={{ transform: `translateX(${position}px)` }}
      >
        {stocks.map((stock, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="font-bold mr-2">{stock.symbol}</span>
            <span className="mr-2">${stock.price}</span>
            <span 
              className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {stock.change > 0 && '+'}
              {stock.change} ({stock.changePercent > 0 && '+'}
              {stock.changePercent}%)
            </span>
          </div>
        ))}
        
        {/* Repeat the stocks for continuous scrolling */}
        {stocks.map((stock, index) => (
          <div key={`repeat-${index}`} className="flex items-center mx-6">
            <span className="font-bold mr-2">{stock.symbol}</span>
            <span className="mr-2">${stock.price}</span>
            <span 
              className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {stock.change > 0 && '+'}
              {stock.change} ({stock.changePercent > 0 && '+'}
              {stock.changePercent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;

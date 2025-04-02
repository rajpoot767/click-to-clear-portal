
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy';
  high: number;
  low: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({
    location: "New York",
    temperature: 72,
    condition: "partly-cloudy",
    high: 75,
    low: 65
  });
  
  // In a real app, you would fetch weather data from an API
  useEffect(() => {
    // Mock API call
    const fetchWeather = () => {
      // This would be replaced with an actual API call
      setTimeout(() => {
        const conditions: Array<'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy'> = [
          'sunny', 'cloudy', 'partly-cloudy', 'rainy'
        ];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = Math.floor(Math.random() * (95 - 60) + 60);
        
        setWeather({
          location: "New York",
          temperature: randomTemp,
          condition: randomCondition,
          high: randomTemp + Math.floor(Math.random() * 5),
          low: randomTemp - Math.floor(Math.random() * 10)
        });
      }, 1000);
    };
    
    fetchWeather();
  }, []);
  
  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'partly-cloudy':
        return <CloudSun className="h-8 w-8 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{weather.location}</h3>
            <div className="text-3xl font-bold">{weather.temperature}°F</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              H: {weather.high}° L: {weather.low}°
            </div>
          </div>
          <div>
            {getWeatherIcon()}
            <div className="text-sm text-center mt-1 capitalize">
              {weather.condition.replace('-', ' ')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;

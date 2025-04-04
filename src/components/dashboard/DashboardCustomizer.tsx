
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, Layout } from "lucide-react";

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  description: string;
}

const DashboardCustomizer = () => {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    { 
      id: "recent-activity", 
      title: "Recent Activity", 
      enabled: true,
      description: "Shows your recent reading activity"
    },
    { 
      id: "recommended", 
      title: "Recommended Articles", 
      enabled: true,
      description: "Personalized article recommendations based on your reading history"
    },
    { 
      id: "saved-searches", 
      title: "Saved Searches", 
      enabled: false,
      description: "Quick access to your saved search queries"
    },
    { 
      id: "trending", 
      title: "Trending Topics", 
      enabled: true,
      description: "See what topics are trending right now"
    },
    { 
      id: "reading-stats", 
      title: "Reading Statistics", 
      enabled: false,
      description: "View statistics about your reading habits"
    },
    { 
      id: "market-indicators", 
      title: "Market Indicators", 
      enabled: false, 
      description: "Track key market indicators and financial metrics"
    },
    { 
      id: "weather", 
      title: "Weather Updates", 
      enabled: false,
      description: "Local weather updates based on your location"
    }
  ]);

  const [layoutPreference, setLayoutPreference] = useState<"grid" | "list">("grid");

  const handleToggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const moveWidget = (id: string, direction: "up" | "down") => {
    const currentIndex = widgets.findIndex(widget => widget.id === id);
    if ((direction === "up" && currentIndex === 0) || 
        (direction === "down" && currentIndex === widgets.length - 1)) {
      return;
    }

    const newWidgets = [...widgets];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const widget = newWidgets[currentIndex];
    
    // Remove the widget from the current position
    newWidgets.splice(currentIndex, 1);
    // Insert it at the target position
    newWidgets.splice(targetIndex, 0, widget);
    
    setWidgets(newWidgets);
  };

  const savePreferences = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('dashboardWidgets', JSON.stringify({
      widgets,
      layoutPreference
    }));
    
    toast({
      title: "Dashboard preferences saved",
      description: "Your dashboard has been updated"
    });
  };

  const resetToDefaults = () => {
    setWidgets(prevWidgets => prevWidgets.map(widget => ({
      ...widget,
      enabled: ["recent-activity", "recommended", "trending"].includes(widget.id)
    })));
    
    setLayoutPreference("grid");
    
    toast({
      title: "Dashboard reset",
      description: "Your dashboard has been reset to default settings"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Your Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Select which widgets you want to display on your dashboard and arrange their order.</p>
        
        <div className="mb-6 border-b pb-4">
          <h3 className="font-medium mb-2">Layout Preferences</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="layout-grid"
                name="layout"
                value="grid"
                checked={layoutPreference === "grid"}
                onChange={() => setLayoutPreference("grid")}
                className="mr-2"
              />
              <label htmlFor="layout-grid" className="flex items-center">
                <Layout size={18} className="mr-1" /> Grid Layout
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="layout-list"
                name="layout"
                value="list"
                checked={layoutPreference === "list"}
                onChange={() => setLayoutPreference("list")}
                className="mr-2"
              />
              <label htmlFor="layout-list" className="flex items-center">
                <Layout size={18} className="mr-1" /> List Layout
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {widgets.map((widget, index) => (
            <div key={widget.id} className="flex items-start space-x-2 border p-3 rounded-md bg-gray-50 dark:bg-gray-800">
              <Checkbox 
                id={`widget-${widget.id}`}
                checked={widget.enabled}
                onCheckedChange={() => handleToggleWidget(widget.id)}
              />
              <div className="grid gap-1.5 flex-1">
                <Label htmlFor={`widget-${widget.id}`} className="font-medium">
                  {widget.title}
                </Label>
                <p className="text-sm text-gray-500">{widget.description}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => moveWidget(widget.id, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp size={14} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => moveWidget(widget.id, "down")}
                  disabled={index === widgets.length - 1}
                >
                  <ArrowDown size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex space-x-2">
          <Button onClick={savePreferences}>Save Preferences</Button>
          <Button variant="outline" onClick={resetToDefaults}>Reset to Defaults</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCustomizer;

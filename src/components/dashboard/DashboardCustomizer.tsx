
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    }
  ]);

  const handleToggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const savePreferences = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    
    toast({
      title: "Dashboard preferences saved",
      description: "Your dashboard has been updated"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Your Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Select which widgets you want to display on your dashboard.</p>
        
        <div className="space-y-4">
          {widgets.map(widget => (
            <div key={widget.id} className="flex items-start space-x-2">
              <Checkbox 
                id={`widget-${widget.id}`}
                checked={widget.enabled}
                onCheckedChange={() => handleToggleWidget(widget.id)}
              />
              <div className="grid gap-1.5">
                <Label htmlFor={`widget-${widget.id}`} className="font-medium">
                  {widget.title}
                </Label>
                <p className="text-sm text-gray-500">{widget.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button onClick={savePreferences}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCustomizer;

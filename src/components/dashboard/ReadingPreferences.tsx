
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const ReadingPreferences = () => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState("medium");
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState({
    business: true,
    technology: true,
    politics: false,
    science: false,
    health: true,
    entertainment: false,
  });

  const handleCategoryToggle = (category: string) => {
    setFavoriteCategories(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev]
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('readingPreferences', JSON.stringify({
      fontSize,
      darkMode,
      autoPlayAudio,
      favoriteCategories
    }));
    
    toast({
      title: "Preferences saved",
      description: "Your reading preferences have been updated"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Font Size Preference */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Font Size</h3>
            <RadioGroup value={fontSize} onValueChange={setFontSize}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large">Large</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Dark Mode Preference */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Display Mode</h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="dark-mode" 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </div>
          
          {/* Audio Autoplay */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Audio</h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-play" 
                checked={autoPlayAudio}
                onCheckedChange={setAutoPlayAudio}
              />
              <Label htmlFor="auto-play">Auto-play article audio</Label>
            </div>
          </div>
          
          {/* Favorite Categories */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Favorite Categories</h3>
            <p className="text-sm text-gray-500">Personalize your feed by selecting your interests</p>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              {Object.entries(favoriteCategories).map(([category, isSelected]) => (
                <div key={category} className="flex items-center space-x-2">
                  <Switch 
                    id={`category-${category}`} 
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={savePreferences}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingPreferences;

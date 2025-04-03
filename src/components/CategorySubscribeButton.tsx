
import React, { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";

interface CategorySubscribeButtonProps {
  category: string;
  className?: string;
}

const CategorySubscribeButton = ({ category, className }: CategorySubscribeButtonProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    
    if (!isSubscribed) {
      toast({
        title: `Subscribed to ${category}`,
        description: `You'll now receive notifications for ${category} updates.`,
        variant: "default",
      });
    } else {
      toast({
        title: `Unsubscribed from ${category}`,
        description: `You'll no longer receive ${category} notifications.`,
        variant: "default",
      });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSubscribe}
          className={`h-8 w-8 rounded-full ${className} ${
            isSubscribed ? "text-blue-500 bg-blue-100 dark:bg-blue-900/30" : ""
          }`}
        >
          {isSubscribed ? (
            <Bell className="h-4 w-4 fill-current" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 p-2 text-sm">
        {isSubscribed 
          ? `You're subscribed to ${category} notifications` 
          : `Subscribe to ${category} notifications`}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CategorySubscribeButton;

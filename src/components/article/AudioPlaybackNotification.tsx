
import React from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlaybackNotificationProps {
  isPlaying: boolean;
  toggleAudioPlayback: () => void;
}

const AudioPlaybackNotification = ({ 
  isPlaying, 
  toggleAudioPlayback 
}: AudioPlaybackNotificationProps) => {
  if (!isPlaying) return null;
  
  return (
    <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded mb-4">
      <Volume2 size={16} className="text-blue-600 animate-pulse" />
      <span className="text-sm">Now playing audio version</span>
      <Button size="sm" variant="ghost" onClick={toggleAudioPlayback}>Stop</Button>
    </div>
  );
};

export default AudioPlaybackNotification;


import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  article: any;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioPlayer = ({ article, isPlaying, setIsPlaying }: AudioPlayerProps) => {
  const { toast } = useToast();
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create an audio element for text-to-speech
    const audio = new Audio();
    setAudioElement(audio);
    
    return () => {
      // Clean up audio when component unmounts
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleAudioPlayback = () => {
    if (!audioElement || !article) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      // In a real application, you would use a proper TTS API
      // For this demo, we'll simulate audio playback
      if (!audioElement.src) {
        // This would normally be a request to a TTS API
        // For demo purposes, let's just set a dummy audio source
        const msg = new SpeechSynthesisUtterance();
        msg.text = article.title + ". " + article.description;
        window.speechSynthesis.speak(msg);
      } else {
        audioElement.play();
      }
      setIsPlaying(true);
      
      toast({
        title: "Audio playback started",
        description: "Listening to article audio version"
      });
    }
  };

  return { toggleAudioPlayback };
};

export default AudioPlayer;

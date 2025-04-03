
import React from "react";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleRating from "@/components/ArticleRating";
import AudioPlaybackNotification from "@/components/article/AudioPlaybackNotification";

interface ArticleContentProps {
  article: any;
  isPlaying: boolean;
  toggleAudioPlayback: () => void;
}

const ArticleContent = ({ 
  article, 
  isPlaying, 
  toggleAudioPlayback 
}: ArticleContentProps) => {
  return (
    <div className="p-6 pt-0">
      <AudioPlaybackNotification 
        isPlaying={isPlaying}
        toggleAudioPlayback={toggleAudioPlayback}
      />
      
      <SocialShareButtons url={window.location.href} title={article.title} />
      
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-xl font-medium mb-6">{article.description}</p>
        
        {article.content.split('\n\n').map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <ArticleRating articleId={article.id} />
    </div>
  );
};

export default ArticleContent;

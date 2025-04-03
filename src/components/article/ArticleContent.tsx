
import React from "react";
import { Link } from "react-router-dom";
import SocialShareButtons from "@/components/SocialShareButtons";
import AudioPlaybackNotification from "@/components/article/AudioPlaybackNotification";

interface ArticleContentProps {
  article: any;
  imageUrl: string;
  isPlaying?: boolean;
  toggleAudioPlayback?: () => void;
}

const ArticleContent = ({ article, imageUrl, isPlaying, toggleAudioPlayback }: ArticleContentProps) => {
  return (
    <div>
      {isPlaying !== undefined && toggleAudioPlayback && (
        <AudioPlaybackNotification 
          isPlaying={isPlaying} 
          toggleAudioPlayback={toggleAudioPlayback} 
        />
      )}
      
      <SocialShareButtons 
        url={window.location.href} 
        title={article.title} 
      />
      
      {/* Featured image */}
      <div className="mb-6">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-auto rounded-lg" 
        />
      </div>
      
      {/* Article content */}
      <div className="prose max-w-none mb-8">
        <p className="text-xl font-medium mb-6">{article.description}</p>
        
        {article.content ? (
          <div className="space-y-4">
            <p>{article.content}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, libero ut tempor varius, neque sapien congue dui, non semper diam enim eu sem. Maecenas aliquam, velit et bibendum laoreet, lorem nisl dictum tellus, at tempus nisi sem vel tortor. Donec vitae risus a ante ultrices finibus. Sed efficitur magna vitae libero congue, vel commodo urna ullamcorper.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec venenatis erat vel ex tincidunt, at convallis justo elementum. Suspendisse potenti. Duis mattis ligula vel urna rutrum, eget tempus mi feugiat. Integer finibus justo nec diam consequat, vel lacinia eros dictum.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, libero ut tempor varius, neque sapien congue dui, non semper diam enim eu sem. Maecenas aliquam, velit et bibendum laoreet, lorem nisl dictum tellus, at tempus nisi sem vel tortor. Donec vitae risus a ante ultrices finibus. Sed efficitur magna vitae libero congue, vel commodo urna ullamcorper.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec venenatis erat vel ex tincidunt, at convallis justo elementum. Suspendisse potenti. Duis mattis ligula vel urna rutrum, eget tempus mi feugiat. Integer finibus justo nec diam consequat, vel lacinia eros dictum.
            </p>
            <p>
              Proin fringilla massa in urna vestibulum, at rutrum nulla interdum. Quisque suscipit, ligula id volutpat vehicula, nisi orci convallis justo, ut consequat turpis erat id magna. Integer consequat dignissim ex, id tempus magna sodales sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
        )}
      </div>
      
      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag: string, index: number) => (
            <Link 
              key={index} 
              to={`/tag/${tag.replace(/\s+/g, '-').toLowerCase()}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleContent;

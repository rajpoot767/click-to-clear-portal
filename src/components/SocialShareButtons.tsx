
import React from "react";
import { Button } from "@/components/ui/button";
import { Share, Twitter, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard"
      });
    });
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-sm text-gray-500 flex items-center">
        <Share size={16} className="mr-1" /> Share:
      </span>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full p-0 w-8 h-8" 
        asChild
      >
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </a>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full p-0 w-8 h-8"
        asChild
      >
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </a>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full p-0 w-8 h-8"
        asChild
      >
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </a>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full p-0 w-8 h-8"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <LinkIcon size={16} />
      </Button>
    </div>
  );
};

export default SocialShareButtons;

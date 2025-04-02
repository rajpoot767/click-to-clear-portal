
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Share2, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/contexts/BookmarkContext";
import ArticleRating from "@/components/ArticleRating";
import SocialShareButtons from "@/components/SocialShareButtons";
import WeatherWidget from "@/components/WeatherWidget";
import StockTicker from "@/components/StockTicker";

const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Mock data for the selected news article
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch the article data based on the ID
    // For this demo, we'll create mock data
    const fetchArticle = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockArticle = {
          id: id,
          title: "Talison's revenue, profit tumbles in lithium landslide",
          description: "Greenbushes may have clung on to an annual profit at $72m, but a slashed spodumene market led to a sharp downturn in mine operator Talison's latest financials.",
          imageUrl: "https://picsum.photos/800/450",
          category: "Mining",
          author: "Jane Smith",
          date: new Date().toLocaleDateString(),
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, libero ut tempor varius, neque sapien congue dui, non semper diam enim eu sem. Maecenas aliquam, velit et bibendum laoreet, lorem nisl dictum tellus, at tempus nisi sem vel tortor. Donec vitae risus a ante ultrices finibus. Sed efficitur magna vitae libero congue, vel commodo urna ullamcorper.

          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec venenatis erat vel ex tincidunt, at convallis justo elementum. Suspendisse potenti. Duis mattis ligula vel urna rutrum, eget tempus mi feugiat. Integer finibus justo nec diam consequat, vel lacinia eros dictum.
          
          Proin fringilla massa in urna vestibulum, at rutrum nulla interdum. Quisque suscipit, ligula id volutpat vehicula, nisi orci convallis justo, ut consequat turpis erat id magna. Integer consequat dignissim ex, id tempus magna sodales sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
          views: 1205,
          relatedArticles: [
            {
              id: "1",
              title: "Mining industry faces new challenges in 2023",
              imageUrl: "https://picsum.photos/800/451"
            },
            {
              id: "2",
              title: "Lithium prices expected to recover by Q4",
              imageUrl: "https://picsum.photos/800/452"
            },
            {
              id: "3",
              title: "Sustainable mining practices gain traction",
              imageUrl: "https://picsum.photos/800/453"
            }
          ]
        };
        
        setArticle(mockArticle);
        setLoading(false);
      }, 500);
    };
    
    fetchArticle();
    
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
  }, [id]);

  const handleBookmark = () => {
    if (!article) return;
    
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks"
      });
    } else {
      addBookmark({
        id: article.id,
        title: article.title,
        imageUrl: article.imageUrl,
        category: article.category
      });
      toast({
        title: "Article bookmarked",
        description: "You can find this article in your bookmarks"
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "Share this article with your network"
      });
    });
  };
  
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Homepage</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StockTicker />
      
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-1" />
        Go Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Card className="overflow-hidden border-gray-200 dark:border-gray-700">
            <div className="relative">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase rounded">
                  {article.category}
                </span>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleBookmark}
                    className={isBookmarked(article.id) ? "text-blue-600" : ""}
                  >
                    <Bookmark size={18} className={isBookmarked(article.id) ? "fill-blue-600" : ""} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 size={18} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={toggleAudioPlayback}>
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </Button>
                </div>
              </div>
              
              <div className="mb-4 text-gray-600 dark:text-gray-400">
                <span>By {article.author}</span>
                <span className="mx-2">•</span>
                <span>{article.date}</span>
              </div>
              
              {isPlaying && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded mb-4">
                  <Volume2 size={16} className="text-blue-600 animate-pulse" />
                  <span className="text-sm">Now playing audio version</span>
                  <Button size="sm" variant="ghost" onClick={toggleAudioPlayback}>Stop</Button>
                </div>
              )}
              
              <SocialShareButtons url={window.location.href} title={article.title} />
              
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-xl font-medium mb-6">{article.description}</p>
                
                {article.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <ArticleRating articleId={article.id} />
              
              {article.relatedArticles && article.relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {article.relatedArticles.map((related: any, index: number) => (
                      <Link to={`/news/${related.id}`} key={index}>
                        <div className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={related.imageUrl} 
                              alt={related.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {related.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <WeatherWidget />
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">Popular Articles</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="group">
                    <Link to={`/news/${i}`} className="text-sm font-medium group-hover:text-blue-600">
                      {i === 1 ? "Global market trends show recovery signs" : 
                       i === 2 ? "New regulations impact tech industry" :
                       i === 3 ? "Renewable energy investments surge" :
                       i === 4 ? "Healthcare innovation leads to breakthrough" :
                       "Financial experts predict interest rate changes"}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                      {(2000 - (i * 300)).toLocaleString()} views
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Mining", "Economy", "Business", "Finance", "Technology", "Energy", "Innovation"].map((tag) => (
                  <Link 
                    key={tag}
                    to={`/category/${tag.toLowerCase()}`}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;

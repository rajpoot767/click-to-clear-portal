import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useBookmarks } from "@/contexts/BookmarkContext";

// Imported components
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import RelatedArticles from "@/components/article/RelatedArticles";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import ArticlePoll from "@/components/article/ArticlePoll";
import ArticleSurvey from "@/components/article/ArticleSurvey";
import TableOfContents from "@/components/article/TableOfContents";
import ArticleLoadingState from "@/components/article/ArticleLoadingState";
import ArticlePageLayout from "@/components/article/ArticlePageLayout";
import ArticleActions from "@/components/article/ArticleActions";
import AudioPlayer from "@/components/article/AudioPlayer";

const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Article data state
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Custom hook for audio functionality
  const { toggleAudioPlayback } = AudioPlayer({ 
    article,
    isPlaying,
    setIsPlaying
  });

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
          hasPoll: true,
          hasSurvey: true,
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
  }, [id]);

  const handleBookmark = () => {
    if (!article) return;
    
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark({
        id: article.id,
        title: article.title,
        imageUrl: article.imageUrl,
        category: article.category
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Show loading or error state
  if (loading || !article) {
    return <ArticleLoadingState isLoading={loading} hasError={!loading && !article} />;
  }

  return (
    <ArticlePageLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Card className="overflow-hidden border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <ArticleHeader 
                article={article}
                category={article.category}
                isPlaying={isPlaying}
                isBookmarked={isBookmarked}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
                toggleAudioPlayback={toggleAudioPlayback}
              />
              
              <ArticleActions article={article} />
              
              <ArticleContent 
                article={article}
                imageUrl={article.imageUrl}
                isPlaying={isPlaying}
                toggleAudioPlayback={toggleAudioPlayback}
              />
            </div>
            
            {article.hasPoll && (
              <div className="px-6">
                <ArticlePoll 
                  id={`poll-${article.id}`}
                  question="What's your opinion on the future of lithium prices?"
                  options={[
                    { id: "option1", text: "Will continue to fall", votes: 45 },
                    { id: "option2", text: "Will stabilize soon", votes: 78 },
                    { id: "option3", text: "Will rise by end of year", votes: 62 },
                    { id: "option4", text: "Uncertain", votes: 23 }
                  ]}
                  totalVotes={208}
                />
              </div>
            )}
            
            {article.hasSurvey && (
              <div className="px-6 pb-6">
                <ArticleSurvey 
                  id={`survey-${article.id}`}
                  title="Mining Industry Trends Survey"
                  description="Help us understand your perspective on the mining industry"
                  questions={[
                    {
                      id: "q1",
                      question: "How confident are you in the mining sector's growth over the next year?",
                      type: "radio",
                      options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not at all confident"],
                      required: true
                    },
                    {
                      id: "q2",
                      question: "Which factors do you believe will most impact lithium prices? (Select all that apply)",
                      type: "checkbox",
                      options: ["EV demand", "Government policies", "New mining technologies", "Alternative battery technologies", "Global economic conditions"],
                      required: true
                    },
                    {
                      id: "q3",
                      question: "What other mining-related topics would you like to see covered?",
                      type: "text",
                      required: false
                    }
                  ]}
                />
              </div>
            )}
            
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <RelatedArticles articles={article.relatedArticles} />
            )}
          </Card>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <TableOfContents content={article.content} />
          <ArticleSidebar />
        </div>
      </div>
    </ArticlePageLayout>
  );
};

export default NewsArticlePage;

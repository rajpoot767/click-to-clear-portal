
import React from "react";
import NewsCard from "@/components/NewsCard";

const Index = () => {
  // Mock data for news articles based on the BusinessNews website
  const newsArticles = [
    {
      title: "Talison's revenue, profit tumbles in lithium landslide",
      description: "Greenbushes may have clung on to an annual profit at $72m, but a slashed spodumene market led to a sharp downturn in mine operator Talison's latest financials.",
      imageUrl: "https://picsum.photos/800/450",
      category: "Mining",
      url: "/1",
      hoursAgo: 39
    },
    {
      title: "Hames Sharley cuts out lack of investment in Perth",
      description: "The property developer says the state government should put more emphasis on the city, and has criticised a lack of investment in Perth's main train station.",
      imageUrl: "https://picsum.photos/800/451",
      category: "Property",
      url: "/2",
      hoursAgo: 4
    },
    {
      title: "At Close of Business podcast March 31 2023",
      description: "Liv Declerck and Isabel Vieira discuss a Perth film studio's foray into virtual reality documentary making.",
      imageUrl: "https://picsum.photos/800/452",
      category: "Podcasts",
      url: "/3",
      hoursAgo: 5
    },
    {
      title: "Scyne Advisory partners to start at FTI",
      description: "Consulting firm FTI is set for a boost this week with the signing of partners that left Scyne Advisory last year commence at their new employer.",
      imageUrl: "https://picsum.photos/800/453",
      category: "Professions",
      url: "/4",
      hoursAgo: 6
    },
    {
      title: "Austerity budget With public sector cuts",
      description: "The state government has announced significant cuts to public sector spending in its latest budget.",
      imageUrl: "https://picsum.photos/800/454",
      category: "Government",
      url: "/5",
      hoursAgo: 6
    },
    {
      title: "Share market traffic and business news",
      description: "Markets took a downturn today with major indexes showing significant losses across multiple sectors.",
      imageUrl: "https://picsum.photos/800/455",
      category: "News",
      url: "/6",
      hoursAgo: 7
    },
    {
      title: "Neighborhood centers boom in Perth",
      description: "Local shopping centers and community hubs are seeing increased investment and foot traffic across Perth suburbs.",
      imageUrl: "https://picsum.photos/800/456",
      category: "Property",
      url: "/7",
      hoursAgo: 8
    },
    {
      title: "EPA aims to lower carbon footprint",
      description: "New guidelines have been issued by the Environmental Protection Agency targeting industrial emissions.",
      imageUrl: "https://picsum.photos/800/457",
      category: "Government",
      url: "/8",
      hoursAgo: 9
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Latest Headlines</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsArticles.map((article, index) => (
            <NewsCard 
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              category={article.category}
              url={article.url}
              hoursAgo={article.hoursAgo}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

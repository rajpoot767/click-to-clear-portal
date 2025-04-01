
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";

interface CategoryNewsArticle {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  url: string;
  hoursAgo: number;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  // Mock data for each category
  const categoryNewsMap: Record<string, CategoryNewsArticle[]> = {
    business: [
      {
        title: "New Business Regulations Impact Local Startups",
        description: "Recent changes to business regulations are creating both challenges and opportunities for startups in the region.",
        imageUrl: "https://picsum.photos/800/451",
        category: "Business",
        url: "/",
        hoursAgo: 3
      },
      {
        title: "Major Merger Announced Between Tech Giants",
        description: "Two of the largest tech companies announce plans to merge, reshaping the competitive landscape.",
        imageUrl: "https://picsum.photos/800/452",
        category: "Business",
        url: "/",
        hoursAgo: 5
      },
      {
        title: "Small Business Grants Program Launches",
        description: "Government introduces new grants program aimed at supporting small businesses affected by economic downturn.",
        imageUrl: "https://picsum.photos/800/453",
        category: "Business",
        url: "/",
        hoursAgo: 7
      },
      {
        title: "Retail Sales Surge in Unexpected Recovery",
        description: "Retail sector shows signs of strong recovery as consumer confidence returns to pre-pandemic levels.",
        imageUrl: "https://picsum.photos/800/454",
        category: "Business",
        url: "/",
        hoursAgo: 12
      }
    ],
    finance: [
      {
        title: "ASX Reaches All-Time High Despite Global Uncertainty",
        description: "Australian markets continue to outperform global expectations with record gains this quarter.",
        imageUrl: "https://picsum.photos/800/455",
        category: "Finance",
        url: "/",
        hoursAgo: 2
      },
      {
        title: "RBA Holds Interest Rates Steady",
        description: "Reserve Bank announces decision to maintain current interest rates citing stable economic indicators.",
        imageUrl: "https://picsum.photos/800/456",
        category: "Finance",
        url: "/",
        hoursAgo: 6
      },
      {
        title: "Superannuation Reforms to Impact Millions",
        description: "New superannuation legislation will change how Australians manage their retirement savings starting next year.",
        imageUrl: "https://picsum.photos/800/457",
        category: "Finance",
        url: "/",
        hoursAgo: 8
      },
      {
        title: "Banking Royal Commission: One Year Later",
        description: "Analysis of changes in the banking sector one year after implementation of Royal Commission recommendations.",
        imageUrl: "https://picsum.photos/800/458",
        category: "Finance",
        url: "/",
        hoursAgo: 10
      }
    ],
    technology: [
      {
        title: "AI Breakthrough Promises Healthcare Revolution",
        description: "New artificial intelligence systems show unprecedented accuracy in diagnosing medical conditions from imaging data.",
        imageUrl: "https://picsum.photos/800/459",
        category: "Technology",
        url: "/",
        hoursAgo: 4
      },
      {
        title: "Local Tech Startup Secures $50M Funding",
        description: "Perth-based startup announces successful Series B funding round to expand their innovative cloud services.",
        imageUrl: "https://picsum.photos/800/460",
        category: "Technology",
        url: "/",
        hoursAgo: 7
      },
      {
        title: "5G Rollout Accelerates Across Regional Areas",
        description: "Telecommunications companies announce faster timeline for 5G infrastructure deployment in regional communities.",
        imageUrl: "https://picsum.photos/800/461",
        category: "Technology",
        url: "/",
        hoursAgo: 9
      },
      {
        title: "Cybersecurity Concerns Rise as Remote Work Continues",
        description: "Experts warn of increasing cyber threats targeting remote workers as flexible work arrangements become permanent.",
        imageUrl: "https://picsum.photos/800/462",
        category: "Technology",
        url: "/",
        hoursAgo: 11
      }
    ],
    property: [
      {
        title: "Housing Market Shows Signs of Cooling After Record Boom",
        description: "After months of unprecedented growth, property market analysts note early indicators of price stabilization.",
        imageUrl: "https://picsum.photos/800/463",
        category: "Property",
        url: "/",
        hoursAgo: 3
      },
      {
        title: "New Development Transforms Former Industrial Zone",
        description: "Major urban renewal project converts abandoned industrial area into mixed-use residential and commercial space.",
        imageUrl: "https://picsum.photos/800/464",
        category: "Property",
        url: "/",
        hoursAgo: 5
      },
      {
        title: "Commercial Property Sector Adapts to Changing Work Patterns",
        description: "Office space designers and commercial property managers pivot to accommodate hybrid work models.",
        imageUrl: "https://picsum.photos/800/465",
        category: "Property",
        url: "/",
        hoursAgo: 8
      },
      {
        title: "Rental Crisis Deepens in Metropolitan Areas",
        description: "Vacancy rates hit historic lows as rental demand outpaces available properties in major cities.",
        imageUrl: "https://picsum.photos/800/466",
        category: "Property",
        url: "/",
        hoursAgo: 12
      }
    ],
    mining: [
      {
        title: "New Lithium Discovery Could Transform Battery Production",
        description: "Significant lithium deposit found in Western Australia promises to boost global supply for electric vehicle batteries.",
        imageUrl: "https://picsum.photos/800/467",
        category: "Mining",
        url: "/",
        hoursAgo: 2
      },
      {
        title: "Mining Companies Commit to Net-Zero Emissions",
        description: "Major mining corporations announce ambitious plans to achieve carbon neutrality by 2040.",
        imageUrl: "https://picsum.photos/800/468",
        category: "Mining",
        url: "/",
        hoursAgo: 6
      },
      {
        title: "Iron Ore Prices Stabilize After Volatile Quarter",
        description: "After significant fluctuations, iron ore market shows signs of stabilization as global demand patterns clarify.",
        imageUrl: "https://picsum.photos/800/469",
        category: "Mining",
        url: "/",
        hoursAgo: 9
      },
      {
        title: "Innovation in Mining Technology Reduces Environmental Impact",
        description: "New extraction techniques reduce water usage and minimize land disturbance while maintaining productivity.",
        imageUrl: "https://picsum.photos/800/470",
        category: "Mining",
        url: "/",
        hoursAgo: 14
      }
    ],
    energy: [
      {
        title: "Renewable Energy Projects Attract Record Investment",
        description: "Solar and wind developments see unprecedented funding as investors shift focus to sustainable energy solutions.",
        imageUrl: "https://picsum.photos/800/471",
        category: "Energy",
        url: "/",
        hoursAgo: 3
      },
      {
        title: "Hydrogen Hub Development Accelerates",
        description: "Plans for major hydrogen production and distribution center receive government backing and industry support.",
        imageUrl: "https://picsum.photos/800/472",
        category: "Energy",
        url: "/",
        hoursAgo: 7
      },
      {
        title: "Grid Stability Innovations Address Renewable Integration",
        description: "New technologies help manage electricity grid fluctuations as renewable energy share continues to grow.",
        imageUrl: "https://picsum.photos/800/473",
        category: "Energy",
        url: "/",
        hoursAgo: 10
      },
      {
        title: "Energy Prices Expected to Decrease as New Capacity Comes Online",
        description: "Analysts predict consumer energy costs will fall as major infrastructure projects reach completion.",
        imageUrl: "https://picsum.photos/800/474",
        category: "Energy",
        url: "/",
        hoursAgo: 15
      }
    ],
    agriculture: [
      {
        title: "Record Harvest Predicted Despite Challenging Conditions",
        description: "Farmers anticipate exceptional yields thanks to new crop varieties resilient to changing climate patterns.",
        imageUrl: "https://picsum.photos/800/475",
        category: "Agriculture",
        url: "/",
        hoursAgo: 4
      },
      {
        title: "Agricultural Technology Investment Grows 40% Year-on-Year",
        description: "Agtech startups and innovation hubs attract significant funding to address sustainability and productivity challenges.",
        imageUrl: "https://picsum.photos/800/476",
        category: "Agriculture",
        url: "/",
        hoursAgo: 8
      },
      {
        title: "New Trade Agreement Opens Markets for Local Producers",
        description: "Recently negotiated trade deal provides agricultural exporters with improved access to emerging Asian markets.",
        imageUrl: "https://picsum.photos/800/477",
        category: "Agriculture",
        url: "/",
        hoursAgo: 11
      },
      {
        title: "Sustainable Farming Practices Show Economic Benefits",
        description: "Research demonstrates long-term profitability improvements for farms adopting regenerative agriculture techniques.",
        imageUrl: "https://picsum.photos/800/478",
        category: "Agriculture",
        url: "/",
        hoursAgo: 16
      }
    ],
    tourism: [
      {
        title: "Tourism Recovery Exceeds Expectations as International Visitors Return",
        description: "Visitor numbers surpass forecasts as international tourism rebounds faster than anticipated.",
        imageUrl: "https://picsum.photos/800/479",
        category: "Tourism",
        url: "/",
        hoursAgo: 5
      },
      {
        title: "New Tourism Campaign Highlights Regional Destinations",
        description: "Major marketing initiative aims to drive visitors to less-explored regions with emphasis on unique local experiences.",
        imageUrl: "https://picsum.photos/800/480",
        category: "Tourism",
        url: "/",
        hoursAgo: 9
      },
      {
        title: "Eco-Tourism Ventures Set New Sustainability Standards",
        description: "Innovative tour operators establish best practices for environmentally responsible tourism experiences.",
        imageUrl: "https://picsum.photos/800/481",
        category: "Tourism",
        url: "/",
        hoursAgo: 13
      },
      {
        title: "Hospitality Sector Faces Staffing Challenges Amid Tourism Boom",
        description: "Hotels and restaurants struggle to recruit enough workers to meet increasing demand from visitors.",
        imageUrl: "https://picsum.photos/800/482",
        category: "Tourism",
        url: "/",
        hoursAgo: 18
      }
    ],
    health: [
      {
        title: "Breakthrough Research Could Transform Cancer Treatment",
        description: "Local researchers announce promising results in clinical trials for targeted cancer therapy.",
        imageUrl: "https://picsum.photos/800/483",
        category: "Health",
        url: "/",
        hoursAgo: 4
      },
      {
        title: "Healthcare Transformation Prioritizes Preventative Care",
        description: "New healthcare initiatives focus on prevention strategies to reduce chronic disease burden and costs.",
        imageUrl: "https://picsum.photos/800/484",
        category: "Health",
        url: "/",
        hoursAgo: 7
      },
      {
        title: "Mental Health Services Expand in Regional Areas",
        description: "Government-funded program improves access to mental health support in underserved communities.",
        imageUrl: "https://picsum.photos/800/485",
        category: "Health",
        url: "/",
        hoursAgo: 11
      },
      {
        title: "Digital Health Platforms See Record Adoption Rates",
        description: "Patients and healthcare providers increasingly embrace telehealth and digital health management tools.",
        imageUrl: "https://picsum.photos/800/486",
        category: "Health",
        url: "/",
        hoursAgo: 15
      }
    ],
    education: [
      {
        title: "Universities Report Surge in Technology-Focused Enrollments",
        description: "Computer science, data analytics, and AI programs see unprecedented student interest as job markets evolve.",
        imageUrl: "https://picsum.photos/800/487",
        category: "Education",
        url: "/",
        hoursAgo: 3
      },
      {
        title: "Education Reform Focuses on Future-Ready Skills",
        description: "Curriculum updates emphasize critical thinking, digital literacy, and adaptability for changing workforce needs.",
        imageUrl: "https://picsum.photos/800/488",
        category: "Education",
        url: "/",
        hoursAgo: 6
      },
      {
        title: "Online Learning Platforms Partner with Traditional Institutions",
        description: "Major universities announce collaborations with digital education providers to expand course offerings.",
        imageUrl: "https://picsum.photos/800/489",
        category: "Education",
        url: "/",
        hoursAgo: 9
      },
      {
        title: "Research Funding Boost for STEM Education Initiatives",
        description: "Government announces significant investment in science, technology, engineering, and mathematics education programs.",
        imageUrl: "https://picsum.photos/800/490",
        category: "Education",
        url: "/",
        hoursAgo: 14
      }
    ],
    politics: [
      {
        title: "Parliamentary Committee Recommends Regulatory Overhaul",
        description: "Cross-party committee releases recommendations for streamlining business regulations to boost economic growth.",
        imageUrl: "https://picsum.photos/800/491",
        category: "Politics",
        url: "/",
        hoursAgo: 2
      },
      {
        title: "Election Campaign Focuses on Economic Management",
        description: "Major parties outline contrasting visions for economic recovery and growth as election approaches.",
        imageUrl: "https://picsum.photos/800/492",
        category: "Politics",
        url: "/",
        hoursAgo: 5
      },
      {
        title: "New Legislation Aims to Boost Local Manufacturing",
        description: "Government introduces bill with incentives to strengthen domestic manufacturing capabilities and supply chains.",
        imageUrl: "https://picsum.photos/800/493",
        category: "Politics",
        url: "/",
        hoursAgo: 8
      },
      {
        title: "International Relations Shift as Trade Priorities Evolve",
        description: "Foreign policy experts analyze changing international alliances driven by evolving economic interests.",
        imageUrl: "https://picsum.photos/800/494",
        category: "Politics",
        url: "/",
        hoursAgo: 12
      }
    ],
    sports: [
      {
        title: "Local Team Secures Major Sponsorship Deal",
        description: "Professional sports organization announces record-breaking corporate partnership ahead of new season.",
        imageUrl: "https://picsum.photos/800/495",
        category: "Sports",
        url: "/",
        hoursAgo: 3
      },
      {
        title: "Sports Technology Investment Creates New Career Pathways",
        description: "Growing industry around sports analytics and performance technology creates job opportunities for tech professionals.",
        imageUrl: "https://picsum.photos/800/496",
        category: "Sports",
        url: "/",
        hoursAgo: 7
      },
      {
        title: "Stadium Redevelopment Project Boosts Local Economy",
        description: "Construction of new sporting venue generates jobs and economic activity in surrounding business district.",
        imageUrl: "https://picsum.photos/800/497",
        category: "Sports",
        url: "/",
        hoursAgo: 10
      },
      {
        title: "Athlete Endorsements Reshape Brand Marketing Strategies",
        description: "Companies increasingly partner with sports personalities to reach audiences through authentic brand connections.",
        imageUrl: "https://picsum.photos/800/498",
        category: "Sports",
        url: "/",
        hoursAgo: 15
      }
    ],
  };

  // Get news articles for the selected category (lowercase for matching)
  const categoryKey = category?.toLowerCase() || "";
  const newsArticles = categoryNewsMap[categoryKey] || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {category || "Category"} News
        </h1>
        
        {newsArticles.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No articles found</h2>
            <p className="mt-2 text-gray-500">
              There are currently no articles in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;

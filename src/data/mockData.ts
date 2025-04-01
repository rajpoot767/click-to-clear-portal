
export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  category: string;
  author?: string;
  date?: string;
  hoursAgo?: number;
  views?: number;
  featured?: boolean;
  tags?: string[];
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Global Markets Rally as Inflation Concerns Ease",
    description: "Stock markets across the globe saw significant gains as new data suggests inflation pressures are moderating.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Finance",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    views: 4250,
    featured: true,
    tags: ["markets", "inflation", "stocks"]
  },
  {
    id: "2",
    title: "Tech Startup Secures $50M in Series B Funding",
    description: "A promising AI-driven healthcare startup has secured major funding to expand its operations globally.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Technology",
    author: "Michael Chen",
    hoursAgo: 5,
    views: 1892,
    tags: ["startups", "funding", "ai"]
  },
  {
    id: "3",
    title: "New Residential Development Breaks Ground in City Center",
    description: "A major new mixed-use development project has begun construction in the heart of downtown.",
    imageUrl: "https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Property",
    author: "Emma Williams",
    hoursAgo: 8,
    views: 750,
    tags: ["real estate", "development", "urban planning"]
  },
  {
    id: "4",
    title: "Mining Company Discovers Significant Gold Deposits",
    description: "Exploration efforts have revealed new gold reserves estimated to be worth over $2 billion.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1605286111427-2c37219dd4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Mining",
    author: "Robert Davies",
    date: "May 10, 2023",
    views: 3210,
    tags: ["mining", "gold", "resources"]
  },
  {
    id: "5",
    title: "Renewable Energy Investments Reach Record High",
    description: "Global investments in renewable energy projects have surpassed $500 billion for the first time.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Energy",
    author: "Lisa Patel",
    hoursAgo: 24,
    views: 2100,
    featured: true,
    tags: ["renewable energy", "investment", "sustainability"]
  },
  {
    id: "6",
    title: "Agricultural Innovation Boosts Crop Yields",
    description: "New farming techniques and technology are helping farmers produce more with fewer resources.",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Agriculture",
    author: "John Miller",
    date: "May 8, 2023",
    views: 1250,
    tags: ["agriculture", "innovation", "sustainability"]
  },
  {
    id: "7",
    title: "Tourism Industry Rebounds with Strong Summer Bookings",
    description: "Travel companies report surge in reservations as international travel restrictions ease.",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Tourism",
    author: "Maria Garcia",
    hoursAgo: 36,
    views: 1890,
    tags: ["tourism", "travel", "recovery"]
  },
  {
    id: "8",
    title: "Healthcare Startup Introduces Revolutionary Telemedicine Platform",
    description: "A new platform aims to transform how patients connect with doctors and specialists remotely.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Health",
    author: "David Kim",
    date: "May 5, 2023",
    views: 2750,
    tags: ["healthcare", "technology", "telemedicine"]
  },
  {
    id: "9",
    title: "Education Tech Company Expands Free Resources for Schools",
    description: "A leading education technology provider is making premium digital learning tools available to underserved schools.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Education",
    author: "Michelle Thompson",
    hoursAgo: 48,
    views: 1320,
    tags: ["education", "technology", "accessibility"]
  },
  {
    id: "10",
    title: "Government Announces New Infrastructure Investment Plan",
    description: "A $1.2 trillion plan aims to modernize transportation, utilities, and digital infrastructure nationwide.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Politics",
    author: "Thomas Wright",
    date: "May 2, 2023",
    views: 4100,
    featured: true,
    tags: ["infrastructure", "government", "investment"]
  },
  {
    id: "11",
    title: "Major Sports League Announces Expansion Teams",
    description: "Two new franchises will join the league in the 2024 season, bringing the total to 32 teams.",
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Sports",
    author: "James Wilson",
    hoursAgo: 12,
    views: 3560,
    tags: ["sports", "expansion", "franchises"]
  },
  {
    id: "12",
    title: "Commercial Real Estate Market Shows Signs of Recovery",
    description: "Office and retail spaces are seeing increased leasing activity as businesses adapt to new work models.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget fermentum nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Commercial",
    author: "Nicole Adams",
    date: "April 30, 2023",
    views: 1780,
    tags: ["commercial real estate", "leasing", "recovery"]
  }
];

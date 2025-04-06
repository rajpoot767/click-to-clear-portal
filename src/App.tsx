
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import EnhancedNavbar from "./components/EnhancedNavbar";
import ScrollToTop from "./components/ScrollToTop";
import ReadingProgressBar from "./components/ReadingProgressBar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import NewsArticlePage from "./pages/NewsArticlePage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import DataInsights from "./pages/DataInsights";
import BreakingNewsBanner from "./components/BreakingNewsBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="news-theme">
      <BookmarkProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <ReadingProgressBar />
              <EnhancedNavbar />
              <BreakingNewsBanner />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/article/:id" element={<ArticlePage />} />
                  <Route path="/news/:id" element={<NewsArticlePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/data-insights" element={<DataInsights />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </BookmarkProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

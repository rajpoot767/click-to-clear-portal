
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { mockArticles } from "@/data/mockData";

interface SearchModalProps {
  trigger: React.ReactNode;
}

const SearchModal = ({ trigger }: SearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter articles based on search query
  const filteredArticles = searchQuery.length > 0
    ? mockArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input 
            className="pl-10 pr-4 py-2"
            placeholder="Search news, companies, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        {searchQuery.length > 0 && (
          <>
            <div className="text-sm text-gray-500 mt-4">
              {filteredArticles.length} results found
            </div>
            <div className="mt-2">
              {filteredArticles.map((article, index) => (
                <Link 
                  key={index}
                  to={`/article/${article.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 hover:bg-gray-100 rounded mb-1"
                >
                  <div className="flex items-start">
                    {article.imageUrl && (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-16 h-12 object-cover mr-3" 
                      />
                    )}
                    <div>
                      <div className="font-semibold">{article.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">
                        {article.description}
                      </div>
                      <div className="text-xs text-blue-600 uppercase mt-1">
                        {article.category}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

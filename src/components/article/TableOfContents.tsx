
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  // Generate headings from content
  useEffect(() => {
    // In a real implementation, we would parse the actual DOM headings.
    // For this demo, we'll create mock headings based on paragraphs
    const paragraphs = content.split('\n\n');
    const mockedHeadings = paragraphs.slice(0, 5).map((p, index) => {
      const text = p.substring(0, 30).trim() + (p.length > 30 ? '...' : '');
      return {
        id: `heading-${index}`,
        text: text,
        level: index === 0 ? 1 : 2
      };
    });
    
    setHeadings(mockedHeadings);
    
    // Create actual heading elements in the DOM for scroll targets
    mockedHeadings.forEach(heading => {
      // Check if element already exists
      if (!document.getElementById(heading.id)) {
        const existingParagraphs = document.querySelectorAll('.prose p');
        if (existingParagraphs[heading.level]) {
          existingParagraphs[heading.level].id = heading.id;
        }
      }
    });
  }, [content]);

  // Update active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(el => el !== null) as HTMLElement[];
      
      if (headingElements.length === 0) return;
      
      // Find the heading that's currently in view
      const scrollPosition = window.scrollY + 200;
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const currentElement = headingElements[i];
        if (currentElement && currentElement.offsetTop <= scrollPosition) {
          setActiveId(currentElement.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Scroll to heading when clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-32 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between items-center p-3">
            <span className="font-medium">Table of Contents</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-auto max-h-[300px]">
            <nav className="px-3 pb-3">
              <ul className="space-y-1">
                {headings.map((heading) => (
                  <li 
                    key={heading.id}
                    className={cn(
                      "cursor-pointer hover:text-blue-600 transition-colors",
                      activeId === heading.id ? "text-blue-600 font-medium" : "text-gray-700 dark:text-gray-300",
                      heading.level === 1 ? "" : "ml-4"
                    )}
                    onClick={() => scrollToHeading(heading.id)}
                  >
                    <div className="py-1 text-sm">
                      {heading.text}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TableOfContents;

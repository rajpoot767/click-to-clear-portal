
import React, { createContext, useContext, useState, useEffect } from "react";

interface BookmarkedArticle {
  id: string;
  title: string;
  imageUrl?: string;
  category?: string;
}

interface ReadLaterArticle {
  id: string;
  title: string;
  date?: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkedArticle[];
  readLater: ReadLaterArticle[];
  addBookmark: (article: BookmarkedArticle) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addToReadLater: (article: ReadLaterArticle) => void;
  removeFromReadLater: (id: string) => void;
  isInReadLater: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [readLater, setReadLater] = useState<ReadLaterArticle[]>([]);

  useEffect(() => {
    // Load bookmarks from localStorage on initial render
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Error parsing bookmarks:", e);
      }
    }

    // Load read later articles
    const savedReadLater = localStorage.getItem("readLater");
    if (savedReadLater) {
      try {
        setReadLater(JSON.parse(savedReadLater));
      } catch (e) {
        console.error("Error parsing read later:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    // Save read later to localStorage whenever it changes
    localStorage.setItem("readLater", JSON.stringify(readLater));
  }, [readLater]);

  const addBookmark = (article: BookmarkedArticle) => {
    if (!isBookmarked(article.id)) {
      setBookmarks((prev) => [...prev, article]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  const addToReadLater = (article: ReadLaterArticle) => {
    if (!isInReadLater(article.id)) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      setReadLater((prev) => [...prev, { 
        ...article, 
        date: article.date || `Added ${formattedDate}`
      }]);
    }
  };

  const removeFromReadLater = (id: string) => {
    setReadLater((prev) => prev.filter((article) => article.id !== id));
  };

  const isInReadLater = (id: string) => {
    return readLater.some((article) => article.id === id);
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      readLater,
      addBookmark, 
      removeBookmark, 
      isBookmarked,
      addToReadLater,
      removeFromReadLater,
      isInReadLater
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect } from "react";

interface BookmarkedArticle {
  id: string;
  title: string;
  imageUrl?: string;
  category?: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkedArticle[];
  addBookmark: (article: BookmarkedArticle) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);

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
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
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

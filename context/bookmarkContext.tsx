"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";
import { Bookmark, UserBookmark } from "@/types/bookmarkInfo";
import { WorkDetails } from "@/types/workInfo";

interface BookmarksContextProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

const BookmarksContext = createContext<BookmarksContextProps | undefined>(
  undefined
);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const userBookmarkData = await fetchBookmarkData();
        const userBookmarkWorkIDs = getWorkIDs(userBookmarkData);
        const fetchedWorks: WorkDetails[] | null = await fetchWorks(
          userBookmarkWorkIDs,
          false
        );
        const bookmarks = createBookmarkList(userBookmarkData, fetchedWorks);
        setBookmarks(bookmarks);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const getWorkIDs = (bookmarks: UserBookmark[]) => {
    return bookmarks.map((bookmark) => bookmark.workID);
  };

  const createBookmarkList = (
    userBookmarkData: UserBookmark[],
    fetchedWorks: WorkDetails[] | null
  ) => {
    if (!fetchedWorks) return [];

    const workMap = new Map(fetchedWorks.map((work) => [work.workID, work]));
    return userBookmarkData.map((userBookmark) => ({
      ...userBookmark,
      workDetails: workMap.get(userBookmark.workID),
    }));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};

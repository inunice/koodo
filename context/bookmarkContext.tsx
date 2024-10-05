"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";

import useDeleteBookmarkFromDB from "@/hooks/useDeleteBookmarkFromDB";

import { Bookmark, UserBookmark } from "@/types/bookmarkInfo";
import { WorkDetails } from "@/types/workInfo";

interface BookmarksContextProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  deleteBookmark: (bookmarkId: number) => Promise<boolean>;
  isDeleting: boolean;
  updateBookmark: (updatedBookmark: Bookmark) => boolean;
  getBookmarkByID: (bookmarkID: number) => Bookmark | undefined;
}

const BookmarksContext = createContext<BookmarksContextProps | undefined>(
  undefined
);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { deleteBookmarkFromDB, isDeleting } = useDeleteBookmarkFromDB();

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
    const bookmarkList = userBookmarkData.map((userBookmark) => ({
      ...userBookmark,
      workDetails: workMap.get(userBookmark.workID),
    }));

    return bookmarkList.sort(
      (a, b) =>
        new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );
  };

  const deleteBookmark = async (bookmarkId: number) => {
    const { status, message } = await deleteBookmarkFromDB(bookmarkId);
    if (status === "success") {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.workID !== bookmarkId)
      );
      return true;
    } else {
      console.error("Failed to delete bookmark:", message);
      return false;
    }
  };

  const updateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.workID === updatedBookmark.workID ? updatedBookmark : bookmark
      )
    );
    return true;
  };

  const getBookmarkByID = (bookmarkId: number) => {
    return bookmarks.find((bookmark) => bookmark.workID === bookmarkId);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        deleteBookmark,
        isDeleting,
        updateBookmark,
        getBookmarkByID,
      }}
    >
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";

import { Bookmark, UserBookmark } from "@/types/bookmarkInfo";
import { WorkDetails } from "@/types/workInfo";

import BookmarkCard from "./bookmarkCard";
import { Button } from "@/components/ui/button";

export default function Home() {
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

  const handleDeleteBookmark = (bookmarkId: number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.workID !== bookmarkId)
    );
  };

  const handleUpdateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.workID === updatedBookmark.workID ? updatedBookmark : bookmark
      )
    );
    console.log(bookmarks);
  };

  return (
    <div>
      <span>Home</span>
      <div>
        <Button asChild>
          <Link href="/add">Add work</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-2">
        {bookmarks.map((bookmark, index) => (
          <BookmarkCard
            key={index}
            bookmark={bookmark}
            onDelete={handleDeleteBookmark}
            onUpdate={handleUpdateBookmark}
          />
        ))}
      </div>
    </div>
  );
}

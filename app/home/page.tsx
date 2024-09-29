"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";

import { Bookmark } from "@/types/userWorkInfo";

import BookmarkCard from "./bookmarkCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const getWorks = async () => {
      const bookmarkData = await fetchBookmarkData();
      const bookmarkWorkIDs = bookmarkData.map((bookmark) => bookmark.workID);

      const fetchedWorks = await fetchWorks(bookmarkWorkIDs);
      if (fetchedWorks) {
        const workMap = new Map(
          fetchedWorks.map((work) => [work.workID, work])
        );
        const mergedData = bookmarkData.map((bookmark) => ({
          bookmarkDetails: bookmark,
          workDetails: workMap.get(bookmark.workID),
        }));

        setBookmarks(mergedData);
      }
    };

    getWorks();
  }, []);

  return (
    <div>
      <span>Home</span>
      <div>
        <Button asChild>
          <Link href="/add">Add work</Link>
        </Button>
      </div>
      {bookmarks.map((bookmark, index) => (
        <BookmarkCard key={index} bookmark={bookmark} />
      ))}
    </div>
  );
}

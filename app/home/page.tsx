"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";

import { Bookmark } from "@/types/bookmarkInfo";

import BookmarkCard from "./bookmarkCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const getWorks = async () => {
      const userBookmarkData = await fetchBookmarkData();
      const userBookmarkWorkIDs = userBookmarkData.map(
        (bookmark) => bookmark.workID
      );

      const fetchedWorks = await fetchWorks(userBookmarkWorkIDs);
      if (fetchedWorks) {
        const workMap = new Map(
          fetchedWorks.map((work) => [work.workID, work])
        );
        const bookmarks: Bookmark[] = userBookmarkData.map((userBookmark) => ({
          userBookmarkDetails: userBookmark,
          workDetails: workMap.get(userBookmark.workID),
        }));

        setBookmarks(bookmarks);
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
      <div className="grid grid-cols-2 gap-3">
        {bookmarks.map((bookmark, index) => (
          <BookmarkCard key={index} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}

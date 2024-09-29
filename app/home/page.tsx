"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchBookmarkData } from "@/app/api/fetchBookmarkData";
import { fetchWorks } from "@/app/api/fetchWorks";

import { WorkInfo } from "@/types/workInfo";
import { UserBookmark } from "@/types/userWorkInfo";

import { Button } from "@/components/ui/button";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<
    (UserBookmark & { work?: WorkInfo })[]
  >([]);

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
          ...bookmark,
          work: workMap.get(bookmark.workID),
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
        <div key={index}>
          <h2>Bookmark Info</h2>
          {bookmark.workID}
          {bookmark.status}
          <h2>Work Info</h2>
          {bookmark.work ? (
            <>
              <h2>{bookmark.work.workID}</h2>
              <h2>{bookmark.work.workBasicInfo.title}</h2>
            </>
          ) : (
            <p>Work information not available</p>
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useBookmarks } from "@/context/bookmark-context";

import { Bookmark } from "@/types/bookmarkInfo";

import BookmarkInfo from "./bookmarkInfo";

export default function BookmarkPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { bookmarks, getBookmarkByID } = useBookmarks();
  const [bookmark, setBookmark] = useState<Bookmark | undefined | null>(null);

  useEffect(() => {
    if (bookmarks.length > 0) {
      const bookmark = getBookmarkByID(Number(id));
      setBookmark(bookmark);
    }
  }, [id, bookmarks, getBookmarkByID]);

  return (
    <div>
      {bookmark === null ? (
        <span>Loading...</span>
      ) : bookmark === undefined ? (
        <span>Bookmark not found</span>
      ) : (
        <BookmarkInfo bookmark={bookmark} />
      )}
    </div>
  );
}

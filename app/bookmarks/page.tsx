"use client";

import { useBookmarks } from "@/context/bookmarkContext";
import BookmarkCard from "./bookmarkCard";

import { Bookmark } from "@/types/bookmarkInfo";

export default function BookmarksPage() {
  const { bookmarks, setBookmarks } = useBookmarks();

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
  };

  return (
    <div>
      <h1>Bookmarks</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
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

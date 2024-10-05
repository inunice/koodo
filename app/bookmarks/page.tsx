"use client";

import { useState, useEffect } from "react";
import { useBookmarks } from "@/context/bookmarkContext";
import { Bookmark } from "@/types/bookmarkInfo";
import SearchBar from "./components/searchBar";
import BookmarkCard from "./bookmarkCard";

export default function BookmarksPage() {
  const { bookmarks, setBookmarks } = useBookmarks();
  const [query, setQuery] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setFilteredBookmarks(bookmarks || []);
  }, [bookmarks]);

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
      <SearchBar
        query={query}
        setQuery={setQuery}
        filteredBookmarks={bookmarks || []}
        setFilteredBookmarks={setFilteredBookmarks}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
        {filteredBookmarks.map((bookmark, index) => (
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

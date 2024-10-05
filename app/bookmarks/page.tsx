"use client";

import { useState, useEffect } from "react";
import { useBookmarks } from "@/context/bookmarkContext";
import { Bookmark } from "@/types/bookmarkInfo";
import SearchBar from "./components/searchBar";
import BookmarkCard from "./bookmarkCard";

export default function BookmarksPage() {
  const { bookmarks, updateBookmark } = useBookmarks();
  const [query, setQuery] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setFilteredBookmarks(bookmarks || []);
  }, [bookmarks]);

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
            onUpdate={updateBookmark}
          />
        ))}
      </div>
    </div>
  );
}

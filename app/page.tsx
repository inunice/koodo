"use client";

import { useBookmarks } from "@/context/bookmark-context";

import CurrentlyReading from "./components/currently-reading";
import BookmarksByTags from "./components/bookmarks-by-tags";

export default function Home() {
  const { bookmarks } = useBookmarks();

  return (
    <main>
      <h1>Home</h1>
      <CurrentlyReading bookmarks={bookmarks} />
      <BookmarksByTags bookmarks={bookmarks} />
    </main>
  );
}

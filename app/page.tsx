"use client";

import { useBookmarks } from "@/context/bookmarkContext";
import { Bookmark } from "@/types/bookmarkInfo";

export default function Home() {
  const { bookmarks } = useBookmarks();

  const readingBookmarks = bookmarks.filter(
    (bookmark) => bookmark.readingStatus === "Reading"
  );

  const bookmarksByTag = bookmarks.reduce<Record<string, Bookmark[]>>(
    (acc, bookmark) => {
      bookmark.mainTags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(bookmark);
      });
      return acc;
    },
    {}
  );

  return (
    <main>
      <div className="mb-10">
        <h2>Currently Reading</h2>
        <ul>
          {readingBookmarks.map((bookmark) => (
            <li key={bookmark.workID}>{bookmark.workBasicInfo.title}</li>
          ))}
        </ul>
      </div>

      <h2>By Tags</h2>
      {Object.keys(bookmarksByTag).map((tag) => (
        <div key={tag} className="mb-5">
          <h3 className="font-bold">{tag}</h3>
          <ul>
            {bookmarksByTag[tag].map((bookmark) => (
              <li key={bookmark.workID}>
                {bookmark.workBasicInfo.title} - {bookmark.readingStatus}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}

import { Bookmark } from "@/types/bookmark-types";

interface CurrentlyReadingProps {
  bookmarks: Bookmark[];
}

export default function CurrentlyReading({ bookmarks }: CurrentlyReadingProps) {
  const readingBookmarks = bookmarks.filter(
    (bookmark) => bookmark.readingStatus === "Reading"
  );

  return (
    <div className="mb-10">
      <h2>Currently Reading</h2>
      <ul>
        {readingBookmarks.map((bookmark) => (
          <li key={bookmark.workID}>{bookmark.workBasicInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

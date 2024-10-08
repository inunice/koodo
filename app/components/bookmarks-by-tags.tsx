import { Bookmark } from "@/types/bookmarkInfo";

interface BookmarksByTagsProps {
  bookmarks: Bookmark[];
}

export default function BookmarksByTags({ bookmarks }: BookmarksByTagsProps) {
  const bookmarksByTags = bookmarks.reduce<Record<string, Bookmark[]>>(
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
    <div>
      <h2>By Tags</h2>
      {Object.keys(bookmarksByTags).map((tag) => (
        <div key={tag} className="mb-5">
          <h3 className="font-bold">{tag}</h3>
          <ul>
            {bookmarksByTags[tag].map((bookmark) => (
              <li key={bookmark.workID}>
                {bookmark.workBasicInfo.title} - {bookmark.readingStatus}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

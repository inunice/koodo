import { Bookmark } from "@/types/bookmark-types";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import CurrentlyReadingCard from "./currently-reading-card";

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
      <ScrollArea className="w-full">
        <div className="flex flex-row gap-2 mb-4">
          {readingBookmarks.map((bookmark) => (
            <CurrentlyReadingCard key={bookmark.workID} bookmark={bookmark} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="overflow-auto h-2" />
      </ScrollArea>
    </div>
  );
}

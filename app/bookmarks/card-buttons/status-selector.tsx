import { Bookmark } from "@/types/bookmark-types";

import ReadingStatusSelector from "./reading-status-selector";
import ChapterProgressSelector from "./chapter-progress-selector";

interface ReadingStatus {
  bookmark: Bookmark;
}

export default function ReadingStatus({ bookmark }: ReadingStatus) {
  return (
    <div className="flex flex-row gap-1">
      <ReadingStatusSelector bookmark={bookmark} />
      {bookmark.readingStatus === "Reading" && (
        <ChapterProgressSelector bookmark={bookmark} />
      )}
    </div>
  );
}

import { Bookmark } from "@/types/bookmark-types";

import SelectReadingStatus from "./select-reading-status";
import SelectChapterProgress from "./select-chapter-progress";

interface ReadingStatus {
  bookmark: Bookmark;
}

export default function ReadingStatus({ bookmark }: ReadingStatus) {
  return (
    <div className="flex flex-row gap-1">
      <SelectReadingStatus bookmark={bookmark} />
      {bookmark.readingStatus === "Reading" && (
        <SelectChapterProgress bookmark={bookmark} />
      )}
    </div>
  );
}

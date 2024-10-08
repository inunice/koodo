import { useState, useCallback } from "react";

import { Bookmark } from "@/types/bookmark-types";
import { readingStatus } from "@/types/bookmark-types";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface FilterByProps {
  bookmarks: Bookmark[];
  setFilteredBookmarks: (bookmarks: Bookmark[]) => void;
}

export default function FilterBy({
  bookmarks,
  setFilteredBookmarks,
}: FilterByProps) {
  const [selectedReadingStatus, setSelectedReadingStatus] =
    useState<string>("all");

  const handleFilterByReadingStatus = useCallback(
    (status: string) => {
      setSelectedReadingStatus(status);
      if (status === "all") {
        setFilteredBookmarks(bookmarks);
      } else {
        setFilteredBookmarks(
          bookmarks.filter((bookmark) =>
            bookmark.readingStatus.includes(status)
          )
        );
      }
    },
    [bookmarks, setFilteredBookmarks]
  );

  return (
    <div className="flex flex-row">
      <Select
        onValueChange={handleFilterByReadingStatus}
        value={selectedReadingStatus}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Reading Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {readingStatus.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

import { useBookmarks } from "@/context/bookmarkContext";
import { updateBookmarkReadingStatus } from "../utils/updateBookmarkReadingStatus";

import { Bookmark, ReadingStatus, readingStatus } from "@/types/bookmarkInfo";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectReadingStatusProps {
  bookmark: Bookmark;
}

export default function SelectReadingStatus({
  bookmark,
}: SelectReadingStatusProps) {
  const { toast } = useToast();

  const { updateBookmark } = useBookmarks();
  const [currentReadingStatus, setCurrentReadingStatus] = useState(
    bookmark.readingStatus
  );

  const handleStatusChange = (newReadingStatus: ReadingStatus) => {
    const updatedBookmark = { ...bookmark, readingStatus: newReadingStatus };
    setCurrentReadingStatus(newReadingStatus);
    updateBookmarkReadingStatus(bookmark.workID, newReadingStatus);

    const status = updateBookmark(updatedBookmark);
    if (status) {
      toast({
        title: "Yay!",
        description: "Bookmark updated successfully!",
      });
    } else {
      toast({
        title: "Uh oh!",
        description: "Error updating bookmark!",
      });
    }
  };

  useEffect(() => {
    setCurrentReadingStatus(bookmark.readingStatus);
  }, [bookmark]);

  return (
    <Select onValueChange={handleStatusChange} value={currentReadingStatus}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {readingStatus.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

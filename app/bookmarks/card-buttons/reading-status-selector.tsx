"use client";

import { useState, useEffect } from "react";

import { useBookmarks } from "@/context/bookmark-context";
import { updateBookmarkReadingStatusInDB } from "../utils/update-bookmark-reading-status-to-db";

import { readingStatus } from "@/utils/reading-status";
import { Bookmark, ReadingStatus } from "@/types/bookmark-types";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TOAST_MESSAGE_UPDATE } from "@/utils/toast-messages";

interface ReadingStatusSelectorProps {
  bookmark: Bookmark;
}

export default function ReadingStatusSelector({
  bookmark,
}: ReadingStatusSelectorProps) {
  const { toast } = useToast();

  const { updateBookmark } = useBookmarks();
  const [currentReadingStatus, setCurrentReadingStatus] = useState(
    bookmark.readingStatus
  );

  useEffect(() => {
    setCurrentReadingStatus(bookmark.readingStatus);
  }, [bookmark.readingStatus]);

  const handleStatusChange = (newReadingStatus: ReadingStatus) => {
    try {
      const updatedBookmark = {
        ...bookmark,
        readingStatus: newReadingStatus,
      };
      setCurrentReadingStatus(newReadingStatus);
      updateBookmark(updatedBookmark);
      updateBookmarkReadingStatusInDB(bookmark.workID, newReadingStatus);
      toast(TOAST_MESSAGE_UPDATE.SUCCESS);
    } catch (error) {
      console.error("Failed to update reading status:", error);
      toast(TOAST_MESSAGE_UPDATE.ERROR);
    }
  };

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

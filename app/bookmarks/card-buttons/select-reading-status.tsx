"use client";

import { useState, useEffect } from "react";

import { useBookmarks } from "@/context/bookmark-context";
import { updateBookmarkReadingStatus } from "../utils/update-bookmark-reading-status";

import { Bookmark, ReadingStatus, readingStatus } from "@/types/bookmark-types";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TOAST_MESSAGE_UPDATE } from "@/utils/toast-messages";

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
      toast(TOAST_MESSAGE_UPDATE.SUCCESS);
    } else {
      toast(TOAST_MESSAGE_UPDATE.ERROR);
    }
  };

  useEffect(() => {
    setCurrentReadingStatus(bookmark.readingStatus);
  }, [bookmark]);

  return (
    <>
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
    </>
  );
}

"use client";

import { useState, useEffect } from "react";

import { addBookmark } from "@/app/api/addBookmark";

import { Bookmark, ReadingStatus, readingStatus } from "@/types/bookmarkInfo";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectReadingStatusProps {
  bookmark: Bookmark;
  onUpdate: (updatedBookmark: Bookmark) => void;
}

export default function SelectReadingStatus({
  bookmark,
  onUpdate,
}: SelectReadingStatusProps) {
  const [currentReadingStatus, setCurrentReadingStatus] = useState(
    bookmark.readingStatus
  );

  const handleStatusChange = (newReadingStatus: ReadingStatus) => {
    const updatedBookmark = { ...bookmark, readingStatus: newReadingStatus };
    setCurrentReadingStatus(newReadingStatus);
    addBookmark(bookmark.workID, newReadingStatus);

    onUpdate(updatedBookmark);
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

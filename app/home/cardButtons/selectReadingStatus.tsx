"use client";

import { useState } from "react";

import { updateReadingStatus } from "@/app/api/updateReadingStatus";

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
}

export default function SelectReadingStatus({
  bookmark,
}: SelectReadingStatusProps) {
  const [currentReadingStatus, setCurrentReadingStatus] = useState(
    bookmark.readingStatus
  );

  const handleStatusChange = (newReadingStatus: ReadingStatus) => {
    bookmark.readingStatus = newReadingStatus;
    setCurrentReadingStatus(newReadingStatus);
    updateReadingStatus(bookmark.workID, newReadingStatus);
  };

  return (
    <Select
      onValueChange={handleStatusChange}
      defaultValue={currentReadingStatus}
    >
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

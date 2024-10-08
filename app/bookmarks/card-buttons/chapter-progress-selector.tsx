"use client";

import { useState } from "react";

import { useBookmarks } from "@/context/bookmark-context";
import { updateChapterProgressStatusInDB } from "../utils/update-chapter-progress-status-in-db";

import { Bookmark } from "@/types/bookmark-types";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TOAST_MESSAGE_UPDATE } from "@/utils/toast-messages";

interface ChapterProgressSelectorProps {
  bookmark: Bookmark;
}

export default function ChapterProgressSelector({
  bookmark,
}: ChapterProgressSelectorProps) {
  const { toast } = useToast();
  const { updateBookmark } = useBookmarks();
  const [currentChapter, setCurrentChapter] = useState(
    bookmark.currentChapter.toString()
  );

  const handleChapterChange = (updatedChapter: string) => {
    try {
      const updatedBookmark = {
        ...bookmark,
        currentChapter: Number(updatedChapter),
      };
      setCurrentChapter(updatedChapter);
      updateBookmark(updatedBookmark);
      updateChapterProgressStatusInDB(bookmark.workID, Number(updatedChapter));
      toast(TOAST_MESSAGE_UPDATE.SUCCESS);
    } catch (error) {
      console.error("Failed to update chapter progress:", error);
      toast(TOAST_MESSAGE_UPDATE.ERROR);
    }
  };

  return (
    <Select
      onValueChange={(value) => handleChapterChange(value.toString())}
      value={currentChapter.toString()}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select chapter" />
      </SelectTrigger>
      <SelectContent>
        {Array.from(
          {
            length: (bookmark.workDetails?.workStats.latestChapter || 0) + 1,
          },
          (_, i) => i.toString()
        ).map((chapter) => (
          <SelectItem key={chapter} value={chapter}>
            {chapter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

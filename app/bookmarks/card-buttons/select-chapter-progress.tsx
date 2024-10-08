"use client";

import { useState, useEffect } from "react";

import { useBookmarks } from "@/context/bookmark-context";
import { updateChapterProgressStatus } from "../utils/update-chapter-progress-status";

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

interface SelectChapterProgressProps {
  bookmark: Bookmark;
}

export default function SelectChapterProgress({
  bookmark,
}: SelectChapterProgressProps) {
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
      updateChapterProgressStatus(bookmark.workID, Number(updatedChapter));

      updateBookmark(updatedBookmark);
      toast(TOAST_MESSAGE_UPDATE.SUCCESS);
    } catch (error) {
      console.error("Failed to update chapter progress:", error);
      toast(TOAST_MESSAGE_UPDATE.ERROR);
    }
  };

  useEffect(() => {
    setCurrentChapter(bookmark.currentChapter.toString());
  }, [bookmark]);

  return (
    <>
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
    </>
  );
}

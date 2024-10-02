"use client";

import { useState } from "react";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import DisplayCard from "./displayCard";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div onClick={handleOpenDialog}>
        <DisplayCard bookmark={bookmark} />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>{bookmark.workBasicInfo.title}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>{bookmark.workBasicInfo.author}</p>
              <p>{bookmark.workBasicInfo.summary}</p>
              <p>{bookmark.readingStatus}</p>
              <p>{bookmark.comment}</p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

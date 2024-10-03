"use client";

import { useState } from "react";

import useDeleteBookmark from "@/hooks/useDeleteBookmark";
import { Bookmark } from "@/types/bookmarkInfo";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import DisplayCard from "./displayCard";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (bookmarkId: number) => void;
}

export default function WorkCard({ bookmark, onDelete }: BookmarkCardProps) {
  const { deleteBookmark, isDeleting } = useDeleteBookmark();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleDeleteBookmark = async () => {
    const { status, message } = await deleteBookmark(bookmark);
    if (status === "success") {
      setIsOpen(false);
      onDelete(bookmark.workID);
    } else {
      console.error("Failed to delete bookmark:", message);
    }
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
          <DialogFooter>
            <Button onClick={handleDeleteBookmark} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import { format } from "date-fns";

import useDeleteBookmark from "@/hooks/useDeleteBookmark";
import { useSaveUserBookmark } from "@/hooks/useSaveUserBookmark";

import { Bookmark, BookmarkForm } from "@/types/bookmarkInfo";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import DisplayCard from "./displayCard";
import EditBookmarkForm from "./editBookmarkForm";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (bookmarkId: number) => void;
  onUpdate: (updatedBookmark: Bookmark) => void;
}

export default function WorkCard({
  bookmark,
  onDelete,
  onUpdate,
}: BookmarkCardProps) {
  const { saveUserBookmark, isLoading } = useSaveUserBookmark();
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

  const bookmarkForm: BookmarkForm = {
    readingStatus: bookmark.readingStatus,
    currentChapter: bookmark.currentChapter,
    mainTags: bookmark.mainTags,
    otherTags: bookmark.otherTags,
    isDownloaded: bookmark.isDownloaded,
    favorite: bookmark.favorite,
    rating: bookmark.rating,
    comment: bookmark.comment,
    startDateReading: bookmark.startDateReading,
    endDateReading: bookmark.endDateReading,
  };

  const handleUpdateBookmark = async (bookmarkForm: BookmarkForm) => {
    try {
      const updatedBookmark = await saveUserBookmark({
        userID: 1,
        workID: bookmark.workID,
        workBasicInfo: bookmark.workBasicInfo,
        bookmark: bookmarkForm,
        addDate: bookmark.addDate,
        updateDate: new Date(),
      });
      console.log("Bookmark updated successfully");
      onUpdate({ ...bookmark, ...updatedBookmark });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    }
  };

  return (
    <>
      <div onClick={handleOpenDialog}>
        <DisplayCard bookmark={bookmark} onUpdate={onUpdate} />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>{bookmark.workBasicInfo.title}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>{bookmark.workBasicInfo.author}</p>
              <p className="line-clamp-3">{bookmark.workBasicInfo.summary}</p>
              <p>{bookmark.comment}</p>
              <EditBookmarkForm
                latestChapter={
                  bookmark.workDetails?.workStats.latestChapter || 0
                }
                initialValues={bookmarkForm}
                onSubmit={handleUpdateBookmark}
              />
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

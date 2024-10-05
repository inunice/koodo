"use client";

import { useState } from "react";

import { useBookmarks } from "@/context/bookmarkContext";

import { useToast } from "@/hooks/use-toast";
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

import CardInfo from "./cardInfo";
import EditBookmarkForm from "./editBookmarkForm";

import { TOAST_MESSAGE_UPDATE } from "@/utils/toastMessages";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  const { toast } = useToast();
  const { deleteBookmark, isDeleting, updateBookmark } = useBookmarks();

  const { saveUserBookmark, isLoading } = useSaveUserBookmark();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
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
      const status = updateBookmark({ ...bookmark, ...updatedBookmark });

      if (status) {
        toast(TOAST_MESSAGE_UPDATE.SUCCESS);
      } else {
        toast(TOAST_MESSAGE_UPDATE.ERROR);
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    }
  };

  const handleDeleteBookmark = async () => {
    const status = await deleteBookmark(bookmark.workID);
    if (status) {
      toast({
        title: "Yay!",
        description: "Bookmark deleted successfully!",
      });
    } else {
      toast({
        title: "Uh oh!",
        description: "Error deleting bookmark!",
      });
    }
  };

  return (
    <>
      <div onClick={handleOpenDialog}>
        <CardInfo bookmark={bookmark} />
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

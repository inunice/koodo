import { useRouter } from "next/navigation";

import { useSaveUserBookmark } from "@/hooks/useSaveUserBookmark";
import { useBookmarks } from "@/context/bookmark-context";

import { Bookmark, BookmarkForm } from "@/types/bookmarkInfo";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import EditBookmarkForm from "./components/editBookmarkForm";
import WorkInfo from "./components/workInfo";

import {
  TOAST_MESSAGE_UPDATE,
  TOAST_MESSAGE_DELETE,
} from "@/utils/toast-messages";

interface BookmarkInfoProps {
  bookmark: Bookmark;
}

export default function BookmarkInfo({ bookmark }: BookmarkInfoProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { deleteBookmark, isDeleting, updateBookmark } = useBookmarks();
  const { saveUserBookmark, isLoading } = useSaveUserBookmark();

  const handleUpdateBookmark = async (bookmarkForm: BookmarkForm) => {
    const updatedBookmark = await saveUserBookmark({
      userID: 1,
      workID: bookmark.workID,
      workBasicInfo: bookmark.workBasicInfo,
      bookmark: bookmarkForm,
      addDate: bookmark.addDate,
      updateDate: new Date(),
    });
    try {
      updateBookmark({ ...bookmark, ...updatedBookmark });
      toast(TOAST_MESSAGE_UPDATE.SUCCESS);
      router.push("/bookmarks");
    } catch (error) {
      toast(TOAST_MESSAGE_UPDATE.ERROR);
      console.error("Failed to update bookmark:", error);
    }
  };

  const handleDeleteBookmark = async () => {
    try {
      await deleteBookmark(bookmark.workID);
      toast(TOAST_MESSAGE_DELETE.SUCCESS);
      router.push("/bookmarks");
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
      toast(TOAST_MESSAGE_DELETE.ERROR);
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

  return (
    <div>
      <WorkInfo bookmark={bookmark} />
      <EditBookmarkForm
        latestChapter={bookmark.workDetails?.workStats.latestChapter || 0}
        initialValues={bookmarkForm}
        onSubmit={handleUpdateBookmark}
      />
      <Button onClick={handleDeleteBookmark} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}

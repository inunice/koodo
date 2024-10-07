import { useRouter } from "next/navigation";

import { useSaveUserBookmark } from "@/hooks/useSaveUserBookmark";
import { useBookmarks } from "@/context/bookmark-context";

import { Bookmark, BookmarkForm } from "@/types/bookmarkInfo";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import EditBookmarkForm from "./components/editBookmarkForm";
import WorkInfo from "./components/workInfo";

import { TOAST_MESSAGE_UPDATE } from "@/utils/toastMessages";

interface BookmarkInfoProps {
  bookmark: Bookmark;
}

export default function BookmarkInfo({ bookmark }: BookmarkInfoProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { deleteBookmark, isDeleting, updateBookmark } = useBookmarks();
  const { saveUserBookmark, isLoading } = useSaveUserBookmark();

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
        router.push("/bookmarks");
      } else {
        toast(TOAST_MESSAGE_UPDATE.ERROR);
      }
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
      router.push("/bookmarks");
    } else {
      toast({
        title: "Uh oh!",
        description: "Error deleting bookmark!",
      });
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

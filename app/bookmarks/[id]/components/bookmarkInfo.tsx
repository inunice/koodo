import { useRouter } from "next/navigation";

import { useSaveUserBookmark } from "@/hooks/useSaveUserBookmark";
import { useBookmarks } from "@/context/bookmarkContext";

import { Bookmark, BookmarkForm } from "@/types/bookmarkInfo";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import EditBookmarkForm from "./editBookmarkForm";

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
      <h1>{bookmark.workBasicInfo.title}</h1>
      <div>
        <p>{bookmark.workBasicInfo.author}</p>
        <p className="line-clamp-3">{bookmark.workBasicInfo.summary}</p>
        <p>{bookmark.comment}</p>
        <EditBookmarkForm
          latestChapter={bookmark.workDetails?.workStats.latestChapter || 0}
          initialValues={bookmarkForm}
          onSubmit={handleUpdateBookmark}
        />
      </div>
      <Button onClick={handleDeleteBookmark} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}

import { useState } from "react";
import { localDatabase } from "@/config/localDatabase";
import { UserBookmark, BookmarkForm } from "@/types/bookmark-types";
import { WorkBasicInfo } from "@/types/work-types";

interface SaveUserBookmarkProps {
  userID: number;
  workID: number;
  workBasicInfo: WorkBasicInfo;
  bookmark: BookmarkForm;
  addDate: Date;
  updateDate: Date;
}

export function useSaveUserBookmark() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveUserBookmark = async ({
    userID,
    workID,
    workBasicInfo,
    bookmark,
    addDate,
    updateDate,
  }: SaveUserBookmarkProps): Promise<UserBookmark | null> => {
    const newBookmark: UserBookmark = {
      userID: userID,
      workID: workID,
      workBasicInfo: workBasicInfo,
      readingStatus: bookmark.readingStatus,
      currentChapter: bookmark.currentChapter,
      mainTags: bookmark.mainTags,
      otherTags: bookmark.otherTags,
      isDownloaded: bookmark.isDownloaded,
      favorite: bookmark.favorite,
      rating: bookmark.rating,
      comment: bookmark.comment,
      addDate: addDate,
      updateDate: updateDate,
      startDateReading: bookmark.startDateReading,
      endDateReading: bookmark.endDateReading,
    };
    setIsLoading(true);
    setError(null);

    try {
      await localDatabase.userBookmarks.put(newBookmark);
      console.log("User bookmark added successfully");
      return newBookmark;
    } catch (error) {
      console.error("Failed to add user bookmark:", error);
      setError(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { saveUserBookmark, isLoading, error };
}

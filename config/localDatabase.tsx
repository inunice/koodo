import { Dexie, type EntityTable } from "dexie";
import { UserBookmark } from "@/types/bookmarkInfo";

export const localDatabase = new Dexie("UserBookmarks") as Dexie & {
  userBookmarks: EntityTable<UserBookmark, "workID">;
};
localDatabase.version(1).stores({
  userBookmarks:
    "workID, userID, readingStatus, currentChapter, mainTags, otherTags, isDownloaded, favorite, rating, comment, workBasicInfo, startDateReading, endDateReading",
});

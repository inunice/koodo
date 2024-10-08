import { Dexie, type EntityTable } from "dexie";
import { UserBookmark } from "@/types/bookmark-types";

export const DATABASE_NAME = "Koodo";
export const USER_BOOKMARKS_TABLE = "userBookmarks";
export const USER_BOOKMARKS_SCHEMA =
  "workID,userID,readingStatus,currentChapter,fandoms,mainTags,otherTags,isDownloaded,favorite,rating,comment,workBasicInfo,startDateReading,endDateReading";

export const localDatabase = new Dexie(DATABASE_NAME) as Dexie & {
  userBookmarks: EntityTable<UserBookmark, "workID">;
};

localDatabase.version(1).stores({
  [USER_BOOKMARKS_TABLE]: USER_BOOKMARKS_SCHEMA,
});

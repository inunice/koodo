import { Dexie, type EntityTable } from "dexie";
import { UserBookmark } from "@/types/userWorkInfo";

export const localDatabase = new Dexie("UserBookmarks") as Dexie & {
  userBookmarks: EntityTable<UserBookmark, "workID">;
};
localDatabase.version(1).stores({
  userBookmarks: "workID, userID, status, customTags, isDownloaded",
});

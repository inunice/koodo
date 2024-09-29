import { localDatabase } from "@/config/localDatabase";
import { UserBookmark } from "@/types/bookmarkInfo";

export async function addUserBookmark(bookmark: UserBookmark) {
  try {
    await localDatabase.userBookmarks.add(bookmark);
    console.log("User bookmark added successfully");
  } catch (error) {
    console.error("Failed to add user bookmark:", error);
  }
}

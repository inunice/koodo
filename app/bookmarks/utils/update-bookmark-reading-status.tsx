import { localDatabase } from "@/config/localDatabase";
import { ReadingStatus } from "@/types/bookmark-types";

export async function updateBookmarkReadingStatus(
  workID: number,
  readingStatus: ReadingStatus
): Promise<boolean> {
  try {
    const bookmark = await localDatabase.userBookmarks.get(workID);

    if (!bookmark) {
      console.error("Bookmark not found");
      return false;
    }

    bookmark.readingStatus = readingStatus;
    await localDatabase.userBookmarks.put(bookmark);

    console.log("Reading status updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update user bookmark:", error);
    return false;
  }
}

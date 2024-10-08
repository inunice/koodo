import { localDatabase } from "@/config/localDatabase";
import { ReadingStatus } from "@/types/bookmark-types";

export async function updateBookmarkReadingStatusInDB(
  workID: number,
  readingStatus: ReadingStatus
): Promise<void> {
  try {
    const bookmark = await localDatabase.userBookmarks.get(workID);

    if (!bookmark) {
      console.error("Bookmark not found");
      return;
    }

    bookmark.readingStatus = readingStatus;
    bookmark.updateDate = new Date();
    await localDatabase.userBookmarks.put(bookmark);

    console.log("Reading status updated successfully");
  } catch (error) {
    console.error("Failed to update user bookmark:", error);
  }
}

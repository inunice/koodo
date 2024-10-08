import { localDatabase } from "@/config/localDatabase";

export async function updateChapterProgressStatusInDB(
  workID: number,
  currentChapter: number
): Promise<void> {
  try {
    const bookmark = await localDatabase.userBookmarks.get(workID);

    if (!bookmark) {
      console.error("Bookmark not found");
      return;
    }

    bookmark.currentChapter = currentChapter;
    bookmark.updateDate = new Date();
    await localDatabase.userBookmarks.put(bookmark);

    console.log("Chapter progress updated successfully");
  } catch (error) {
    console.error("Failed to update user bookmark:", error);
  }
}

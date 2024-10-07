import { localDatabase } from "@/config/localDatabase";

export async function updateChapterProgressStatus(
  workID: number,
  currentChapter: number
): Promise<boolean> {
  try {
    const bookmark = await localDatabase.userBookmarks.get(workID);

    if (!bookmark) {
      console.error("Bookmark not found");
      return false;
    }

    bookmark.currentChapter = currentChapter;
    await localDatabase.userBookmarks.put(bookmark);

    console.log("Chapter progress updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update user bookmark:", error);
    return false;
  }
}

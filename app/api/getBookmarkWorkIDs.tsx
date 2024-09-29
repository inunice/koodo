import { localDatabase } from "@/config/localDatabase";

export async function getBookmarkWorkIDs(): Promise<number[]> {
  try {
    const bookmarks = await localDatabase.userBookmarks.toArray();
    const workIDs = bookmarks.map((bookmark) => bookmark.workID);
    return workIDs;
  } catch (error) {
    console.error("Failed to fetch user bookmarks:", error);
    return [];
  }
}

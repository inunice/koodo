import { localDatabase } from "@/config/localDatabase";
import { UserBookmark } from "@/types/bookmarkInfo";

export async function fetchBookmarkData(): Promise<UserBookmark[]> {
  try {
    const bookmarks: UserBookmark[] =
      await localDatabase.userBookmarks.toArray();
    return bookmarks;
  } catch (error) {
    console.error("Failed to fetch user bookmarks:", error);
    return [];
  }
}

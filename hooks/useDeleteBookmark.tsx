import { useState } from "react";

import { localDatabase } from "@/config/localDatabase";

import { Bookmark } from "@/types/bookmarkInfo";

export default function useDeleteBookmark() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteBookmark = async (bookmark: Bookmark) => {
    if (!bookmark || !bookmark.workID) {
      setErrorMessage("Invalid bookmark");
      return { status: "error", message: "Invalid bookmark" };
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteBookmarkFromDB(bookmark.workID);
      setIsDeleting(false);
      return { status: "success" };
    } catch (error) {
      console.error("Failed to delete bookmark:", error);

      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(message);
      setIsDeleting(false);

      return { status: "error", message };
    }
  };

  return { deleteBookmark, isDeleting, errorMessage };
}

export async function deleteBookmarkFromDB(bookmarkId: number): Promise<void> {
  await localDatabase.userBookmarks.delete(bookmarkId);
}

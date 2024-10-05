import { useState } from "react";

import { localDatabase } from "@/config/localDatabase";

export default function useDeleteBookmarkFromDB() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBookmarkFromDB = async (bookmarkID: number) => {
    setIsDeleting(true);

    try {
      await localDatabase.userBookmarks.delete(bookmarkID);
      setIsDeleting(false);
      return { status: "success" };
    } catch (error) {
      console.error("Failed to delete bookmark:", error);

      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      setIsDeleting(false);

      return { status: "error", message };
    }
  };

  return { deleteBookmarkFromDB, isDeleting };
}

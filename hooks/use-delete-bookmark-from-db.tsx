import { useState } from "react";

import { localDatabase } from "@/config/localDatabase";

export default function useDeleteBookmarkFromDB() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBookmarkFromDB = async (bookmarkID: number) => {
    setIsDeleting(true);

    try {
      await localDatabase.userBookmarks.delete(bookmarkID);
      setIsDeleting(false);
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
      setIsDeleting(false);
    }
  };

  return { deleteBookmarkFromDB, isDeleting };
}

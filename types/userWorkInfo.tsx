import { WorkInfo } from "./workInfo";
export interface UserBookmark {
  userID: number;
  workID: number;
  status: "To Read" | "Reading" | "Dropped" | "Completed";
  currentChapter: number;
  ships: string[];
  customTags: string[];
  isDownloaded: boolean;
  favorite: boolean;
  rating: number;
  comment: string;
}

export interface Bookmark {
  bookmarkDetails: UserBookmark;
  workDetails: WorkInfo | undefined;
}

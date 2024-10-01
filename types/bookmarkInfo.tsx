import { WorkInfo, WorkBasicInfo } from "./workInfo";

export type readingStatus = "To Read" | "Reading" | "Dropped" | "Completed";

export interface BookmarkForm {
  readingStatus: readingStatus;
  currentChapter: number;
  ships: string[];
  customTags: string[];
  isDownloaded: boolean;
  favorite: boolean;
  rating: number;
  comment: string;
}
export interface UserBookmark extends BookmarkForm {
  userID: number;
  workID: number;
  workBasicInfo: WorkBasicInfo;
}

export interface Bookmark extends UserBookmark {
  workDetails: Omit<WorkInfo, "workBasicInfo"> | undefined;
}

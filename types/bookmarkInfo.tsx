import { WorkInfo, WorkBasicInfo } from "./workInfo";

export const readingStatus = [
  "To Read",
  "Reading",
  "Dropped",
  "Completed",
] as const;
export type ReadingStatus = (typeof readingStatus)[number];

export interface BookmarkForm {
  readingStatus: ReadingStatus;
  currentChapter: number;
  mainTags: string[];
  otherTags: string[];
  isDownloaded: boolean;
  favorite: boolean;
  rating: number;
  comment: string;
  startDateReading: Date | null;
  endDateReading: Date | null;
}
export interface UserBookmark extends BookmarkForm {
  userID: number;
  workID: number;
  workBasicInfo: WorkBasicInfo;
  addDate: Date;
  updateDate: Date;
}

export interface Bookmark extends UserBookmark {
  workDetails: Omit<WorkInfo, "workBasicInfo"> | undefined;
}

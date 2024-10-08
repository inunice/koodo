export interface WorkDetails {
  workID: number;
  workLink: string;
  workTags: WorkTags;
  workStats: WorkStats;
  fetchDate: Date;
}

export interface WorkInfo extends WorkDetails {
  workBasicInfo: WorkBasicInfo;
}

export interface WorkBasicInfo {
  title: string;
  author: string[];
  summary: string[];
  fandoms: string[];
}

export type WorkRating =
  | "General Audiences"
  | "Teen And Up Audiences"
  | "Mature"
  | "Explicit"
  | "Not Rated";

export type ArchiveWarning =
  | "Choose Not To Use Archive Warnings"
  | "Graphic Depictions Of Violence"
  | "Major Character Death"
  | "No Archive Warnings Apply"
  | "Rape/Non-Con"
  | "Underage";

export type Category = "F/M" | "F/F" | "M/M" | "Multi" | "Gen" | "Other";

export type WorkType = "One Shot" | "Multi Chapter";

export interface WorkTags {
  rating: WorkRating;
  archiveWarnings: ArchiveWarning[];
  categories: Category[];
  relationships: string[];
  characters: string[];
  additionalTags: string[];
  language: string;
}

export interface WorkStats {
  publishedDate: Date;
  lastestUpdateDate: Date;
  words: number;
  latestChapter: number;
  totalChapters: number;
  comments: number;
  kudos: number;
  bookmarks: number;
  hits: number;
  status: "Complete" | "In Progress";
  workType: WorkType;
}

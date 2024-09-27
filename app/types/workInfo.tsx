export interface FicInfo {
  ficID: number;
  ficLink: string;
  ficBasicInfo: FicBasicInfo;
  ficTags: FicTags;
  ficStats: FicStats;
}

export interface FicBasicInfo {
  title: string;
  author: string;
  summary: string;
}

export type ficRating =
  | "General Audiences"
  | "Teen And Up Audiences"
  | "Mature"
  | "Explicit"
  | "Not Rated";

export type archiveWarning =
  | "Choose Not To Use Archive Warnings"
  | "Graphic Depictions Of Violence"
  | "Major Character Death"
  | "No Archive Warnings Apply"
  | "Rape/Non-Con"
  | "Underage";

export type category = "F/M" | "F/F" | "M/M" | "Multi" | "Gen" | "Other";

export interface FicTags {
  rating: ficRating;
  archiveWarnings: archiveWarning[];
  categories: category[];
  fandoms: string[];
  relationships: string[];
  characters: string[];
  additionalTags: string[];
  language: string;
}

export interface FicStats {
  publishedDate: Date;
  lastestUpdateDate: Date;
  words: number;
  latestChapter: number;
  totalChapters: number | "?";
  comments: number;
  kudos: number;
  bookmarks: number;
  hits: number;
  status: "Complete" | "In Progress";
}

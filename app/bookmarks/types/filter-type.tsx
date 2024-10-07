export type FilterType =
  | "title"
  | "author"
  | "fandom"
  | "mainTags"
  | "otherTags"
  | "comment";

export const FilterTypeDisplayNames: { [key in FilterType]: string } = {
  title: "Title",
  author: "Author",
  fandom: "Fandom",
  mainTags: "Main tags",
  otherTags: "Other tags",
  comment: "Comment",
};

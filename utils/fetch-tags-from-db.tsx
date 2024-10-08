import { localDatabase } from "@/config/localDatabase";

export default async function fetchTagsFromDB(
  tagType: "mainTags" | "otherTags"
): Promise<string[]> {
  try {
    const bookmarks = await localDatabase.userBookmarks.toArray();
    const tagsSet = new Set<string>();

    bookmarks.forEach((bookmark) => {
      const tags = bookmark[tagType];
      if (tags && Array.isArray(tags)) {
        tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet);
  } catch (error) {
    console.error("Failed to fetch tags from the database:", error);
    return [];
  }
}

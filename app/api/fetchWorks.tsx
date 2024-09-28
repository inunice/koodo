import supabase from "@/config/supabaseClient";
import { WorkInfo } from "@/types/workInfo";

export const fetchWorks = async (): Promise<WorkInfo[] | null> => {
  const { data, error } = await supabase.from("works").select("*");
  if (error) {
    console.error("Error fetching works:", error);
    return null;
  } else {
    const works: WorkInfo[] = data.map((work) => ({
      workID: work.workID,
      workLink: work.workLink,
      workBasicInfo: {
        title: work.title,
        author: work.author,
        summary: work.summary,
      },
      workTags: {
        rating: work.rating,
        archiveWarnings: work.archiveWarnings,
        categories: work.categories,
        fandoms: work.fandoms,
        relationships: work.relationships,
        characters: work.characters,
        additionalTags: work.additionalTags,
        language: work.language,
      },
      workStats: {
        publishedDate: new Date(work.publishedDate),
        lastestUpdateDate: new Date(work.lastestUpdateDate),
        words: work.words,
        latestChapter: work.latestChapter,
        totalChapters: work.totalChapters,
        comments: work.comments,
        kudos: work.kudos,
        bookmarks: work.bookmarks,
        hits: work.hits,
        status: work.status,
      },
    }));

    return works;
  }
};

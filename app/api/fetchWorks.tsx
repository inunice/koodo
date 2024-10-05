import supabase from "@/config/supabaseClient";
import { WorkInfo, WorkDetails } from "@/types/workInfo";

export const fetchWorks = async (
  workIDs: number[],
  includeBasicInfo: boolean = true
): Promise<WorkInfo[] | WorkDetails[] | null> => {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .in("work_ID", workIDs);

  if (error) {
    console.error("Error fetching works:", error);
    return null;
  }

  return data.map((work) => {
    const workInfo: WorkInfo = {
      workID: work.work_ID,
      workLink: work.work_link,
      fetchDate: new Date(work.fetch_date),
      workBasicInfo: {
        title: work.title,
        author: work.author,
        summary: work.summary,
        fandoms: work.fandoms,
      },
      workTags: {
        rating: work.rating,
        archiveWarnings: work.archive_warnings,
        categories: work.categories,
        relationships: work.relationships,
        characters: work.characters,
        additionalTags: work.additional_tags,
        language: work.language,
      },
      workStats: {
        publishedDate: new Date(work.published_date),
        lastestUpdateDate: new Date(work.lastest_update_date),
        words: work.words,
        latestChapter: work.latest_chapter,
        totalChapters: work.total_chapters,
        comments: work.comments,
        kudos: work.kudos,
        bookmarks: work.bookmarks,
        hits: work.hits,
        status: work.status,
        workType: work.work_type,
      },
    };

    if (!includeBasicInfo) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { workBasicInfo, ...rest } = workInfo;
      return rest;
    }

    return workInfo;
  });
};

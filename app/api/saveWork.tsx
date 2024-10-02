import supabase from "@/config/supabaseClient";
import { WorkInfo } from "@/types/workInfo";

export const saveWork = async (work: WorkInfo): Promise<string> => {
  const workData = {
    work_ID: work.workID,
    work_link: work.workLink,
    title: work.workBasicInfo.title,
    author: work.workBasicInfo.author,
    summary: work.workBasicInfo.summary,
    fetch_date: work.workBasicInfo.fetchDate,
    rating: work.workTags.rating,
    archive_warnings: work.workTags.archiveWarnings,
    categories: work.workTags.categories,
    fandoms: work.workTags.fandoms,
    relationships: work.workTags.relationships,
    characters: work.workTags.characters,
    additional_tags: work.workTags.additionalTags,
    language: work.workTags.language,
    published_date: work.workStats.publishedDate,
    lastest_update_date: work.workStats.lastestUpdateDate,
    words: work.workStats.words,
    latest_chapter: work.workStats.latestChapter,
    total_chapters: work.workStats.totalChapters,
    comments: work.workStats.comments,
    kudos: work.workStats.kudos,
    bookmarks: work.workStats.bookmarks,
    hits: work.workStats.hits,
    status: work.workStats.status,
    work_type: work.workStats.workType,
  };

  const { error } = await supabase.from("works").upsert([workData], {
    onConflict: "work_ID",
  });

  if (error) {
    console.error("Error adding/updating work in database:", error);
    return error.message;
  } else {
    console.log("Work added/updated in database");
    return "Success";
  }
};

import supabase from "@/config/supabaseClient";
import { WorkInfo } from "@/types/workInfo";

export const saveWork = async (work: WorkInfo) => {
  const workData = {
    workID: work.workID,
    workLink: work.workLink,
    title: work.workBasicInfo.title,
    author: work.workBasicInfo.author,
    summary: work.workBasicInfo.summary,
    rating: work.workTags.rating,
    archiveWarnings: work.workTags.archiveWarnings,
    categories: work.workTags.categories,
    fandoms: work.workTags.fandoms,
    relationships: work.workTags.relationships,
    characters: work.workTags.characters,
    additionalTags: work.workTags.additionalTags,
    language: work.workTags.language,
    publishedDate: work.workStats.publishedDate,
    lastestUpdateDate: work.workStats.lastestUpdateDate,
    words: work.workStats.words,
    latestChapter: work.workStats.latestChapter,
    totalChapters: work.workStats.totalChapters,
    comments: work.workStats.comments,
    kudos: work.workStats.kudos,
    bookmarks: work.workStats.bookmarks,
    hits: work.workStats.hits,
    status: work.workStats.status,
  };

  const { data, error } = await supabase.from("works").insert([workData]);

  if (error) {
    console.error("Error adding work to database:", error);
  } else {
    console.log("Work added to database:", data);
  }
};

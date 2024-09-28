"use client";

import { useState } from "react";
import supabase from "@/config/supabaseClient";

import { WorkInfo } from "@/types/workInfo";

import WorkCard from "./workCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [work, setWork] = useState<WorkInfo | null>(null);

  const getWorkInformation = async () => {
    try {
      if (!link.startsWith("https://archiveofourown.org/works/")) {
        throw new Error(
          "Please copy the full link from the work page starting at the first chapter."
        );
      }

      const url = new URL(link);
      const id = url.pathname.split("/")[2];

      const response = await fetch(
        `/api/getWorkInfo?id=${encodeURIComponent(id)}`,
        {
          method: "GET",
        }
      );
      const work = await response.json();
      setWork(work);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error.message);
    }
  };

  const saveWork = async () => {
    if (work) {
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
    }
  };

  return (
    <div>
      <h1>Enter Fic URL</h1>
      <div>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
        />
        <button onClick={getWorkInformation}>Get work info</button>
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Invalid link!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {work && <WorkCard work={work} />}
      <button onClick={saveWork}>Add work</button>
    </div>
  );
}

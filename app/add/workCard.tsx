"use client";

import { WorkInfo } from "@/types/work-types";
import { Card } from "@/components/ui/card";

interface WorkCardProps {
  work: WorkInfo;
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <Card>
      <h2>{work.workBasicInfo.title}</h2>
      <p>Author: {work.workBasicInfo.author}</p>
      <p>Summary: {work.workBasicInfo.summary}</p>
      <p>Fandoms: {work.workBasicInfo.fandoms}</p>
      <p>Work ID: {work.workID}</p>
      <p>Work Link: {work.workLink}</p>
      <p>Rating: {work.workTags.rating}</p>
      <p>Archive Warnings: {work.workTags.archiveWarnings.join(", ")}</p>
      <p>Categories: {work.workTags.categories.join(", ")}</p>
      <p>Relationships: {work.workTags.relationships.join(", ")}</p>
      <p>Characters: {work.workTags.characters.join(", ")}</p>
      <p>Additional Tags: {work.workTags.additionalTags.join(", ")}</p>
      <p>Language: {work.workTags.language}</p>
      <p>Published Date: {work.workStats.publishedDate.toString()}</p>
      <p>Last Update: {work.workStats.lastestUpdateDate.toString()}</p>
      <p>Words: {work.workStats.words}</p>
      <p>Latest Chapter: {work.workStats.latestChapter}</p>
      <p>Total Chapters: {work.workStats.totalChapters}</p>
      <p>Comments: {work.workStats.comments}</p>
      <p>Kudos: {work.workStats.kudos}</p>
      <p>Bookmarks: {work.workStats.bookmarks}</p>
      <p>Hits: {work.workStats.hits}</p>
      <p>Status: {work.workStats.status}</p>
    </Card>
  );
}

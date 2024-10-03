"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

import { saveWork } from "@/app/api/saveWork";
import { addUserBookmark } from "@/app/api/addUserBookmark";

import { WorkInfo } from "@/types/workInfo";
import { UserBookmark, BookmarkForm } from "@/types/bookmarkInfo";

import WorkCard from "./workCard";
import WorkPreview from "./workPreview";
import WorkForm from "./workForm";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const [work, setWork] = useState<WorkInfo | null>(null);
  const [latestChapter, setLatestChapter] = useState<number>(0);

  const getWorkInformation = (work: WorkInfo | null) => {
    setWork(work);
    setLatestChapter(work ? Math.max(work.workStats.latestChapter) : 0);
  };

  const handleSaveWork = async (bookmarkInformation: BookmarkForm) => {
    if (work) {
      const statusMessage = await saveWork(work);
      if (statusMessage === "success") {
        toast({
          title: "Yay!",
          description: "Bookmark added successfully!",
        });

        const newBookmark: UserBookmark = {
          userID: 1,
          workID: work.workID,
          workBasicInfo: work.workBasicInfo,
          readingStatus: bookmarkInformation.readingStatus,
          currentChapter: bookmarkInformation.currentChapter,
          mainTags: bookmarkInformation.mainTags,
          otherTags: bookmarkInformation.otherTags,
          isDownloaded: bookmarkInformation.isDownloaded,
          favorite: bookmarkInformation.favorite,
          rating: bookmarkInformation.rating,
          comment: bookmarkInformation.comment,
        };

        console.log(newBookmark);
        await addUserBookmark(newBookmark);
        router.push("/home");
      } else {
        toast({
          title: "Uh oh!",
          description: "Error adding work to database!",
        });
      }
    }
  };

  return (
    <div>
      <h1>Enter Fic URL</h1>
      <WorkPreview setWorkInfo={getWorkInformation} />
      {work && <WorkCard work={work} />}
      {work && (
        <WorkForm latestChapter={latestChapter} onSubmit={handleSaveWork} />
      )}
    </div>
  );
}

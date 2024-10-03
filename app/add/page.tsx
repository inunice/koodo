"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

import { saveWork } from "@/app/api/saveWork";
import { useSaveUserBookmark } from "@/hooks/useSaveUserBookmark";

import { WorkInfo } from "@/types/workInfo";
import { UserBookmark, BookmarkForm } from "@/types/bookmarkInfo";

import WorkCard from "./workCard";
import WorkPreview from "./workPreview";
import WorkForm from "./workForm";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const { saveUserBookmark, isLoading } = useSaveUserBookmark();

  const [work, setWork] = useState<WorkInfo | null>(null);
  const [latestChapter, setLatestChapter] = useState<number>(0);

  const getWorkInformation = (work: WorkInfo | null) => {
    setWork(work);
    setLatestChapter(work ? work.workStats.latestChapter : 0);
  };

  const handleSaveWork = async (bookmarkInformation: BookmarkForm) => {
    if (work) {
      const statusMessage = await saveWork(work);
      if (statusMessage === "success") {
        toast({
          title: "Yay!",
          description: "Bookmark added successfully!",
        });

        await saveUserBookmark({
          userID: 1,
          workID: work.workID,
          workBasicInfo: work.workBasicInfo,
          bookmark: bookmarkInformation,
          addDate: new Date(),
          updateDate: new Date(),
        });

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

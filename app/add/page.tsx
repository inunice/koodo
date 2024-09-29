"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { saveWork } from "@/app/api/saveWork";
import { addUserBookmark } from "@/app/api/addUserBookmark";

import { WorkInfo } from "@/types/workInfo";
import { UserBookmark } from "@/types/userWorkInfo";

import { Button } from "@/components/ui/button";
import WorkCard from "./workCard";
import WorkPreview from "./workPreview";
import WorkForm from "./workForm";

export default function Home() {
  const [work, setWork] = useState<WorkInfo | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [latestChapter, setLatestChapter] = useState<number>(0);

  const getWorkInformation = (work: WorkInfo | null) => {
    if (work) {
      setWork(work);
      setLatestChapter(
        Math.max(work.workStats.latestChapter, work.workStats.totalChapters)
      );
    }
  };

  const handleSaveWork = async () => {
    if (work) {
      const statusMessage = await saveWork(work);
      if (statusMessage === "Success") {
        setSaveStatus("Work added successfully!");

        // TODO: Form to add custom fields
        const newBookmark: UserBookmark = {
          userID: 1,
          workID: work.workID,
          status: "To Read",
          currentChapter: 1,
          ships: ["Ship1"],
          customTags: [
            "Fantasy",
            "High Priority",
            "2023",
            "Recommended by Friend",
          ],
          isDownloaded: false,
          favorite: true,
          rating: 5,
          comment: "Looking forward to reading this!",
        };

        await addUserBookmark(newBookmark);
      } else if (
        statusMessage ===
        'duplicate key value violates unique constraint "works_pkey"'
      ) {
        setSaveStatus("Work already exists in database");
      } else {
        setSaveStatus("Error adding work to database");
      }
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (saveStatus === "Work added successfully!") {
      router.push("/home");
    }
  }, [saveStatus, router]);

  return (
    <div>
      <h1>Enter Fic URL</h1>
      <WorkPreview setWorkInfo={getWorkInformation} />
      {work && <WorkCard work={work} />}
      <WorkForm latestChapter={latestChapter} />
      {/* {work && <WorkForm />} */}
      {work && <Button onClick={handleSaveWork}>Add work</Button>}
      {saveStatus}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { saveWork } from "@/app/api/saveWork";

import { WorkInfo } from "@/types/workInfo";

import WorkCard from "./workCard";
import WorkForm from "./workForm";

export default function Home() {
  const [work, setWork] = useState<WorkInfo | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const getWorkInformation = (work: WorkInfo | null) => {
    setWork(work);
  };

  const handleSaveWork = async () => {
    if (work) {
      const statusMessage = await saveWork(work);
      if (statusMessage === "Success") {
        setSaveStatus("Work added successfully!");
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

      <WorkForm setWorkInfo={getWorkInformation} />

      {work && <WorkCard work={work} />}

      {work && <button onClick={handleSaveWork}>Add work</button>}

      {saveStatus}
    </div>
  );
}

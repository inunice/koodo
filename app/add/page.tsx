"use client";

import { useState } from "react";

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

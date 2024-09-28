"use client";

import { useState } from "react";

import { saveWork } from "@/app/api/saveWork";

import { WorkInfo } from "@/types/workInfo";

import WorkCard from "./workCard";
import WorkForm from "./workForm";

export default function Home() {
  const [work, setWork] = useState<WorkInfo | null>(null);

  const getWorkInformation = (work: WorkInfo) => {
    setWork(work);
  };

  const handleSaveWork = () => {
    if (work) {
      saveWork(work);
    }
  };

  return (
    <div>
      <h1>Enter Fic URL</h1>
      <WorkForm setWorkInfo={getWorkInformation} />
      {work && <WorkCard work={work} />}
      <button onClick={handleSaveWork}>Add work</button>
    </div>
  );
}

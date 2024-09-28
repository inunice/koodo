"use client";

import { useState } from "react";

import { WorkInfo } from "@/types/workInfo";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WorkForm({
  setWorkInfo,
}: {
  setWorkInfo: (work: WorkInfo | null) => void;
}) {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setWorkInfo(work);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error.message);
      setWorkInfo(null);
    }
  };
  return (
    <div>
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
    </div>
  );
}

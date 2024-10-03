"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useWorkInfo from "@/hooks/useWorkInfo";
import { WorkInfo } from "@/types/workInfo"; // Assuming you have a type for WorkInfo

export default function WorkPreview({
  setWorkInfo,
}: {
  setWorkInfo: (work: WorkInfo | null) => void;
}) {
  const { getWorkInformation, errorMessage } = useWorkInfo();
  const [link, setLink] = useState("");

  const handleGetWorkInfo = async () => {
    const work = await getWorkInformation(link);
    if (work) {
      setWorkInfo(work);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter work link"
        />
        <Button onClick={handleGetWorkInfo}>Get work info</Button>
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

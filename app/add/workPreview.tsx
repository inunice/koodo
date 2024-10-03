"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WorkInfo } from "@/types/workInfo";
import useWorkInfo from "@/hooks/useWorkInformation"; // Assuming this is in hooks

export default function WorkPreview({
  setWorkInfo,
}: {
  setWorkInfo: (work: WorkInfo | null) => void;
}) {
  const { link, setLink, errorMessage, getWorkInformation } = useWorkInfo();

  return (
    <div>
      <div>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
        />
        <Button onClick={() => getWorkInformation(setWorkInfo)}>
          Get work info
        </Button>
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

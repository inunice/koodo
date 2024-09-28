"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
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
      const data = await response.json();
      console.log(data);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Enter Fic URL</h1>
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

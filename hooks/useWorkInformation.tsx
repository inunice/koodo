import { useState } from "react";
import { WorkInfo } from "@/types/workInfo";

export default function useWorkInfo() {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getWorkInformation = async (
    setWorkInfo: (work: WorkInfo | null) => void
  ) => {
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
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }

      setWorkInfo(null);
    }
  };

  return { link, setLink, errorMessage, getWorkInformation };
}

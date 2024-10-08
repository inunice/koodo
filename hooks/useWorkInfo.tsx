import { useState } from "react";
import { WorkInfo } from "@/types/work-types";

export default function useWorkInfo() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getWorkInformation = async (link: string): Promise<WorkInfo | null> => {
    setLoading(true);

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
      setErrorMessage(null);
      return work;
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getWorkInformation, errorMessage, loading };
}

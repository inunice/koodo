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

      // Open work in new tab
      window.open(link, "_blank", "width=800,height=600");

      // Promise that resolves when AO3 data is sent from the new tab
      const result = await new Promise<any>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout waiting for AO3 data"));
        }, 20000); // 20s timeout

        const listener = (event: MessageEvent) => {
          if (
    
            event.data?.ao3Extract
          ) {
            clearTimeout(timeout);
            window.removeEventListener("message", listener);
            resolve(event.data.ao3Extract);
            console.log("AO3 data received:", event.data.ao3Extract);
          }
        };

        window.addEventListener("message", listener);
      });

      setErrorMessage(null);

      const formatted: WorkInfo = {
        workID: Number(url.pathname.split("/")[2]),
        workLink: link,
        fetchDate: new Date(),
        workBasicInfo: {
          title: result.title || "",
          author: result.author || [],
          summary: result.summary || [],
          fandoms: result.fandoms || [],
        },
        workTags: {
          rating: result.rating || "",
          archiveWarnings: result.archiveWarnings || [],
          categories: result.categories || [],
          relationships: result.relationships || [],
          characters: result.characters || [],
          additionalTags: result.additionalTags || [],
          language: result.language || "",
        },
        workStats: {
          publishedDate: result.publishedDate ? new Date(result.publishedDate) : new Date(),
          lastestUpdateDate: result.updatedDate ? new Date(result.updatedDate) : new Date(),
          words: result.words || 0,
          latestChapter: result.latestChapter || 0,
          totalChapters: result.totalChapters || 0,
          comments: result.comments || 0,
          kudos: result.kudos || 0,
          bookmarks: result.bookmarks || 0,
          hits: result.hits || 0,
          status: result.status || "In Progress",
          workType: result.workType || "Multi Chapter",
        }
      };

      return formatted;
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

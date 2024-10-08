import Papa from "papaparse";

import { Bookmark, BookmarkCSV } from "@/types/bookmark-types";

import { Button } from "@/components/ui/button";

const flattenBookmarkData = (data: Bookmark[]) => {
  return data.map((item: Bookmark) => ({
    workTitle: item.workBasicInfo.title,
    workLink:
      item.workDetails?.workLink ||
      "https://archiveofourown.org/works/" + item.workID,
    workAuthor: item.workBasicInfo.author.join(","),
    fandoms: item.workBasicInfo.fandoms.join(","),
    readingStatus: item.readingStatus,
    currentChapter: item.currentChapter,
    mainTags: item.mainTags.join(","),
    otherTags: item.otherTags.join(","),
    words: item.workDetails?.workStats.words,
    workStatus: item.workDetails?.workStats.status,
    workType: item.workDetails?.workStats.workType,
    isDownloaded: item.isDownloaded,
    favorite: item.favorite,
    rating: item.rating,
    comment: item.comment,
    startDateReading: item.startDateReading?.toISOString(),
    endDateReading: item.endDateReading?.toISOString(),
    workSummary: item.workBasicInfo.summary.join(","),
  }));
};

interface BookmarkProps {
  bookmarks: Bookmark[];
}

export default function DownloadCSV({ bookmarks }: BookmarkProps) {
  const handleDownload = () => {
    const bookmarkCSV: BookmarkCSV[] = flattenBookmarkData(bookmarks);
    const csv = Papa.unparse(bookmarkCSV);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "koodo-bookmarks.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download CSV</Button>;
}

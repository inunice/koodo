import { Bookmark } from "@/types/bookmark-types";

interface WorkInfoProps {
  bookmark: Bookmark;
}

export default function WorkInfo({ bookmark }: WorkInfoProps) {
  return (
    <div>
      <div>
        <h1>{bookmark.workBasicInfo.title}</h1>
        <p>{bookmark.workBasicInfo.author}</p>
        <p className="text-sm line-clamp-6">
          {bookmark.workBasicInfo.summary.join(" ")}
        </p>
      </div>

      {bookmark.workDetails && (
        <div>
          <p>
            Published Date:{" "}
            {bookmark.workDetails.workStats.publishedDate.toString()}
          </p>
          <p>
            Last Update:{" "}
            {bookmark.workDetails.workStats.lastestUpdateDate.toString()}
          </p>
          <p>Words: {bookmark.workDetails.workStats.words}</p>
          <p>Latest Chapter: {bookmark.workDetails.workStats.latestChapter}</p>
          <p>Total Chapters: {bookmark.workDetails.workStats.totalChapters}</p>
          <p>Comments: {bookmark.workDetails.workStats.comments}</p>
          <p>Kudos: {bookmark.workDetails.workStats.kudos}</p>
          <p>Bookmarks: {bookmark.workDetails.workStats.bookmarks}</p>
          <p>Hits: {bookmark.workDetails.workStats.hits}</p>
          <p>Status: {bookmark.workDetails.workStats.status}</p>
        </div>
      )}
    </div>
  );
}

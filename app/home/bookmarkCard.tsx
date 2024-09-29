"use client";

import Link from "next/link";

import { Bookmark } from "@/types/bookmarkInfo";
import { Card } from "@/components/ui/card";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card className="flex flex-col p-3">
      <p className="text-md">{bookmark.workDetails?.workBasicInfo.title}</p>
      <p className="text-sm text-gray-700">
        {bookmark.workDetails?.workBasicInfo.author}
      </p>
      <p className="text-sm text-gray-700">
        {bookmark.workDetails?.workTags.fandoms}
      </p>

      <p>{bookmark.userBookmarkDetails.status}</p>
      <div className="flex justify-end">
        {bookmark.workDetails && (
          <Link href={bookmark.workDetails.workLink}>x</Link>
        )}
      </div>
    </Card>
  );
}

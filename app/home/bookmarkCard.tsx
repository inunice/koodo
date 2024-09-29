"use client";

import Link from "next/link";

import { Bookmark } from "@/types/userWorkInfo";
import { Card } from "@/components/ui/card";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card>
      <h1>{bookmark.workDetails?.workBasicInfo.title}</h1>
      <h3>{bookmark.workDetails?.workBasicInfo.author}</h3>
      <h3>{bookmark.workDetails?.workTags.fandoms}</h3>

      <p>{bookmark.bookmarkDetails.status}</p>
      {bookmark.workDetails && (
        <Link href={bookmark.workDetails.workLink}>Link</Link>
      )}
    </Card>
  );
}

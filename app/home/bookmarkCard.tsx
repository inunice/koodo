"use client";

import Link from "next/link";

import { Bookmark } from "@/types/bookmarkInfo";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex flex-col p-3">
          <p className="text-md">{bookmark.workDetails?.workBasicInfo.title}</p>
          <p className="text-sm text-gray-700">
            {bookmark.workDetails?.workBasicInfo.author}
          </p>
          <p className="text-xs text-gray-700">
            {bookmark.workDetails?.workTags.fandoms}
          </p>

          <p>{bookmark.userBookmarkDetails.status}</p>
          <div className="flex justify-end">
            {bookmark.workDetails && (
              <Link href={bookmark.workDetails.workLink}>x</Link>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{bookmark.workDetails?.workBasicInfo.title}</DialogTitle>
        <DialogDescription>Yes</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

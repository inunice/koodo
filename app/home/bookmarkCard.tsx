"use client";

import Link from "next/link";

import { Bookmark } from "@/types/bookmarkInfo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <Card className="flex flex-col items-start p-3">
          <p className="text-md">{bookmark.workBasicInfo.title}</p>
          <p className="text-sm text-gray-700">
            {bookmark.workBasicInfo.author}
          </p>
          <div className="flex flex-wrap gap-1">
            {bookmark.workDetails?.workTags.fandoms.map((fandom, index) => (
              // TODO - Add style to badge
              <Badge key={index} variant="outline" className="text-[10px]">
                {fandom}
              </Badge>
            ))}
          </div>
          <p>{bookmark.readingStatus}</p>
          <div className="flex">
            {bookmark.workDetails && (
              <Link href={bookmark.workDetails.workLink}>x</Link>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{bookmark.workBasicInfo.title}</DialogTitle>
        <DialogDescription>
          <p>{bookmark.workBasicInfo.author}</p>
          <p>{bookmark.workBasicInfo.summary}</p>
          <p>{bookmark.readingStatus}</p>
          <p>{bookmark.comment}</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

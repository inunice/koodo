"use client";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import DisplayCard from "./displayCard";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function WorkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <DisplayCard bookmark={bookmark} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{bookmark.workBasicInfo.title}</DialogTitle>
        <DialogDescription asChild>
          <div>
            <p>{bookmark.workBasicInfo.author}</p>
            <p>{bookmark.workBasicInfo.summary}</p>
            <p>{bookmark.readingStatus}</p>
            <p>{bookmark.comment}</p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

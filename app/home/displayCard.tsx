"use client";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import DisplayBadges from "./displayBadges";
import UpdateBookmark from "./updateBookmark";
import OpenWorkLink from "./openWorkLink";
import SelectReadingStatus from "./selectReadingStatus";

interface DisplayCardProps {
  bookmark: Bookmark;
}

export default function DisplayCard({ bookmark }: DisplayCardProps) {
  return (
    <Card className="w-full flex flex-col items-start px-5 py-4 gap-1 align-left">
      <CardHeader className="p-0">
        <div className="flex flex-wrap gap-0 items-baseline">
          <span className="text-lg pr-2">{bookmark.workBasicInfo.title}</span>
          <span className="text-sm text-gray-700">
            {bookmark.workBasicInfo.author.join(" ")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="w-full p-0">
        <DisplayBadges
          mainTags={bookmark.mainTags}
          fandoms={bookmark.workDetails?.workTags.fandoms}
        />
        <p className="text-xs text-justify line-clamp-4 text-gray-700">
          {bookmark.workBasicInfo.summary.join(" ")}
        </p>
      </CardContent>
      <CardFooter className="w-full flex flex-row p-0 gap-10 justify-between">
        <SelectReadingStatus bookmark={bookmark} />
        <div className="flex flex-row gap-1">
          <UpdateBookmark fetchDate={bookmark.workDetails?.fetchDate} />
          <OpenWorkLink workID={bookmark.workID} />
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import DisplayBadges from "./displayBadges";
import UpdateBookmark from "./cardButtons/updateBookmark";
import OpenWorkLink from "./cardButtons/openWorkLink";
import SelectReadingStatus from "./cardButtons/selectReadingStatus";

import { HeartFilled } from "@/assets/icon/heart";

interface DisplayCardProps {
  bookmark: Bookmark;
  onUpdate: (updatedBookmark: Bookmark) => void;
}

export default function DisplayCard({ bookmark, onUpdate }: DisplayCardProps) {
  return (
    <Card className="w-full flex flex-col items-start px-5 py-4 gap-2 align-left">
      <CardHeader className="p-0">
        <div className="items-baseline flex flex-wrap gap-1">
          {bookmark.favorite && <HeartFilled className="w-3 h-3" />}
          <span className="text-md pr-1 font-bold leading-3">
            {bookmark.workBasicInfo.title}
          </span>
          <span className="text-sm text-gray-700 leading-3">
            {bookmark.workBasicInfo.author.join(" ")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 w-full p-0">
        <DisplayBadges
          mainTags={bookmark.mainTags}
          fandoms={bookmark.workDetails?.workTags.fandoms}
        />
        <p className="text-xs text-justify line-clamp-4 text-gray-500">
          {bookmark.workBasicInfo.summary.join(" ")}
        </p>
      </CardContent>
      <CardFooter className="w-full flex flex-row p-0 pt-2 gap-10 justify-between">
        <SelectReadingStatus bookmark={bookmark} onUpdate={onUpdate} />
        <div className="flex flex-row gap-1 h-6">
          <UpdateBookmark bookmark={bookmark} />
          <OpenWorkLink workID={bookmark.workID} />
        </div>
      </CardFooter>
    </Card>
  );
}

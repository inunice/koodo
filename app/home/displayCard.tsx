"use client";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import UpdateBookmark from "./updateBookmark";
import OpenWorkLink from "./openWorkLink";

interface DisplayCardProps {
  bookmark: Bookmark;
}

export default function DisplayCard({ bookmark }: DisplayCardProps) {
  return (
    <Card className="w-full flex flex-col items-start px-6 py-5 gap-1 align-left">
      <CardHeader className="p-0">
        <div className="flex flex-wrap gap-0 items-baseline">
          <span className="text-lg pr-2">{bookmark.workBasicInfo.title}</span>
          <span className="text-sm text-gray-700">
            {bookmark.workBasicInfo.author.join(" ")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-1">
          {bookmark.mainTags.map((mainTag, index) => (
            <Badge key={index} className="text-[10px]">
              {mainTag}
            </Badge>
          ))}
          {bookmark.workDetails?.workTags.fandoms.map((fandom, index) => (
            <Badge key={index} variant="outline" className="text-[10px]">
              {fandom}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-justify line-clamp-4 text-gray-700">
          {bookmark.workBasicInfo.summary.join(" ")}
        </p>
      </CardContent>
      <CardFooter className="w-full flex flex-row p-0 justify-between">
        <p>{bookmark.readingStatus}</p>
        <div className="flex flex-row gap-1">
          <UpdateBookmark fetchDate={bookmark.workBasicInfo.fetchDate} />
          <OpenWorkLink workID={bookmark.workID} />
        </div>
      </CardFooter>
    </Card>
  );
}

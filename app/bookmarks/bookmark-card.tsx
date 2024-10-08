"use client";

import { useRouter } from "next/navigation";

import { Bookmark } from "@/types/bookmark-types";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import DisplayBadges from "./components/display-badges";
import BookmarkUpdater from "./card-buttons/bookmark-updater";
import WorkLink from "./card-buttons/work-link";

import { HeartFilled } from "@/assets/icon/heart";
import StatusSelector from "./card-buttons/status-selector";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/bookmarks/${bookmark.workID}`);
  };

  return (
    <>
      <div onClick={handleNavigate}>
        <Card className="w-full flex flex-col items-start px-6 py-6 gap-2 align-left">
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
              main={bookmark.mainTags}
              other={bookmark.workBasicInfo.fandoms}
            />
            <DisplayBadges
              main={bookmark.otherTags}
              other={bookmark.workDetails?.workTags.additionalTags}
            />
            <p className="text-xs text-justify line-clamp-4 text-gray-500">
              {bookmark.workBasicInfo.summary.join(" ")}
            </p>
          </CardContent>
          <CardFooter className="w-full flex flex-row p-0 pt-2 gap-10 justify-between">
            <StatusSelector bookmark={bookmark} />
            <div className="flex flex-row text-xs leading-3 gap-3">
              <span>
                {bookmark.workDetails?.workStats.words?.toLocaleString()} words
              </span>
              <span>{bookmark.rating}/5 stars</span>
            </div>
            <div className="flex flex-row gap-1 h-6">
              <BookmarkUpdater bookmark={bookmark} />
              <WorkLink workID={bookmark.workID} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

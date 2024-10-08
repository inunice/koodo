import { useRouter } from "next/navigation";
import { Bookmark } from "@/types/bookmark-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { HeartFilled } from "@/assets/icon/heart";

interface BookmarksByTagsCardProps {
  bookmark: Bookmark;
}

export default function BookmarksByTagsCard({
  bookmark,
}: BookmarksByTagsCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/bookmarks/${bookmark.workID}`);
  };

  return (
    <div onClick={handleNavigate}>
      <Card className="w-[270px] h-[170px] flex flex-col px-6 py-6 gap-2">
        <CardHeader className="p-0">
          <div className="items-baseline flex flex-wrap gap-1">
            {bookmark.favorite && <HeartFilled className="w-3 h-3" />}
            <span className="text-md pr-1 font-bold leading-5 line-clamp-1">
              {bookmark.workBasicInfo.title}
            </span>
            <span className="text-sm text-gray-700 leading-3">
              {bookmark.workBasicInfo.author.join(" ")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 w-full p-0 flex-grow">
          <p className="text-xs text-justify line-clamp-3 text-gray-500">
            {bookmark.workBasicInfo.summary.join(" ")}
          </p>
        </CardContent>
        <CardFooter className="w-full flex flex-row p-0 pt-2 gap-10 justify-between">
          <span className="text-xs">{bookmark.readingStatus}</span>
          <span className="text-xs">
            {bookmark.workDetails?.workStats.words.toLocaleString()} words
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

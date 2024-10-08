import { format } from "date-fns";

import { useToast } from "@/hooks/use-toast";
import useWorkInfo from "@/hooks/useWorkInfo";
import { saveWork } from "@/app/api/saveWork";

import { Bookmark } from "@/types/bookmark-types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RecentlyViewedIcon } from "@/assets/icon/recentlyViewed";

interface UpdateBookmarkProps {
  bookmark: Bookmark;
}

export default function UpdateBookmark({ bookmark }: UpdateBookmarkProps) {
  const { toast } = useToast();
  const { getWorkInformation } = useWorkInfo();

  const handleGetWorkInfo = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const work = await getWorkInformation(
      "https://archiveofourown.org/works/" + bookmark.workID
    );
    if (work) {
      const result = await saveWork(work);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { workBasicInfo, ...workInfo } = work;
      bookmark.workDetails = workInfo;
      bookmark.workDetails.fetchDate = new Date();

      toast({
        title: result === "success" ? "Yay!" : "Uh oh! Something went wrong.",
        description:
          result === "success"
            ? "Work information successfully updated!"
            : "There was a problem with your request.",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={handleGetWorkInfo}>
          <RecentlyViewedIcon className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>
          {bookmark.workDetails === undefined ? (
            <span>Reload work!</span>
          ) : (
            <span>
              Last updated: {format(bookmark.workDetails.fetchDate, "PP")}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

import { format } from "date-fns";

import { useToast } from "@/hooks/use-toast";
import useWorkInfo from "@/hooks/useWorkInfo";
import { saveWork } from "@/app/api/saveWork";

import { Bookmark } from "@/types/bookmarkInfo";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RecentlyViewedIcon } from "@/public/icon/recentlyViewed";

interface UpdateBookmarkProps {
  bookmark: Bookmark;
}

export default function UpdateBookmark({ bookmark }: UpdateBookmarkProps) {
  const { toast } = useToast();
  const { getWorkInformation } = useWorkInfo();

  const handleGetWorkInfo = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from propagating to the card

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
        <TooltipTrigger>
          <RecentlyViewedIcon
            onClick={handleGetWorkInfo}
            color={bookmark.workDetails === undefined ? "pink" : "#999999"}
          />
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

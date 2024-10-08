import { format } from "date-fns";

import useWorkInfo from "@/hooks/useWorkInfo";
import { saveWork } from "@/app/api/saveWork";

import { Bookmark } from "@/types/bookmark-types";

import { useToast } from "@/hooks/use-toast";

import { TOAST_MESSAGES_UPDATE_WORK } from "@/utils/toast-messages";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RecentlyViewedIcon } from "@/assets/icon/recentlyViewed";

interface BookmarkUpdaterProps {
  bookmark: Bookmark;
}

export default function BookmarkUpdater({ bookmark }: BookmarkUpdaterProps) {
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

      if (result === "success") {
        toast(TOAST_MESSAGES_UPDATE_WORK.SUCCESS);
      } else {
        toast(TOAST_MESSAGES_UPDATE_WORK.ERROR);
      }
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

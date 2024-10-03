import { format } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RecentlyViewedIcon } from "@/public/icon/recentlyViewed";

interface UpdateBookmarkProps {
  fetchDate: Date | undefined;
}

export default function UpdateBookmark({ fetchDate }: UpdateBookmarkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <RecentlyViewedIcon
            color={fetchDate === undefined ? "red" : "#999999"}
          />
        </TooltipTrigger>
        <TooltipContent>
          {fetchDate === undefined ? (
            <span>Reload work</span>
          ) : (
            <span>Last updated: {format(new Date(fetchDate), "PP")}</span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

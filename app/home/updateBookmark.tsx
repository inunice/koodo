import { format } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UpdateBookmarkProps {
  fetchDate: Date | undefined;
}

export default function UpdateBookmark({ fetchDate }: UpdateBookmarkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>u</TooltipTrigger>
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

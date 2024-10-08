import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LinkIcon } from "@/assets/icon/link";

interface WorkLinkProps {
  workID: number;
}

export default function WorkLink({ workID }: WorkLinkProps) {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={"https://archiveofourown.org/works/" + workID}
            onClick={handleClick}
          >
            <LinkIcon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <span>Read on the archive!</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

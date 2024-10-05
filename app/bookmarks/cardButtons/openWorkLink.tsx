import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LinkIcon } from "@/assets/icon/link";

interface OpenWorkLinkProps {
  workID: number;
}

export default function OpenWorkLink({ workID }: OpenWorkLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={"https://archiveofourown.org/works/" + workID}>
            <LinkIcon color="#999999" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <span>Read on the archive!</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

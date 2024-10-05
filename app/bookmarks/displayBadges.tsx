import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DisplayBadgesProps {
  mainTags: string[];
  fandoms: string[] | undefined;
}

export default function DisplayBadges({
  mainTags,
  fandoms,
}: DisplayBadgesProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap overflow-y-auto">
      <div className="w-max flex gap-1">
        {mainTags.map((mainTag, index) => (
          <Badge key={index} className="text-[10px]">
            {mainTag}
          </Badge>
        ))}
        {fandoms?.map((fandom, index) => (
          <Badge key={index} variant="outline" className="text-[10px]">
            {fandom}
          </Badge>
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        className="overflow-auto scrollbar-hide"
      />
    </ScrollArea>
  );
}

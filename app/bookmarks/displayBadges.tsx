import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DisplayBadgesProps {
  main: string[];
  other: string[] | undefined;
}

export default function DisplayBadges({ main, other }: DisplayBadgesProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap overflow-y-auto">
      <div className="w-max flex gap-1">
        {main.map((main, index) => (
          <Badge key={index} className="text-[10px]">
            {main}
          </Badge>
        ))}
        {other?.map((other, index) => (
          <Badge key={index} variant="outline" className="text-[10px]">
            {other}
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

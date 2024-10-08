import { Control } from "react-hook-form";
import { BookmarkForm } from "@/types/bookmark-types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChapterFieldProps {
  control: Control<BookmarkForm>;
  latestChapter: number;
}

export default function ChapterField({
  control,
  latestChapter,
}: ChapterFieldProps) {
  return (
    <FormField
      control={control}
      name="currentChapter"
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <FormLabel className="whitespace-nowrap">Chapter</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Array.from({ length: latestChapter + 1 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

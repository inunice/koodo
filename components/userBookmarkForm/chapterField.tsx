import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

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

interface chapterFieldProps {
  control: Control<BookmarkForm>;
  latestChapter: number;
}

export default function chapterField({
  control,
  latestChapter,
}: chapterFieldProps) {
  return (
    <FormField
      control={control}
      name="currentChapter"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CurrentChapter</FormLabel>
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

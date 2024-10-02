import { Control } from "react-hook-form";

import { BookmarkForm, readingStatus } from "@/types/bookmarkInfo";

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

interface ReadingStatusFieldProps {
  control: Control<BookmarkForm>;
}

export default function ReadingStatusField({
  control,
}: ReadingStatusFieldProps) {
  return (
    <FormField
      control={control}
      name="readingStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>readingStatus</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {readingStatus.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

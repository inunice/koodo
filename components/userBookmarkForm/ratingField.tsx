import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RatingFieldProps {
  control: Control<BookmarkForm>;
}

export default function RatingField({ control }: RatingFieldProps) {
  return (
    <FormField
      control={control}
      name="rating"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rating</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={(i * 0.5).toString()}>
                  {(i * 0.5).toFixed(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

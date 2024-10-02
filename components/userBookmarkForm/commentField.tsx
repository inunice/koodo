import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface commentFieldProps {
  control: Control<BookmarkForm>;
}

export default function commentField({ control }: commentFieldProps) {
  return (
    <FormField
      control={control}
      name="comment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Comment</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Keep it short and sweet!"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

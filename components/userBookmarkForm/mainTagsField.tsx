import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SelectTagInput } from "@/components/ui/select-tag-input";

interface MainTagsFieldProps {
  control: Control<BookmarkForm>;
}

export default function RatingField({ control }: MainTagsFieldProps) {
  // TODO: Fetch tags from DB
  const options = ["tag", "tag2", "rag3", "best ship"];

  return (
    <FormField
      control={control}
      name="customTags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Main Tags</FormLabel>
          <SelectTagInput
            value={field.value}
            onChange={field.onChange}
            placeholder="Enter values, comma separated..."
            className="max-w-[500px]"
            options={options}
          />
        </FormItem>
      )}
    />
  );
}

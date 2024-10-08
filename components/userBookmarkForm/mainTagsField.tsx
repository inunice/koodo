import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmark-types";

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
      name="mainTags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Main Tags</FormLabel>
          <SelectTagInput
            value={field.value}
            onChange={field.onChange}
            placeholder=""
            className="max-w-[500px]"
            options={options}
          />
        </FormItem>
      )}
    />
  );
}

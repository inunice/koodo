import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmark-types";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SelectTagInput } from "@/components/ui/select-tag-input";

interface OtherTagsFieldProps {
  control: Control<BookmarkForm>;
}

export default function RatingField({ control }: OtherTagsFieldProps) {
  // TODO: Fetch tags from DB
  const options = ["tag", "tag2", "rag3", "best ship"];

  return (
    <FormField
      control={control}
      name="otherTags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Other Tags</FormLabel>
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

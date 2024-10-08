import { useEffect, useState } from "react";

import { Control } from "react-hook-form";

import fetchTagsFromDB from "@/utils/fetch-tags-from-db";

import { BookmarkForm } from "@/types/bookmark-types";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SelectTagInput } from "@/components/ui/select-tag-input";

interface OtherTagsFieldProps {
  control: Control<BookmarkForm>;
}

export default function RatingField({ control }: OtherTagsFieldProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await fetchTagsFromDB("otherTags");
      setOptions(tags);
    }

    fetchTags();
  }, []);

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
            className="max-w-[500px] z-10"
            options={options}
          />
        </FormItem>
      )}
    />
  );
}

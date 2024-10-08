import { useEffect, useState } from "react";

import { Control } from "react-hook-form";

import fetchTagsFromDB from "@/utils/fetch-tags-from-db";

import { BookmarkForm } from "@/types/bookmark-types";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SelectTagInput } from "@/components/ui/select-tag-input";

interface MainTagsFieldProps {
  control: Control<BookmarkForm>;
}

export default function RatingField({ control }: MainTagsFieldProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await fetchTagsFromDB("mainTags");
      setOptions(tags);
    }

    fetchTags();
  }, []);

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
            className="max-w-[500px] z-10"
            options={options}
          />
        </FormItem>
      )}
    />
  );
}

import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface isDownloadedFieldProps {
  control: Control<BookmarkForm>;
}

export default function isDownloadedField({ control }: isDownloadedFieldProps) {
  return (
    <FormField
      control={control}
      name="isDownloaded"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div>
            <FormLabel>
              Have you downloaded this work for offline reading?
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}

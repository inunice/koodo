import { Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { BookmarkForm } from "@/types/bookmarkInfo";

interface IsDownloadedFieldProps {
  control: Control<BookmarkForm>;
}

export default function IsDownloadedField({ control }: IsDownloadedFieldProps) {
  return (
    <FormField
      control={control}
      name="isDownloaded"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="ml-2">
              Have you downloaded this work for offline reading?
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}

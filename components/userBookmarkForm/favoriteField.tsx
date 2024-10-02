import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmarkInfo";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface favoriteFieldProps {
  control: Control<BookmarkForm>;
}

export default function favoriteField({ control }: favoriteFieldProps) {
  return (
    <FormField
      control={control}
      name="favorite"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div>
            <FormLabel>Love this work?</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}

import { Control } from "react-hook-form";

import { BookmarkForm } from "@/types/bookmark-types";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { HeartOutline, HeartFilled } from "@/assets/icon/heart";

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
            <FormControl>
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                aria-label="Toggle favorite"
              >
                {field.value ? (
                  <HeartFilled className="w-6 h-6" />
                ) : (
                  <HeartOutline className="w-6 h-6" />
                )}
              </button>
            </FormControl>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import { z } from "zod";
import { readingStatus } from "@/types/bookmarkInfo";

export const formSchema = z.object({
  readingStatus: z.enum(readingStatus),
  currentChapter: z.coerce
    .number()
    .min(0, { message: "Please input a valid chapter number." }),
  ships: z.array(z.string()),
  customTags: z.array(z.string()),
  isDownloaded: z.boolean(),
  favorite: z.boolean(),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: "Ratings are between zero and five stars." })
    .multipleOf(0.5, { message: "Ratings must be in half point increments." }),
  comment: z
    .string()
    .max(200, { message: "Comment must be 200 characters or less." })
    .optional(),
});

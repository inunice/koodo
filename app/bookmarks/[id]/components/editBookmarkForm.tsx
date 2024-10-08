"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "@/lib/formSchema";

import { BookmarkForm } from "@/types/bookmark-types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import ChapterField from "@/components/user-bookmark-form/chapter-field";
import CommentField from "@/components/user-bookmark-form/comment-field";
import FavoriteField from "@/components/user-bookmark-form/favorite-field";
import IsDownloadedField from "@/components/user-bookmark-form/is-downloaded-field";
import MainTagsField from "@/components/user-bookmark-form/main-tags-field";
import OtherTagsField from "@/components/user-bookmark-form/other-tags-field";
import RatingField from "@/components/user-bookmark-form/rating-field";
import ReadingStatusField from "@/components/user-bookmark-form/reading-status-field";
import ReadingDateField from "@/components/user-bookmark-form/reading-date-field";

interface EditBookmarkFormProps {
  latestChapter: number;
  initialValues: BookmarkForm;
  onSubmit: (values: BookmarkForm) => void;
}

export default function EditBookmarkForm({
  latestChapter,
  initialValues,
  onSubmit,
}: EditBookmarkFormProps) {
  const form = useForm<BookmarkForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-3">
            <div className="flex-1">
              <ReadingStatusField control={form.control} />
            </div>
            <div className="flex-1">
              <ChapterField
                control={form.control}
                latestChapter={latestChapter}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="flex-1">
              <RatingField control={form.control} />
            </div>
            <div className="w-10">
              <FavoriteField control={form.control} />
            </div>
          </div>
          <MainTagsField control={form.control} />
          <OtherTagsField control={form.control} />
          <IsDownloadedField control={form.control} />
          <CommentField control={form.control} />
          <ReadingDateField control={form.control} />
          <Button>Update</Button>
        </form>
      </Form>
    </div>
  );
}

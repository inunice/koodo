"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "@/lib/formSchema";

import { BookmarkForm } from "@/types/bookmarkInfo";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import ChapterField from "@/components/userBookmarkForm/chapterField";
import CommentField from "@/components/userBookmarkForm/commentField";
import FavoriteField from "@/components/userBookmarkForm/favoriteField";
import IsDownloadedField from "@/components/userBookmarkForm/isDownloadedField";
import MainTagsField from "@/components/userBookmarkForm/mainTagsField";
import OtherTagsField from "@/components/userBookmarkForm/otherTagsField";
import RatingField from "@/components/userBookmarkForm/ratingField";
import ReadingStatusField from "@/components/userBookmarkForm/readingStatusField";
import ReadingDateField from "@/components/userBookmarkForm/readingDateField";

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

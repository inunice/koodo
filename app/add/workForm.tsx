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

interface WorkFormProps {
  latestChapter: number;
  onSubmit: (values: BookmarkForm) => void;
}

export default function WorkForm({ latestChapter, onSubmit }: WorkFormProps) {
  const form = useForm<BookmarkForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readingStatus: "To Read",
      currentChapter: 0,
      mainTags: [],
      otherTags: [],
      isDownloaded: false,
      favorite: false,
      rating: 0,
      comment: "",
      startDateReading: null,
      endDateReading: null,
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ReadingStatusField control={form.control} />
          <ChapterField control={form.control} latestChapter={latestChapter} />
          <RatingField control={form.control} />
          <MainTagsField control={form.control} />
          <OtherTagsField control={form.control} />
          <IsDownloadedField control={form.control} />
          <FavoriteField control={form.control} />
          <CommentField control={form.control} />
          <ReadingDateField control={form.control} />
          <Button>Add work</Button>
        </form>
      </Form>
    </div>
  );
}

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
          <Button>Add work</Button>
        </form>
      </Form>
    </div>
  );
}

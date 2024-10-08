"use client";

import { useState, useEffect } from "react";
import { useBookmarks } from "@/context/bookmark-context";
import { Bookmark } from "@/types/bookmark-types";

import PaginatedBookmarks from "./paginated-bookmarks";
import SearchBar from "./components/search-bar";
import FilterBy from "./components/filter-by";
import PaginationBar from "./components/pagination-bar";

const ITEMS_PER_PAGE = 6;

export default function BookmarksPage() {
  const { bookmarks, isLoading } = useBookmarks();
  const [query, setQuery] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setFilteredBookmarks(bookmarks || []);
  }, [bookmarks]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedBookmarks, setPaginatedBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE));
  }, [filteredBookmarks]);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedBookmarks(filteredBookmarks.slice(start, end));
  }, [filteredBookmarks, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Bookmarks</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        filteredBookmarks={bookmarks || []}
        setFilteredBookmarks={setFilteredBookmarks}
      />
      <FilterBy
        bookmarks={bookmarks || []}
        setFilteredBookmarks={setFilteredBookmarks}
      />
      <PaginatedBookmarks
        paginatedBookmarks={paginatedBookmarks}
        isLoading={isLoading}
      />
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

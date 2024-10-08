"use client";

import { useState, useEffect } from "react";
import { useBookmarks } from "@/context/bookmark-context";
import { Bookmark } from "@/types/bookmark-types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import SearchBar from "./components/search-bar";
import FilterBy from "./components/filter-by";
import BookmarkCard from "./bookmark-card";

const ITEMS_PER_PAGE = 10;

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredBookmarks.length > 0 ? (
          paginatedBookmarks.map((bookmark, index) => (
            <BookmarkCard key={index} bookmark={bookmark} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              )}
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

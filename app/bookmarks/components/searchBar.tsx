"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "@/types/bookmarkInfo";
import { FilterType, FilterTypeDisplayNames } from "../types/filterType";

import { Command, CommandInput, CommandList } from "@/components/ui/command";
import SearchFilterDropdown from "./searchFilterDropdown";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  filteredBookmarks: Bookmark[];
  setFilteredBookmarks: (bookmarks: Bookmark[]) => void;
}

export default function SearchBar({
  query,
  setQuery,
  filteredBookmarks,
  setFilteredBookmarks,
}: SearchBarProps) {
  const [filterTypes, setFilterTypes] = useState<FilterType[]>([
    "title",
    "mainTags",
  ]);

  const toggleFilterType = useCallback(
    (type: FilterType) => {
      setFilterTypes((prevTypes) =>
        prevTypes.includes(type)
          ? prevTypes.filter((t) => t !== type)
          : [...prevTypes, type]
      );
      setQuery("");
    },
    [setQuery]
  );

  const filterBookmarks = useCallback(() => {
    return filteredBookmarks.filter((bookmark) => {
      return filterTypes.some((filterType) => {
        const filterMap: Record<FilterType, string[]> = {
          title: [bookmark.workBasicInfo.title],
          author: bookmark.workBasicInfo.author,
          fandom: bookmark.workBasicInfo.fandoms,
          mainTags: bookmark.mainTags,
          otherTags: bookmark.otherTags,
          comment: [bookmark.comment],
        };

        return filterMap[filterType].some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [query, filterTypes, filteredBookmarks]);

  useEffect(() => {
    setFilteredBookmarks(filterBookmarks());
  }, [query, filterTypes, filterBookmarks, setFilteredBookmarks]);

  return (
    <div className="flex flex-row">
      <Command>
        <CommandInput
          placeholder={`Search by ${
            filterTypes
              .map((type) => FilterTypeDisplayNames[type].toLowerCase())
              .join(", ") || "..."
          }`}
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList></CommandList>
      </Command>
      <SearchFilterDropdown
        filterTypes={filterTypes}
        toggleFilterType={toggleFilterType}
      />
    </div>
  );
}

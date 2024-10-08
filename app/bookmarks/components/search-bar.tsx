"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "@/types/bookmark-types";
import { FilterType, FilterTypeDisplayNames } from "../types/filter-type";

import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import SearchFilterDropdown from "./search-filter-dropdown";

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
    "fandom",
    "mainTags",
  ]);

  const [searchTriggered, setSearchTriggered] = useState(false);

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

  const handleSearch = useCallback(() => {
    setFilteredBookmarks(filterBookmarks());
    setSearchTriggered(false);
  }, [filterBookmarks, setFilteredBookmarks]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchTriggered) {
      handleSearch();
    }
  }, [searchTriggered, handleSearch]);

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
          onKeyDown={handleKeyDown}
        />
        <CommandList></CommandList>
      </Command>
      <Button onClick={() => setSearchTriggered(true)}>Search</Button>
      <SearchFilterDropdown
        filterTypes={filterTypes}
        toggleFilterType={toggleFilterType}
      />
    </div>
  );
}

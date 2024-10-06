"use client";

import { FilterType, FilterTypeDisplayNames } from "../types/filterType";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SettingsAdjustIcon } from "@/assets/icon/settings-adjust";

interface FilterDropdownProps {
  filterTypes: FilterType[];
  toggleFilterType: (type: FilterType) => void;
}

export default function SearchFilterDropdown({
  filterTypes,
  toggleFilterType,
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 aspect-square p-3">
          <SettingsAdjustIcon className="w-full h-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Search By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(FilterTypeDisplayNames).map(([type, label]) => (
          <DropdownMenuCheckboxItem
            key={type}
            checked={filterTypes.includes(type as FilterType)}
            onCheckedChange={() => toggleFilterType(type as FilterType)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

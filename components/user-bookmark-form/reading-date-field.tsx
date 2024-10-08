import { Control, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState, useEffect } from "react";

import { BookmarkForm } from "@/types/bookmark-types";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReadingStatusFieldProps {
  control: Control<BookmarkForm>;
}

export default function ReadingStatusField({
  control,
}: ReadingStatusFieldProps) {
  const { setValue, getValues } = useFormContext<BookmarkForm>();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    setDateRange({
      from: getValues("startDateReading") || undefined,
      to: getValues("endDateReading") || undefined,
    });
  }, [getValues]);

  return (
    <>
      <FormField
        control={control}
        name="startDateReading"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 mt-4">
            <FormLabel>Reading Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className="w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Reading date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range);
                    field.onChange(range?.from);
                    setValue("endDateReading", range?.to ?? null);
                  }}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </>
  );
}

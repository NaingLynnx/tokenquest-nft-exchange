
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, MonthChangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function YearNavigation({ 
  fromYear, 
  toYear, 
  selectedYear, 
  onYearChange 
}: { 
  fromYear: number, 
  toYear: number, 
  selectedYear: number, 
  onYearChange: (year: number) => void 
}) {
  return (
    <Select
      value={selectedYear.toString()}
      onValueChange={(value) => onYearChange(parseInt(value))}
    >
      <SelectTrigger className="h-7 w-20 text-xs font-medium">
        <SelectValue placeholder={selectedYear} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {Array.from({ length: toYear - fromYear + 1 }, (_, i) => toYear - i).map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "buttons",
  fromYear,
  toYear,
  ...props
}: CalendarProps & { fromYear?: number; toYear?: number }) {
  const currentYear = new Date().getFullYear();
  fromYear = fromYear || currentYear - 10;
  toYear = toYear || currentYear;

  const [selectedMonth, setSelectedMonth] = React.useState<Date>(props.defaultMonth || new Date());
  
  const handleYearChange = (year: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(year);
    setSelectedMonth(newDate);
    props.onMonthChange?.(newDate);
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => {
    setSelectedMonth(month);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label: captionLayout === "dropdown-buttons" ? "text-sm font-medium" : "",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex justify-center gap-1 items-center",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Dropdown: captionLayout === "dropdown-buttons" 
          ? ({ value, onChange, children, ...props }) => {
              if (props.name === "months") {
                return (
                  <Select
                    value={value?.toString()}
                    onValueChange={(value) => onChange?.(value)}
                  >
                    <SelectTrigger className="h-7 w-[110px] text-xs font-medium">
                      <SelectValue placeholder={value} />
                    </SelectTrigger>
                    <SelectContent>
                      {children}
                    </SelectContent>
                  </Select>
                );
              }
              return null;
            }
          : undefined,
      }}
      captionLayout={captionLayout}
      onMonthChange={handleMonthChange}
      footer={
        captionLayout === "dropdown-buttons" && fromYear && toYear 
          ? <YearNavigation 
              fromYear={fromYear} 
              toYear={toYear} 
              selectedYear={selectedMonth.getFullYear()} 
              onYearChange={handleYearChange} 
            />
          : undefined
      }
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

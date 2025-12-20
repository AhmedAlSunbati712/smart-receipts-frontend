import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    open: boolean
    date?: Date
    onOpenChange: (open: boolean) => void
    onSelect: (date?: Date) => void
}

export function DatePicker({open, date, onOpenChange, onSelect}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1 mt-2 ">
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full h-15 justify-between font-normal border-darkgrey-300 border-2"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 " align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onSelect(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

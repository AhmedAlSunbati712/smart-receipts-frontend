"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const LABELS: Record<string, string> = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "3m": "Last 3 months",
    "9m": "Last 9 months",
    "12m": "Last 12 months",
}

type HistoryDropProps = {
    value: string;
    setValue: (value: string) => void,
}
export function HistoryDrop({value, setValue} : HistoryDropProps) {
    if (!value) setValue("30d");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="absolute bottom-8 text-teal hover:text-teal" variant="outline">{LABELS[value]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem className={`hover:bg-green-500 ${value == "7d" ? "bg-darkteal" : ""}`} value="7d">Last 7 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className={`${value == "30d" ? "bg-darkteal" : ""}`} value="30d">Last 30 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className={`${value == "3m" ? "bg-darkteal" : ""}`} value="3m">Last 3 months</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className={`${value == "9m" ? "bg-darkteal" : ""}`} value="9m">Last 9 months</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className={`${value == "12m" ? "bg-darkteal" : ""}`} value="12m">Last 12 months</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

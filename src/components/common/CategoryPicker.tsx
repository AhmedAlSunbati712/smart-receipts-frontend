import {useState} from "react"
import React from "react";
import type { Category } from "@/types/receipt";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LABELS: Record<Category, string> = {
    GROCERIES: "Groceries",
    DINING: "Dining",
    ENTERTAINMENT: "Entertainment",
    TRANSPORTATION: "Transportation",
    RENT: "Rent",
    UTILITIES: "Utilities",
    SHOPPING: "Shopping",
    HEALTHCARE: "Healthcare",
    EDUCATION: "Education",
    TRAVEL: "Travel",
    SUBSCRIPTIONS: "Subscriptions",
    INSURANCE: "Insurance",
    PERSONAL: "Personal",
    GIFTS: "Gifts",
    OTHER: "Other",
}
  

interface CategoryPickerProps {
    value?: Category
    onChange: (value: Category) => void
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {

  return (  
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full h-15 mt-2 bg-white border-2 border-darkgrey-300" variant="outline">{value ? LABELS[value]:"Category"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as Category)}>
          <DropdownMenuRadioItem value="GROCERIES">Groceries</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DINING">Dinging</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ENTERTAINMENT">Entertainment</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="TRANSPORTATION">Transportation</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="RENT">Rent</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="UTILITIES">Utilities</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SHOPPING">Shopping</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="HEALTHCARE">Healthcare</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EDUCATION">Education</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="TRAVEL">Travel</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SUBSCRIPTIONS">Subsrcriptions</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="INSURANCE">Insurance</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PERSONAL">Personal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="GIFTS">Gifts</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="OTHER">Other</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

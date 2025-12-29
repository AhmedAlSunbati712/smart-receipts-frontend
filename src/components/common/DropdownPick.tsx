import type { Category } from "@/types/receipt"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

type DropdownPickProps<T extends string> = {
    labels: Record<T, string>
    value?: T
    onChange: (v: T) => void
    placeHolder: string
  }
  
export function DropdownPick<T extends string>({
    labels,
    value,
    onChange,
    placeHolder,
  }: DropdownPickProps<T>) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-full h-15 mt-2 bg-white border-2 border-darkgrey-300"
            variant="outline"
          >
            {value ? labels[value] : placeHolder}
          </Button>
        </DropdownMenuTrigger>
  
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(v) => onChange(v as T)}
          >
            {Object.keys(labels).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
                {labels[key as T]}
            </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
  
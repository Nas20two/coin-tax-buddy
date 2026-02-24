import { FinancialYear } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  financialYears: FinancialYear[];
  selected: string;
  onSelect: (value: string) => void;
}

export function FinancialYearSelector({ financialYears, selected, onSelect }: Props) {
  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="w-[150px] bg-background">
        <SelectValue placeholder="All Years" />
      </SelectTrigger>
      <SelectContent className="bg-background z-50">
        <SelectItem value="all">All Years</SelectItem>
        {financialYears.map((fy) => (
          <SelectItem key={fy.label} value={fy.label}>
            {fy.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

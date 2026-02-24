import { useState, useMemo } from "react";
import { TaxLot } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type SortKey = "dateSold" | "dateAcquired" | "asset" | "amount" | "costAud" | "proceedsAud" | "gainLoss";

export function TaxLedger({ lots }: { lots: TaxLot[] }) {
  const [search, setSearch] = useState("");
  const [holdingFilter, setHoldingFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dateSold");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let result = lots;
    if (search) {
      const q = search.toUpperCase();
      result = result.filter((l) => l.asset.toUpperCase().includes(q));
    }
    if (holdingFilter !== "all") {
      result = result.filter((l) => l.holdingPeriod === holdingFilter);
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "dateSold") cmp = a.dateSold.getTime() - b.dateSold.getTime();
      else if (sortKey === "dateAcquired") cmp = a.dateAcquired.getTime() - b.dateAcquired.getTime();
      else if (sortKey === "asset") cmp = a.asset.localeCompare(b.asset);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else if (sortKey === "costAud") cmp = a.costAud - b.costAud;
      else if (sortKey === "proceedsAud") cmp = a.proceedsAud - b.proceedsAud;
      else if (sortKey === "gainLoss") cmp = a.gainLoss - b.gainLoss;
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [lots, search, holdingFilter, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortIcon = (key: SortKey) =>
    sortKey === key ? (sortAsc ? " ↑" : " ↓") : "";

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">Tax Ledger</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by asset…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-[180px]"
              />
            </div>
            <Select value={holdingFilter} onValueChange={setHoldingFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="Short term">Short Term</SelectItem>
                <SelectItem value="Long term">Long Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer select-none" onClick={() => handleSort("dateSold")}>
                  Date Sold{sortIcon("dateSold")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => handleSort("dateAcquired")}>
                  Date Acquired{sortIcon("dateAcquired")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => handleSort("asset")}>
                  Asset{sortIcon("asset")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right" onClick={() => handleSort("amount")}>
                  Amount{sortIcon("amount")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right" onClick={() => handleSort("costAud")}>
                  Cost (AUD){sortIcon("costAud")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right" onClick={() => handleSort("proceedsAud")}>
                  Proceeds (AUD){sortIcon("proceedsAud")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right" onClick={() => handleSort("gainLoss")}>
                  Gain / Loss{sortIcon("gainLoss")}
                </TableHead>
                <TableHead>Holding Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
                    No matching records
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((lot, i) => (
                  <TableRow key={i}>
                    <TableCell className="tabular-nums">{fmtDate(lot.dateSold)}</TableCell>
                    <TableCell className="tabular-nums">{fmtDate(lot.dateAcquired)}</TableCell>
                    <TableCell className="font-medium">{lot.asset}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {lot.amount.toLocaleString("en-AU", { maximumFractionDigits: 6 })}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{fmt(lot.costAud)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmt(lot.proceedsAud)}</TableCell>
                    <TableCell
                      className={`text-right tabular-nums font-semibold ${
                        lot.gainLoss >= 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {fmt(lot.gainLoss)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          lot.holdingPeriod === "Long term"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {lot.holdingPeriod}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

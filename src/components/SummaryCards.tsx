import { TaxSummary } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-semibold tabular-nums ${
          value >= 0 ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {fmt(value)}
      </span>
    </div>
  );
}

export function SummaryCards({ summary }: { summary: TaxSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base">Short Term</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <StatRow label="Gross Profit" value={summary.shortTerm.grossProfit} />
          <StatRow label="Fees" value={summary.shortTerm.fees} />
          <div className="border-t pt-1 mt-1">
            <StatRow
              label="Net Capital Gains"
              value={summary.shortTerm.netCapitalGains}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <TrendingDown className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base">Long Term</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <StatRow label="Gross Profit" value={summary.longTerm.grossProfit} />
          <StatRow label="Fees" value={summary.longTerm.fees} />
          <StatRow
            label="Before Discount"
            value={summary.longTerm.capitalGainsBeforeDiscount}
          />
          <div className="border-t pt-1 mt-1">
            <StatRow
              label="Net (After 50%)"
              value={summary.longTerm.netCapitalGains}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-3xl font-bold tabular-nums ${
              summary.totalNetCapitalGains >= 0
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {fmt(summary.totalNetCapitalGains)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Net Capital Gains
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

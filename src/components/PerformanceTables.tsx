import { CoinSummary } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function fmt(n: number) {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

function PerformanceTable({
  title,
  data,
}: {
  title: string;
  data: CoinSummary[];
}) {
  const totals = data.reduce(
    (acc, d) => ({
      amountSold: acc.amountSold + d.amountSold,
      purchasedValue: acc.purchasedValue + d.purchasedValue,
      soldValue: acc.soldValue + d.soldValue,
      capitalGains: acc.capitalGains + d.capitalGains,
    }),
    { amountSold: 0, purchasedValue: 0, soldValue: 0, capitalGains: 0 }
  );

  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Amount Sold</TableHead>
              <TableHead className="text-right">Purchased</TableHead>
              <TableHead className="text-right">Sold</TableHead>
              <TableHead className="text-right">Capital Gains</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              data.map((d) => (
                <TableRow key={d.coin}>
                  <TableCell className="font-medium">{d.coin}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {d.amountSold.toLocaleString("en-AU", { maximumFractionDigits: 6 })}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(d.purchasedValue)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(d.soldValue)}</TableCell>
                  <TableCell
                    className={`text-right tabular-nums font-semibold ${
                      d.capitalGains >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {fmt(d.capitalGains)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {data.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell />
                <TableCell className="text-right tabular-nums font-bold">
                  {fmt(totals.purchasedValue)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-bold">
                  {fmt(totals.soldValue)}
                </TableCell>
                <TableCell
                  className={`text-right tabular-nums font-bold ${
                    totals.capitalGains >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {fmt(totals.capitalGains)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}

export function PerformanceTables({
  gains,
  losses,
}: {
  gains: CoinSummary[];
  losses: CoinSummary[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PerformanceTable title="Top Gains" data={gains} />
      <PerformanceTable title="Top Losses" data={losses} />
    </div>
  );
}

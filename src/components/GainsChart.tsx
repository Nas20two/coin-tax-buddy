import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxLot } from "@/lib/types";
import { format } from "date-fns";

interface GainsChartProps {
  taxLots: TaxLot[];
}

export const GainsChart = ({ taxLots }: GainsChartProps) => {
  const data = useMemo(() => {
    const grouped = new Map<string, { gains: number; losses: number; sortKey: string }>();

    for (const lot of taxLots) {
      const date = new Date(lot.dateSold);
      const key = format(date, "MMM yyyy");
      const sortKey = format(date, "yyyy-MM");
      const entry = grouped.get(key) || { gains: 0, losses: 0, sortKey };

      if (lot.gainLoss >= 0) {
        entry.gains += lot.gainLoss;
      } else {
        entry.losses += lot.gainLoss;
      }
      grouped.set(key, entry);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => a[1].sortKey.localeCompare(b[1].sortKey))
      .map(([month, { gains, losses }]) => ({
        month,
        Gains: Math.round(gains * 100) / 100,
        Losses: Math.round(losses * 100) / 100,
      }));
  }, [taxLots]);

  const formatAUD = (value: number) =>
    `$${Math.abs(value).toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Capital Gains & Losses Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatAUD} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`,
                name,
              ]}
            />
            <Legend />
            <Bar dataKey="Gains" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Losses" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { parseCSV } from "@/lib/csvParser";
import { calculateTaxLots, calculateSummary, calculateCoinSummaries } from "@/lib/taxEngine";
import { RawTransaction, TaxLot, TaxSummary, CoinSummary } from "@/lib/types";
import { CsvUpload } from "@/components/CsvUpload";
import { SummaryCards } from "@/components/SummaryCards";
import { PerformanceTables } from "@/components/PerformanceTables";
import { TaxLedger } from "@/components/TaxLedger";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [taxLots, setTaxLots] = useState<TaxLot[] | null>(null);
  const [summary, setSummary] = useState<TaxSummary | null>(null);
  const [gains, setGains] = useState<CoinSummary[]>([]);
  const [losses, setLosses] = useState<CoinSummary[]>([]);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      const transactions: RawTransaction[] = await parseCSV(file);
      if (transactions.length === 0) {
        toast({ title: "No Buy/Sell transactions found", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      const lots = calculateTaxLots(transactions);
      const sum = calculateSummary(lots, transactions);
      const { gains: g, losses: l } = calculateCoinSummaries(lots);
      setTaxLots(lots);
      setSummary(sum);
      setGains(g);
      setLosses(l);
      toast({ title: `Processed ${transactions.length} transactions → ${lots.length} tax lots` });
    } catch (err: any) {
      toast({ title: "Error parsing CSV", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              AU Crypto Tax Calculator
            </h1>
            <p className="text-xs text-muted-foreground">
              CoinSpot FIFO capital gains — 100% client-side
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-6 px-4 py-6">
        <CsvUpload onFileSelect={handleFile} isLoading={isLoading} />

        {summary && taxLots && (
          <>
            <SummaryCards summary={summary} />
            <PerformanceTables gains={gains} losses={losses} />
            <TaxLedger lots={taxLots} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;

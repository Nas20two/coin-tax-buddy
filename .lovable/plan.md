

# Add Financial Year Selector

Add a dropdown to filter all dashboard results by Australian financial year (July 1 -- June 30).

## How It Works
- After a CSV is uploaded and processed, the app detects all available financial years from the transaction data
- A dropdown appears in the header (next to the Export button) letting you pick a specific financial year (e.g., "FY 2023-24") or "All Years"
- Selecting a year filters the tax lots to only those where the **sell date** falls within that July 1 -- June 30 period
- Summary cards, performance tables, tax ledger, and exports all update to reflect the selected year

## Changes

### 1. Helper utility (`src/lib/taxEngine.ts`)
- Add a `getAvailableFinancialYears(taxLots)` function that scans all sell dates and returns a sorted list of FY labels (e.g., `{ label: "FY 2023-24", startDate: Date, endDate: Date }`)
- Add a `filterByFinancialYear(taxLots, fy)` function that filters lots by the selected year

### 2. Financial Year Selector component (`src/components/FinancialYearSelector.tsx`)
- A Select dropdown using the existing Radix `Select` component from `src/components/ui/select.tsx`
- Options: "All Years" + each detected FY
- Ensure the dropdown has a solid background and proper z-index (per knowledge guidance)

### 3. Index page (`src/pages/Index.tsx`)
- Store selected FY in state
- After processing CSV, compute available FYs from the full tax lots
- When FY changes, filter tax lots and recompute summary + coin summaries from the filtered set
- Pass filtered data to all child components (SummaryCards, PerformanceTables, TaxLedger, ExportMenu)
- Place the FY selector in the header alongside the Export button


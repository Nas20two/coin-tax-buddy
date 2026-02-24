

# Add Capital Gains/Losses Chart

A bar chart showing cumulative capital gains and losses over time, placed between the Summary Cards and Performance Tables.

## Chart Design
- **Type**: Bar chart using recharts (already installed)
- **X-axis**: Months (e.g., "Jul 2023", "Aug 2023")
- **Y-axis**: AUD amount
- **Bars**: Two bars per month -- green for gains, red for losses
- **Tooltip**: Shows exact gain/loss values on hover
- Wrapped in a Card component for consistent styling with the rest of the dashboard

## Changes

### 1. New component: `src/components/GainsChart.tsx`
- Accepts `taxLots: TaxLot[]` as a prop
- Groups lots by month of sell date
- Aggregates gains (positive gainLoss) and losses (negative gainLoss) per month
- Renders a `BarChart` from recharts with:
  - Two `Bar` series: "Gains" (green) and "Losses" (red)
  - `XAxis` with month labels, `YAxis` with AUD formatting
  - `Tooltip` and `Legend`
  - Responsive via `ResponsiveContainer`

### 2. Update `src/pages/Index.tsx`
- Import and render `GainsChart` between `SummaryCards` and `PerformanceTables`
- Pass `filteredLots` as the data source so it respects the financial year filter


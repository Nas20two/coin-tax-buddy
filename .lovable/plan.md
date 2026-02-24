

# Australian Crypto Capital Gains Tax Calculator

A fully client-side React application that calculates Australian cryptocurrency capital gains taxes from CoinSpot CSV exports. All data stays in the browser — no backend, no database.

## Feature 1: CSV Upload & Parsing
- Drag-and-drop upload zone accepting only `.csv` files, with a clean visual dropzone
- Parse the CSV in-browser using PapaParse
- Filter for "Buy" and "Sell" rows, extract asset names from the Market column (e.g., "XRP" from "XRP/AUD")
- Parse dates (DD/MM/YYYY hh:mm A format) and numeric fields (Amount, Total AUD, Fee AUD)
- Show validation errors if the CSV format is unexpected

## Feature 2: FIFO Tax Engine
- Group all transactions by asset and sort chronologically
- For each Sell, match against the earliest available Buy lots (FIFO), handling partial lot consumption
- Calculate per-match: Cost Basis, Proceeds, and Capital Gain/Loss
- Determine holding period: **Short Term** (≤365 days, no discount) vs **Long Term** (>365 days, 50% CGT discount on gains)
- Track fees from the `Fee AUD (inc GST)` column

## Feature 3: Summary Cards Dashboard
- **Short Term** card: Gross Profit, Total Fees, Net Capital Gains
- **Long Term** card: Gross Profit, Total Fees, Capital Gains (before discount), Net Capital Gains (after 50% discount)
- **Total** card: Combined Net Capital Gains (Short + Long Term)
- Clean card layout with clear visual hierarchy

## Feature 4: Performance Tables
- Two side-by-side tables: **Top Gains** and **Top Losses** (aggregated per coin)
- Columns: Coin, Amount Sold, Purchased Value, Sold Value, Capital Gains
- Footer row with totals for each table

## Feature 5: Detailed Tax Ledger
- Comprehensive sortable table showing every individual matched tax lot
- Columns: Date Sold, Date Acquired, Asset, Amount, Cost (AUD), Proceeds (AUD), Gain/Loss, Holding Period
- Search bar to filter by asset name
- Dropdown filter for holding period (All / Short Term / Long Term)




# Export Shareable Tax Reports

Add two export buttons so users can download and share reports with their tax agent, matching the Koinly-style formats you uploaded.

## Export 1: Capital Gains CSV Report
A downloadable CSV file with one row per tax lot, matching the Koinly CSV format:
- Columns: Date Sold, Date Acquired, Asset, Amount, Cost (AUD), Proceeds (AUD), Gain / loss, Notes, Wallet Name, Holding period
- Header row: "Capital gains report 2025"
- "Wallet Name" defaults to "CoinSpot", "Notes" left empty
- Dates formatted as DD/MM/YYYY HH:mm
- Numbers formatted with commas for thousands

## Export 2: ATO Summary PDF Report
A downloadable PDF matching the Koinly Australian Summary Report layout:
- Title: "Australian Summary Report 2025"
- Period: auto-detected from the data (earliest to latest transaction date)
- Methodology note (FIFO, client-side)
- Capital gains summary table showing:
  - Total current year capital gains (gross profit)
  - Net capital gains (after deducting losses)
  - Net capital gains after CGT discount (50% long-term discount applied)
  - Net capital loss (if applicable)
- Generated using the browser-native print-to-PDF approach via a styled hidden page, or a lightweight library like jsPDF

## UI Changes
- Add an "Export" dropdown button in the header (visible only after CSV upload/processing)
- Two menu items: "Download CSV Report" and "Download PDF Summary"
- Both trigger instant client-side downloads with no server calls

## Technical Details
- Create `src/lib/reportExporter.ts` with two functions: `exportCSV(taxLots)` and `exportPDF(taxLots, summary)`
- CSV export: build the string manually and trigger a Blob download
- PDF export: use jsPDF (new dependency) to generate a styled single-page PDF matching the Koinly layout
- Add an `ExportMenu` component using the existing dropdown-menu UI component
- Wire the export menu into the Index page header, passing taxLots and summary as props


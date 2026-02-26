# Pocket CGT - Crypto Capital Gains Tax Calculator

A free, privacy-focused crypto tax calculator for Australian taxpayers. Built to avoid paying $75/year to Koinly for a simple tax report.

**Live Demo:** https://pocket-cgt-clean.vercel.app  
**Original Lovable Build:** https://pocketcryptocgt.lovable.app/

## 🚀 Why I Built This

I needed to report crypto capital gains to the ATO for the 2024-2025 financial year. My accountant told me to use Koinly, which charges **$75 AUD per year** just to generate a basic report.

Since I had credits on Lovable, I decided to build my own solution in a weekend. Now I own the code completely, and you can use it too — for free.

## ✨ Features

- **CoinSpot CSV Import** - Upload your transaction history directly
- **CGT Calculation** - Automatic calculation of capital gains/losses
- **ATO-Compliant Reports** - Generate reports ready for your accountant
- **Privacy-First** - Your data never leaves your device (client-side processing)
- **PWA Support** - Install as an app on your phone for offline access
- **Mobile-First Design** - Clean, simple interface optimized for mobile

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Build Tool:** Vite
- **PWA:** Offline-capable with service worker
- **CSV Parsing:** PapaParse
- **PDF Export:** jsPDF

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Nas20two/coin-tax-buddy.git
cd coin-tax-buddy

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 How It Works

1. **Export from CoinSpot** - Download your transaction CSV
2. **Import to Pocket CGT** - Upload the CSV file
3. **Review Transactions** - Check buy/sell entries
4. **Generate Report** - Get your CGT summary for the ATO
5. **Send to Accountant** - Or use for DIY tax filing

## 💰 Compare to Alternatives

| Tool | Price | Notes |
|------|-------|-------|
| **Koinly** | $75/year | Popular, but expensive for basic needs |
| **CoinTracker** | $60-200/year | US-focused, limited AU support |
| **Pocket CGT** | **Free** | Built for Australian taxpayers |

## 🗺️ Roadmap

- [x] CoinSpot CSV import
- [x] Basic CGT calculation
- [x] PDF report generation
- [ ] Support for Binance CSV format
- [ ] Support for Coinbase CSV format
- [ ] Custom domain (pocketcgt.com?)
- [ ] Multi-year tax reporting

## 📄 License

MIT License - feel free to use, modify, and distribute.

---

**Built by:** NaSy Hub  
**Portfolio:** https://nasyhub-olve.vercel.app  
**Contact:** nasiruddin.syed@hotmail.com

*"Built to solve my own problem. Sharing it in case it helps you too."*

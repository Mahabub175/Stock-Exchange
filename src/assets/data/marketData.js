// lib/assetsData.js
import crypto1 from "@/assets/images/Crypto1.png";
import crypto2 from "@/assets/images/Crypto2.png";
import crypto3 from "@/assets/images/Crypto3.png";
import crypto4 from "@/assets/images/Crypto4.png";
import crypto5 from "@/assets/images/Crypto5.png";
import crypto6 from "@/assets/images/Crypto6.png";
import crypto7 from "@/assets/images/Crypto7.png";
import crypto8 from "@/assets/images/Crypto8.png";

import btc from "@/assets/images/btc.png";
import eth from "@/assets/images/eth.png";
import dodge from "@/assets/images/dodge.png";
import bnb from "@/assets/images/bnb.png";
import sol from "@/assets/images/solana.png";

export const allAssets = [
  {
    symbol: "AAPL",
    name: "Apple",
    type: "stock",
    icon: null,
    domain: "apple.com",
    bg: crypto6,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    type: "stock",
    icon: null,
    domain: "tesla.com",
    bg: crypto7,
  },
  {
    symbol: "GOOGL",
    name: "Google",
    type: "stock",
    icon: null,
    domain: "google.com",
    bg: crypto8,
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    type: "stock",
    icon: null,
    domain: "amazon.com",
    bg: crypto1,
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    type: "stock",
    icon: null,
    domain: "microsoft.com",
    bg: crypto2,
  },
  {
    symbol: "BINANCE:BTCUSDT",
    name: "Bitcoin",
    type: "crypto",
    icon: btc,
    domain: null,
    bg: crypto1,
  },
  {
    symbol: "BINANCE:ETHUSDT",
    name: "Ethereum",
    type: "crypto",
    icon: eth,
    domain: null,
    bg: crypto2,
  },
  {
    symbol: "BINANCE:DOGEUSDT",
    name: "Dogecoin",
    type: "crypto",
    icon: dodge,
    domain: null,
    bg: crypto3,
  },
  {
    symbol: "BINANCE:BNBUSDT",
    name: "BNB",
    type: "crypto",
    icon: bnb,
    domain: null,
    bg: crypto4,
  },
  {
    symbol: "BINANCE:SOLUSDT",
    name: "Solana",
    type: "crypto",
    icon: sol,
    domain: null,
    bg: crypto5,
  },
];

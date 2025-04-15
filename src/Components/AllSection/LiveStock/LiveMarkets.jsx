"use client";

import { useEffect, useState, useRef } from "react";

import btc from "@/assets/images/btc.png";
import eth from "@/assets/images/eth.png";
import dodge from "@/assets/images/dodge.png";
import bnb from "@/assets/images/bnb.png";
import sol from "@/assets/images/solana.png";

const stockCompanies = [
  { symbol: "AAPL", domain: "apple.com", name: "Apple", type: "stock" },
  { symbol: "TSLA", domain: "tesla.com", name: "Tesla", type: "stock" },
  { symbol: "GOOGL", domain: "google.com", name: "Google", type: "stock" },
  { symbol: "AMZN", domain: "amazon.com", name: "Amazon", type: "stock" },
  { symbol: "MSFT", domain: "microsoft.com", name: "Microsoft", type: "stock" },
];

const cryptoSymbols = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:SOLUSDT",
];

const cryptoMeta = {
  "BINANCE:BTCUSDT": { name: "Bitcoin", icon: btc },
  "BINANCE:ETHUSDT": { name: "Ethereum", icon: eth },
  "BINANCE:DOGEUSDT": { name: "Dogecoin", icon: dodge },
  "BINANCE:BNBUSDT": { name: "BNB", icon: bnb },
  "BINANCE:SOLUSDT": { name: "Solana", icon: sol },
};

const LiveMarkets = () => {
  const [marketData, setMarketData] = useState({});
  const socketRef = useRef(null);
  const token = "cvutu9hr01qjg13bchf0cvutu9hr01qjg13bchfg";

  useEffect(() => {
    const fetchStockProfiles = async () => {
      const data = {};
      for (const { symbol, name, domain } of stockCompanies) {
        try {
          const [quoteRes, profileRes] = await Promise.all([
            fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`
            ),
            fetch(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`
            ),
          ]);
          const quote = await quoteRes.json();
          const profile = await profileRes.json();

          data[symbol] = {
            type: "stock",
            symbol,
            name,
            price: quote.c || 0,
            logo: profile.logo || `https://logo.clearbit.com/${domain}`,
          };
        } catch (err) {
          console.error(`Error fetching stock data for ${symbol}`, err);
        }
      }
      setMarketData((prev) => ({ ...prev, ...data }));
    };

    fetchStockProfiles();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      [...stockCompanies.map((c) => c.symbol), ...cryptoSymbols].forEach(
        (symbol) => {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
        }
      );
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data) {
        setMarketData((prev) => {
          const updated = { ...prev };
          data.data.forEach((trade) => {
            const sym = trade.s;

            if (updated[sym]) {
              updated[sym].price = trade.p;
            } else {
              const meta = cryptoMeta[sym] || {};
              updated[sym] = {
                type: "crypto",
                symbol: sym,
                name: meta.name || sym.replace("BINANCE:", ""),
                price: trade.p,
                logo: meta.icon?.src,
              };
            }
          });
          return updated;
        });
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  const stocks = stockCompanies
    .map((c) => marketData[c.symbol])
    .filter(Boolean);
  const cryptos = cryptoSymbols
    .map((symbol) => marketData[symbol])
    .filter(Boolean);

  return (
    <div className="my-container mt-20">
      <p className="lg:text-xl font-medium">Trending Assets</p>
      <h2 className="text-lg lg:text-3xl font-medium text-start mb-10">
        Assets accelerating among our investor right now.
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full">
          <ul className="space-y-4">
            {stocks.map((data) => (
              <li
                key={data.symbol}
                className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105 duration-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={data.logo}
                    alt={data.name}
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <div>
                    <div className="font-semibold">{data.name}</div>
                    <div className="text-sm text-gray-500">{data.symbol}</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {data.price ? `$${data.price.toFixed(2)}` : "..."}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <ul className="space-y-4">
            {cryptos.map((data) => (
              <li
                key={data.symbol}
                className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105 duration-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={data.logo}
                    alt={data.name}
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <div>
                    <div className="font-semibold">{data.name}</div>
                    <div className="text-sm text-gray-500">{data.symbol}</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {data.price ? `$${data.price.toFixed(2)}` : "..."}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveMarkets;

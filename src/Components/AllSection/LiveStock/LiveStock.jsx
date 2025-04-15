"use client";

import { useEffect, useState, useRef } from "react";
import LiveCrypto from "./LiveCrypto";

const companies = [
  { symbol: "AAPL", domain: "apple.com", name: "Apple", type: "stock" },
  { symbol: "TSLA", domain: "tesla.com", name: "Tesla", type: "stock" },
  { symbol: "GOOGL", domain: "google.com", name: "Google", type: "stock" },
  { symbol: "AMZN", domain: "amazon.com", name: "Amazon", type: "stock" },
  { symbol: "MSFT", domain: "microsoft.com", name: "Microsoft", type: "stock" },
];

const LiveStock = () => {
  const [companyData, setCompanyData] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = "cvutu9hr01qjg13bchf0cvutu9hr01qjg13bchfg";
      const data = {};

      for (const { symbol, name, domain } of companies) {
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
            symbol,
            name,
            price: quote.c || 0,
            logo: profile.logo || `https://logo.clearbit.com/${domain}`,
          };
        } catch (err) {
          console.error(`Error fetching data for ${symbol}`, err);
        }
      }

      setCompanyData(data);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=cvutu9hr01qjg13bchf0cvutu9hr01qjg13bchfg"
    );
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      companies.forEach(({ symbol }) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        const updated = { ...companyData };
        data.data.forEach((trade) => {
          if (updated[trade.s]) {
            updated[trade.s].price = trade.p;
          }
        });
        setCompanyData({ ...updated });
      }
    });

    return () => {
      socket.close();
    };
  }, [companyData]);

  return (
    <div className="my-container flex flex-col lg:flex-row gap-5 mt-20">
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-6 text-center">
          Live Stock Prices
        </h2>
        <ul className="space-y-4">
          {companies?.map(({ symbol }) => {
            const data = companyData[symbol];
            return (
              <li
                key={symbol}
                className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105 duration-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={data?.logo}
                    alt={data?.name}
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <div>
                    <div className="font-semibold">{data?.name}</div>
                    <div className="text-sm text-gray-500">{symbol}</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {data?.price ? `$${data.price.toFixed(2)}` : "..."}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <LiveCrypto />
    </div>
  );
};

export default LiveStock;

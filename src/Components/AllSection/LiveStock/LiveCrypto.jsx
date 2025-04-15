"use client";

import { useEffect, useState } from "react";

const symbols = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:SOLUSDT",
];

const LiveCrypto = () => {
  const [tradeData, setTradeData] = useState({});

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=cvutu9hr01qjg13bchf0cvutu9hr01qjg13bchfg"
    );

    socket.addEventListener("open", () => {
      symbols.forEach((symbol) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data) {
        setTradeData((prev) => {
          const updates = { ...prev };
          data.data.forEach((trade) => {
            updates[trade.s] = trade;
          });
          return updates;
        });
      }
    });

    return () => {
      symbols.forEach((symbol) => {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
      });
      socket.close();
    };
  }, []);

  console.log(tradeData);

  return (
    <div className="w-full rounded-lg">
      <h2 className="text-2xl font-medium mb-6 text-center">
        Live Crypto Prices
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(tradeData).map(([symbol, data]) => (
          <li
            key={symbol}
            className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105 duration-500 mb-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={data?.logo}
                alt={data?.name}
                className="w-10 h-10 rounded-full object-contain"
              />
              <div>
                <div className="font-semibold">
                  {symbol.replace("BINANCE:", "")}
                </div>
                <div className="text-sm text-gray-500">{symbol}</div>
              </div>
            </div>
            <div className="text-lg font-semibold text-green-600">
              {data?.p ? `$${data.p.toFixed(2)}` : "..."}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveCrypto;

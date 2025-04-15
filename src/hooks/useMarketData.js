import { allAssets } from "@/assets/data/marketData";
import { useEffect, useRef, useState } from "react";

const token = "cvutu9hr01qjg13bchf0cvutu9hr01qjg13bchfg";

export const useMarketData = () => {
  const [marketData, setMarketData] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchStockProfiles = async () => {
      const data = {};
      const stockAssets = allAssets.filter((item) => item.type === "stock");

      for (const asset of stockAssets) {
        const { symbol, domain } = asset;

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
            price: quote.c || 0,
            logo: profile.logo || `https://logo.clearbit.com/${domain}`,
          };
        } catch (err) {
          console.error("Error fetching stock", err);
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
      allAssets.forEach((asset) => {
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: asset.symbol })
        );
      });
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data) {
        setMarketData((prev) => {
          const updated = { ...prev };
          data.data.forEach((trade) => {
            const sym = trade.s;
            const assetMeta = allAssets.find((a) => a.symbol === sym);

            if (updated[sym]) {
              updated[sym].price = trade.p;
            } else {
              updated[sym] = {
                price: trade.p,
                logo:
                  assetMeta?.icon?.src ||
                  `https://logo.clearbit.com/${
                    assetMeta?.domain || "binance.com"
                  }`,
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

  return allAssets.map((asset) => {
    const cleanSymbol = asset.symbol.replace("BINANCE:", "");

    return {
      ...asset,
      symbol: cleanSymbol,
      current_price: marketData[asset.symbol]?.price?.toFixed(2) || 0,
      image:
        asset.icon?.src ||
        marketData[asset.symbol]?.logo ||
        `https://logo.clearbit.com/${asset.domain || "binance.com"}`,
      company_name: asset.name,
    };
  });
};

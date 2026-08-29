'use client';
import { useState, useEffect, useCallback } from 'react';

export interface LiveTokenData {
  ticker: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
  logoImage?: string;
  priceHistory: number[];
}

export type LivePricesMap = Record<string, LiveTokenData>;

export function useLivePrices(refreshIntervalMs = 60000) {
  const [prices, setPrices] = useState<LivePricesMap>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/live-prices');
      if (!res.ok) return;
      const data: LivePricesMap = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch {
      // silently fail — keep showing existing data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [fetchPrices, refreshIntervalMs]);

  return { prices, loading, lastUpdated, refresh: fetchPrices };
}

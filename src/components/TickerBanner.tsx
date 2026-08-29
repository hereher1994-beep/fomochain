'use client';
import React from 'react';
import { MOCK_TOKENS, formatPrice } from '@/lib/mockData';

export default function TickerBanner() {
  const tickerItems = [...MOCK_TOKENS, ...MOCK_TOKENS];

  return (
    <div className="w-full overflow-hidden border-b border-border bg-muted/50 py-2 relative">
      <div className="flex ticker-scroll whitespace-nowrap gap-8" style={{ width: 'max-content' }}>
        {tickerItems?.map((token, index) => (
          <div
            key={`ticker-${token?.id}-${index}`}
            className="flex items-center gap-2 text-sm font-mono shrink-0"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: token?.logoColor }}
            />
            <span className="font-semibold text-foreground">{token?.ticker}</span>
            <span className="tabular-nums text-foreground">{formatPrice(token?.price)}</span>
            <span
              className={`tabular-nums font-semibold ${
                token?.change24h >= 0 ? 'text-gain' : 'text-loss'
              }`}
            >
              {token?.change24h >= 0 ? '+' : ''}{token?.change24h?.toFixed(2)}%
            </span>
            <span className="text-border mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
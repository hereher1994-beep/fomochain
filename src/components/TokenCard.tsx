'use client';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Token, formatPrice, formatMarketCap, formatVolume } from '@/lib/mockData';

const MiniSparkline = dynamic(() => import('./MiniSparkline'), { ssr: false });

interface TokenCardProps {
  token: Token;
  isHot?: boolean;
}

export default function TokenCard({ token, isHot }: TokenCardProps) {
  const isPositive = token.change24h >= 0;

  return (
    <div
      className={`relative rounded-xl p-4 transition-all duration-300 cursor-pointer group ${
        isHot ? 'hot-token-card' : 'glass-card glass-card-hover'
      }`}
    >
      {/* FOMO Score Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {token.fomoScore >= 90 && (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold fomo-badge-hot">
            🔥 {token.fomoScore}
          </span>
        )}
        {token.fomoScore >= 70 && token.fomoScore < 90 && (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold fomo-badge">
            ⚡ {token.fomoScore}
          </span>
        )}
        {token.fomoScore < 70 && (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-muted text-muted-foreground">
            {token.fomoScore}
          </span>
        )}
      </div>

      {/* Token Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 border border-border/50 overflow-hidden bg-muted"
          style={{ backgroundColor: token.logoImage ? undefined : `${token.logoColor}22`, borderColor: `${token.logoColor}44` }}
        >
          {token.logoImage ? (
            <img
              src={token.logoImage}
              alt={`${token.name} logo`}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-lg">${token.logoEmoji}</span>`;
                }
              }}
            />
          ) : (
            <span>{token.logoEmoji}</span>
          )}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-foreground text-sm truncate">{token.name}</div>
          <div className="text-xs font-mono text-muted-foreground">${token.ticker}</div>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-xl font-bold tabular-nums text-foreground font-mono">
          {formatPrice(token.price)}
        </div>
        <div className={`text-sm font-bold tabular-nums ${isPositive ? 'text-gain' : 'text-loss'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(token.change24h).toFixed(2)}% (24h)
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-3 h-12">
        <MiniSparkline
          data={token.priceHistory}
          isPositive={isPositive}
          color={isPositive ? 'var(--green-gain)' : 'var(--red-loss)'}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div>
          <div className="text-muted-foreground mb-0.5">Market Cap</div>
          <div className="font-mono font-semibold tabular-nums">{formatMarketCap(token.marketCap)}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-0.5">Volume 24h</div>
          <div className="font-mono font-semibold tabular-nums">{formatVolume(token.volume24h)}</div>
        </div>
      </div>

      {/* View Button */}
      <Link
        href="/token-detail"
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 bg-muted hover:bg-primary/20 hover:text-primary border border-border hover:border-primary/40 group-hover:border-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        View Token →
      </Link>
    </div>
  );
}
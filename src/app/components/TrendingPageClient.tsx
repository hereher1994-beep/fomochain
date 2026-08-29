'use client';
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import TickerBanner from '@/components/TickerBanner';
import HeroStats from '@/components/HeroStats';
import TokenGateBanner from '@/components/TokenGateBanner';
import AlphaGroupBanner from '@/components/AlphaGroupBanner';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { MOCK_TOKENS, Token } from '@/lib/mockData';
import { useLivePrices } from '@/lib/useLivePrices';

type FilterTab = 'all' | 'hot' | 'new' | 'gainer' | 'loser';

const FILTER_TABS: { id: FilterTab; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '⚡' },
  { id: 'hot', label: 'Hot', emoji: '🔥' },
  { id: 'new', label: 'New', emoji: '🆕' },
  { id: 'gainer', label: 'Gainers', emoji: '📈' },
  { id: 'loser', label: 'Losers', emoji: '📉' },
];

function formatPrice(n: number): string {
  if (n === 0) return '$0.00';
  if (n >= 1000) return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (n >= 1) return `$${n.toFixed(4)}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toExponential(3)}`;
}

function formatLarge(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

interface EnrichedToken extends Token {
  livePrice?: number;
  liveChange24h?: number;
  liveMarketCap?: number;
  liveVolume24h?: number;
  liveLiquidity?: number;
  liveFdv?: number;
  liveLogoImage?: string;
  livePriceHistory?: number[];
}

function TokenMockCard({ token, rank }: { token: EnrichedToken; rank: number }) {
  const price = token.livePrice ?? token.price;
  const change24h = token.liveChange24h ?? token.change24h;
  const marketCap = token.liveMarketCap ?? token.marketCap;
  const volume24h = token.liveVolume24h ?? token.volume24h;
  const liquidity = token.liveLiquidity ?? token.liquidity;
  const logoImage = token.liveLogoImage ?? token.logoImage;
  const isPositive = change24h >= 0;
  const isHot = token.fomoScore >= 70 || change24h >= 20;

  return (
    <Link
      href={`/token-detail?id=${token.id}`}
      className={`relative rounded-xl p-4 transition-all duration-300 cursor-pointer group block ${
        isHot ? 'hot-token-card' : 'glass-card glass-card-hover'
      }`}
    >
      {/* Rank badge */}
      <div className="absolute top-3 left-3 text-xs font-mono text-muted-foreground">
        #{rank}
      </div>

      {/* FOMO Score Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {token.fomoScore >= 70 ? (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold fomo-badge-hot">
            🔥 {token.fomoScore}
          </span>
        ) : token.fomoScore >= 40 ? (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold fomo-badge">
            ⚡ {token.fomoScore}
          </span>
        ) : (
          <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-muted text-muted-foreground">
            {token.fomoScore}
          </span>
        )}
      </div>

      {/* Token Header */}
      <div className="flex items-center gap-3 mb-3 mt-1">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 border border-border/50 overflow-hidden bg-muted"
          style={{ backgroundColor: logoImage ? undefined : token.logoColor + '22' }}
        >
          {logoImage ? (
            <img
              src={logoImage}
              alt={`${token.name} logo`}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span>${token.logoEmoji}</span>`;
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
          {formatPrice(price)}
        </div>
        <div className={`text-sm font-bold tabular-nums ${isPositive ? 'text-gain' : 'text-loss'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}% (24h)
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div>
          <div className="text-muted-foreground mb-0.5">Market Cap</div>
          <div className="font-mono font-semibold tabular-nums">{formatLarge(marketCap)}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-0.5">Volume 24h</div>
          <div className="font-mono font-semibold tabular-nums">{formatLarge(volume24h)}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-0.5">Holders</div>
          <div className="font-mono font-semibold tabular-nums">{token.holders.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-0.5">Liquidity</div>
          <div className="font-mono font-semibold tabular-nums">{formatLarge(liquidity)}</div>
        </div>
      </div>

      {/* 7d change pill */}
      <div className="flex gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${token.change7d >= 0 ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'}`}>
          7d: {token.change7d >= 0 ? '+' : ''}{token.change7d.toFixed(1)}%
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-muted text-muted-foreground capitalize">
          {token.category}
        </span>
      </div>

      {/* View Details */}
      <div className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 bg-muted hover:bg-primary/20 hover:text-primary border border-border hover:border-primary/40 group-hover:border-primary/20">
        View Details →
      </div>
    </Link>
  );
}

export default function TrendingPageClient() {
  const [isTokenHolder, setIsTokenHolder] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { prices, loading, lastUpdated } = useLivePrices(60000);

  // Merge live prices into mock tokens
  const enrichedTokens: EnrichedToken[] = useMemo(() => {
    return MOCK_TOKENS.map((token) => {
      const live = prices[token.ticker.toUpperCase()];
      if (!live) return token;
      return {
        ...token,
        livePrice: live.price > 0 ? live.price : undefined,
        liveChange24h: live.change24h,
        liveMarketCap: live.marketCap > 0 ? live.marketCap : undefined,
        liveVolume24h: live.volume24h > 0 ? live.volume24h : undefined,
        liveLiquidity: live.liquidity > 0 ? live.liquidity : undefined,
        liveFdv: live.fdv > 0 ? live.fdv : undefined,
        liveLogoImage: live.logoImage,
        livePriceHistory: live.priceHistory,
      };
    });
  }, [prices]);

  const filteredTokens = useMemo(() => {
    let list = enrichedTokens;
    if (activeFilter !== 'all') {
      list = list.filter((t) => t.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.ticker.toLowerCase().includes(q)
      );
    }
    return list;
  }, [enrichedTokens, activeFilter, searchQuery]);

  // Top 3 by FOMO score for hero panel
  const topTokens = useMemo(
    () => [...enrichedTokens].sort((a, b) => b.fomoScore - a.fomoScore).slice(0, 3),
    [enrichedTokens]
  );

  return (
    <div className="min-h-screen bg-background">
      <AlphaGroupBanner />
      <Navbar isTokenHolder={isTokenHolder} onConnectWallet={() => setIsTokenHolder(!isTokenHolder)} />
      <TickerBanner />

      {/* HERO */}
      <section className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 pt-8 pb-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Brand + headline */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/images/images_-_2026-08-28T174432.362-1787935498414.jpeg"
                alt="Mitch Robinhood App"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-glow-green"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 bg-primary/10 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  {loading ? 'Loading...' : `Live · ${MOCK_TOKENS.length} Tokens Tracked`}
                  {lastUpdated && !loading && (
                    <span className="text-muted-foreground ml-1">· Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight mb-2">
              <span className="gradient-text-green">Mitch Robinhood</span>{' '}
              <span className="text-foreground">App</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-4">
              🔥 Trending tokens on Robinhood Chain — sorted by FOMO score. Never miss a 100x.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/pre-launch-email-capture" className="btn-primary px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-bold">
                🔔 Get Launch Alerts
              </Link>
              <a
                href="https://app.uniswap.org/#/swap?outputCurrency=PONS_TOKEN_ADDRESS_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-bold transition-colors"
              >
                🚀 Buy $PONS
              </a>
            </div>
          </div>

          {/* Right: Top 3 tokens by FOMO score */}
          <div className="md:w-72 lg:w-80 shrink-0">
            <div className="glass-card rounded-xl border border-primary/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🏆</span>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Top Trending Now</span>
              </div>
              <div className="space-y-2">
                {topTokens.map((token, i) => {
                  const liveLogoImage = token.liveLogoImage ?? token.logoImage;
                  const liveChange24h = token.liveChange24h ?? token.change24h;
                  const liveMarketCap = token.liveMarketCap ?? token.marketCap;
                  return (
                    <Link
                      key={`hero-top-${token.id}`}
                      href={`/token-detail?id=${token.id}`}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono text-muted-foreground w-4">#{i + 1}</span>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-muted"
                          style={{ backgroundColor: liveLogoImage ? undefined : token.logoColor + '22' }}
                        >
                          {liveLogoImage ? (
                            <img
                              src={liveLogoImage}
                              alt={`${token.name} logo`}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-sm">${token.logoEmoji}</span>`;
                                }
                              }}
                            />
                          ) : (
                            <span>{token.logoEmoji}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{token.ticker}</div>
                          <div className="text-xs text-muted-foreground">{formatLarge(liveMarketCap)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${liveChange24h >= 0 ? 'text-gain' : 'text-loss'}`}>
                          {liveChange24h >= 0 ? '+' : ''}{liveChange24h.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">🔥 {token.fomoScore}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 mb-6">
        <HeroStats livePrices={prices} />
      </section>

      {/* TRENDING FEED */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🔥</span>
            <h2 className="text-lg font-black text-foreground uppercase tracking-wide">Trending</h2>
            <span className="text-xs text-muted-foreground font-mono ml-1">Robinhood Chain</span>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted border border-border overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={`filter-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-primary text-primary-foreground shadow-glow-green'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-muted-foreground">
              {filteredTokens.length} token{filteredTokens.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Token Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 mb-10">
        {filteredTokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-xl border border-border">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No tokens found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              No tokens match your current filter or search. Try a different category or clear your search.
            </p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="btn-primary px-5 py-2 rounded-lg text-sm font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {filteredTokens.map((token, i) => (
              <TokenMockCard
                key={`token-mock-${token.id}`}
                token={token}
                rank={i + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Token Gate Banner */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 mb-12">
        <TokenGateBanner />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/images_-_2026-08-28T174432.362-1787935498414.jpeg"
              alt="Mitch Robinhood App"
              className="w-6 h-6 rounded-full object-cover border border-primary/30"
            />
            <span className="text-sm text-muted-foreground">© 2026 Mitch Robinhood App. Not financial advice. DYOR.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/pre-launch-email-capture" className="hover:text-primary transition-colors">
              Notify Me
            </Link>
            <Link href="/token-submission" className="hover:text-primary transition-colors">
              List Token
            </Link>
            <Link href="/admin-login" className="hover:text-muted-foreground/60 transition-colors text-xs">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
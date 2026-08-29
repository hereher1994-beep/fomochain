'use client';
import React from 'react';
import { LivePricesMap } from '@/lib/useLivePrices';

interface Winner {
  rank: number;
  name: string;
  ticker: string;
  emoji: string;
  logoImage?: string;
  alertDate: string;
  alertMC: string;
  alertPrice: string;
  alertPriceNum: number;
  gainPct: number;
}

const TOP_WINNERS: Winner[] = [
  { rank: 1, name: 'Pons Family', ticker: 'PONS', emoji: '🦁', logoImage: 'https://dd.dexscreener.com/ds-data/tokens/robinhood/0x39dbed3a2bd333467115de45665cc57f813c4571.png?size=lg', alertDate: 'Aug 20', alertMC: '$100K', alertPrice: '$0.0001', alertPriceNum: 0.0001, gainPct: 8800 },
  { rank: 2, name: 'Cash Cat', ticker: 'CASHCAT', emoji: '🐱', logoImage: 'https://dd.dexscreener.com/ds-data/tokens/robinhood/0x020bfc650a365f8bb26819deaabf3e21291018b4.png?size=lg', alertDate: 'Aug 15', alertMC: '$100K', alertPrice: '$0.00042', alertPriceNum: 0.00042, gainPct: 638 },
  { rank: 3, name: 'Thinking Cat', ticker: 'HMM', emoji: '🤔', logoImage: 'https://dd.dexscreener.com/ds-data/tokens/robinhood/0x7fe995a80075df3dc8ae11a9b82c7fe4202cd87f.png?size=lg', alertDate: 'Aug 18', alertMC: '$100K', alertPrice: '$0.00018', alertPriceNum: 0.00018, gainPct: 439 },
  { rank: 4, name: 'RChain DEX', ticker: 'RCHAIN', emoji: '⛓️', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=RCHAIN&backgroundColor=3399ff&rowColor=ffffff', alertDate: 'Jan 28', alertMC: '$100K', alertPrice: '$0.0021', alertPriceNum: 0.0021, gainPct: 18086 },
  { rank: 5, name: 'Robinhood Token', ticker: 'RBHD', emoji: '🏹', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=RBHD&backgroundColor=00c805&rowColor=ffffff', alertDate: 'Jan 15', alertMC: '$100K', alertPrice: '$0.42', alertPriceNum: 0.42, gainPct: 919 },
  { rank: 6, name: 'BullRun Capital', ticker: 'BULLRUN', emoji: '🐂', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=BULLRUN&backgroundColor=ffcc00&rowColor=000000', alertDate: 'Jan 5', alertMC: '$100K', alertPrice: '$1.84', alertPriceNum: 1.84, gainPct: 576 },
  { rank: 7, name: 'Alpha Signals', ticker: 'ALPHA', emoji: '📡', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=ALPHA&backgroundColor=ff3366&rowColor=ffffff', alertDate: 'Apr 2', alertMC: '$100K', alertPrice: '$0.0012', alertPriceNum: 0.0012, gainPct: 642 },
  { rank: 8, name: 'GreenYield', ticker: 'GYD', emoji: '🌿', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=GYD&backgroundColor=22aa44&rowColor=ffffff', alertDate: 'May 18', alertMC: '$100K', alertPrice: '$0.008', alertPriceNum: 0.008, gainPct: 788 },
  { rank: 9, name: 'WAGMI Protocol', ticker: 'WAGMI', emoji: '🤝', logoImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1356ae087-1784524213657.png', alertDate: 'Jul 1', alertMC: '$100K', alertPrice: '$0.031', alertPriceNum: 0.031, gainPct: 122 },
  { rank: 10, name: 'HyperLaunch', ticker: 'HYPER', emoji: '⚡', logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=HYPER&backgroundColor=ff6600&rowColor=ffffff', alertDate: 'Jul 22', alertMC: '$100K', alertPrice: '$0.0044', alertPriceNum: 0.0044, gainPct: 350 },
];

function formatPrice(n: number): string {
  if (n === 0) return '$0.00';
  if (n >= 1000) return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (n >= 1) return `$${n.toFixed(4)}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toExponential(3)}`;
}

interface TokenLogoProps {
  winner: Winner;
  liveLogoImage?: string;
}

function TokenLogo({ winner, liveLogoImage }: TokenLogoProps) {
  const src = liveLogoImage ?? winner.logoImage;
  if (src) {
    return (
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border/50 bg-muted">
        <img
          src={src}
          alt={`${winner.name} logo`}
          width={32}
          height={32}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="w-full h-full flex items-center justify-center text-base">${winner.emoji}</span>`;
            }
          }}
        />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border/50 bg-muted text-base">
      {winner.emoji}
    </div>
  );
}

interface HeroStatsProps {
  livePrices?: LivePricesMap;
}

export default function HeroStats({ livePrices }: HeroStatsProps) {
  return (
    <div className="glass-card rounded-xl border border-primary/20 p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <h2 className="text-base font-black text-primary uppercase tracking-wider">Top 10 Mitch Called Coins</h2>
        <span className="ml-auto text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-full">Alerted at $100K MC</span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider px-2 mb-2">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Token</div>
        <div className="col-span-2 text-right hidden sm:block">Alert Date</div>
        <div className="col-span-2 text-right hidden sm:block">Alert Price</div>
        <div className="col-span-3 text-right">% Since Alert</div>
      </div>

      {/* Rows */}
      <div className="space-y-1.5">
        {TOP_WINNERS.map((w) => {
          const live = livePrices?.[w.ticker.toUpperCase()];
          const liveLogoImage = live?.logoImage;
          const currentPrice = live?.price && live.price > 0 ? live.price : null;
          const gainPct = currentPrice
            ? Math.round(((currentPrice - w.alertPriceNum) / w.alertPriceNum) * 100)
            : w.gainPct;
          const currentPriceDisplay = currentPrice ? formatPrice(currentPrice) : null;

          return (
            <div
              key={`winner-${w.ticker}`}
              className="grid grid-cols-12 gap-2 items-center px-2 py-2 rounded-lg bg-muted/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
            >
              {/* Rank */}
              <div className="col-span-1 text-xs font-mono text-muted-foreground">
                {w.rank <= 3 ? (
                  <span>{w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'}</span>
                ) : (
                  <span className="text-muted-foreground">#{w.rank}</span>
                )}
              </div>

              {/* Token name */}
              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0">
                <TokenLogo winner={w} liveLogoImage={liveLogoImage} />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">{w.ticker}</div>
                  <div className="text-xs text-muted-foreground truncate hidden sm:block">
                    {currentPriceDisplay ? (
                      <span className="text-primary font-mono">{currentPriceDisplay}</span>
                    ) : (
                      w.name
                    )}
                  </div>
                </div>
              </div>

              {/* Alert date */}
              <div className="col-span-2 text-right text-xs font-mono text-muted-foreground hidden sm:block">
                {w.alertDate}
              </div>

              {/* Alert price */}
              <div className="col-span-2 text-right text-xs font-mono text-muted-foreground hidden sm:block">
                {w.alertPrice}
              </div>

              {/* % gain */}
              <div className="col-span-6 sm:col-span-3 text-right">
                <span className={`text-sm font-black font-mono ${gainPct >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {gainPct >= 0 ? '+' : ''}{gainPct.toLocaleString()}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        🔔 All tokens above were alerted by <span className="text-primary font-semibold">Mitch</span> at ~$100K market cap
      </p>
    </div>
  );
}
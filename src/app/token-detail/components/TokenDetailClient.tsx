'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TickerBanner from '@/components/TickerBanner';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { MOCK_TOKENS, AI_HYPE_COMMENTS, formatPrice, formatMarketCap, formatNumber } from '@/lib/mockData';
import PriceChart from './PriceChart';
import AIHypeFeed from './AIHypeFeed';
import ReactionsBar from './ReactionsBar';

// Using RBHD as the featured token for the detail page
const TOKEN = MOCK_TOKENS[0];

export default function TokenDetailClient() {
  const [isTokenHolder, setIsTokenHolder] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'chart' | 'hype'>('overview');

  const isPositive = TOKEN.change24h >= 0;
  const relevantComments = AI_HYPE_COMMENTS.filter((c) => c.tokenId === TOKEN.id);
  const allComments =
    relevantComments.length > 0
      ? relevantComments
      : AI_HYPE_COMMENTS.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isTokenHolder={isTokenHolder} onConnectWallet={() => setIsTokenHolder(!isTokenHolder)} />
      <TickerBanner />

      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Trending
          </Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground font-medium">{TOKEN.name}</span>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column — Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Token Header */}
            <div className="glass-card rounded-2xl p-6 neon-border-green">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2"
                    style={{
                      backgroundColor: `${TOKEN.logoColor}22`,
                      borderColor: `${TOKEN.logoColor}55`,
                      boxShadow: `0 0 20px ${TOKEN.logoColor}33`,
                    }}
                  >
                    {TOKEN.logoEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl font-black text-foreground">{TOKEN.name}</h1>
                      <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/30">
                        ${TOKEN.ticker}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-accent/10 text-accent border border-accent/30">
                        🔥 FOMO {TOKEN.fomoScore}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="UsersIcon" size={12} />
                        {formatNumber(TOKEN.holders)} holders
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="ArrowsRightLeftIcon" size={12} />
                        {formatNumber(TOKEN.transactions)} txns
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full pulse-dot"
                          style={{ backgroundColor: TOKEN.logoColor }}
                        />
                        Robinhood Chain
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black tabular-nums font-mono text-foreground">
                    {formatPrice(TOKEN.price)}
                  </div>
                  <div
                    className={`text-lg font-bold tabular-nums ${
                      isPositive ? 'text-gain' : 'text-loss'
                    }`}
                  >
                    {isPositive ? '▲' : '▼'} {Math.abs(TOKEN.change24h).toFixed(2)}% (24h)
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ATH: <span className="font-mono text-warn">{formatPrice(TOKEN.allTimeHigh)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-border">
                <button className="btn-primary px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">
                  🏹 Buy on Robinhood Chain
                </button>
                <a
                  href={TOKEN.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
                >
                  <Icon name="GlobeAltIcon" size={14} />
                  Twitter
                </a>
                <a
                  href={TOKEN.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
                >
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={14} />
                  Telegram
                </a>
                <a
                  href={TOKEN.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
                >
                  <Icon name="LinkIcon" size={14} />
                  Website
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted border border-border">
              {(['overview', 'chart', 'hype'] as const).map((tab) => (
                <button
                  key={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-card text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'overview' && '📊 '}
                  {tab === 'chart' && '📈 '}
                  {tab === 'hype' && '🤖 '}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-4 fade-in-up">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Market Cap', value: formatMarketCap(TOKEN.marketCap), icon: '💰' },
                    { label: 'Volume 24h', value: formatMarketCap(TOKEN.volume24h), icon: '📊' },
                    { label: 'Liquidity', value: formatMarketCap(TOKEN.liquidity), icon: '💧' },
                    { label: 'FDV', value: formatMarketCap(TOKEN.fdv), icon: '🔢' },
                  ].map((stat) => (
                    <div
                      key={`stat-${stat.label}`}
                      className="glass-card rounded-xl p-4 border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold tabular-nums font-mono text-foreground">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="glass-card rounded-xl p-5 border border-border">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="InformationCircleIcon" size={16} className="text-primary" />
                    About {TOKEN.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{TOKEN.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Launch:{' '}
                      <span className="text-foreground font-mono">{TOKEN.launchDate}</span>
                    </span>
                    <span>
                      Category:{' '}
                      <span className="text-primary font-semibold capitalize">{TOKEN.category}</span>
                    </span>
                    <span>
                      Status:{' '}
                      <span className="text-gain font-semibold capitalize">{TOKEN.status}</span>
                    </span>
                  </div>
                </div>

                {/* Reactions */}
                <ReactionsBar
                  isTokenHolder={isTokenHolder}
                  onGateClick={() => setShowGateModal(true)}
                />
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="fade-in-up">
                <PriceChart token={TOKEN} />
              </div>
            )}

            {activeTab === 'hype' && (
              <div className="fade-in-up">
                <AIHypeFeed comments={allComments} />
              </div>
            )}
          </div>

          {/* Right Column — Sidebar */}
          <div className="space-y-5">
            {/* FOMO Score Card */}
            <div className="glass-card rounded-2xl p-5 neon-border-pink">
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
                  FOMO Score
                </div>
                <div className="text-6xl font-black gradient-text-pink mb-2">
                  {TOKEN.fomoScore}
                </div>
                <div className="text-sm text-muted-foreground mb-4">out of 100</div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${TOKEN.fomoScore}%`,
                      background: `linear-gradient(90deg, var(--accent), #ff6633)`,
                    }}
                  />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {TOKEN.fomoScore >= 90
                    ? '🔥 EXTREMELY HIGH — Ape with caution'
                    : TOKEN.fomoScore >= 70
                    ? '⚡ HIGH — Strong momentum detected' :'📊 MODERATE — Monitor closely'}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card rounded-2xl p-5 border border-border space-y-3">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                Token Stats
              </h3>
              {[
                { label: 'Holders', value: formatNumber(TOKEN.holders), change: '+124 today' },
                { label: 'Transactions', value: formatNumber(TOKEN.transactions), change: '+2.4K today' },
                { label: '7d Change', value: `+${TOKEN.change7d}%`, isGain: true },
                { label: 'All-Time High', value: formatPrice(TOKEN.allTimeHigh), isWarn: true },
              ].map((stat) => (
                <div key={`qstat-${stat.label}`} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold font-mono tabular-nums ${
                        stat.isGain ? 'text-gain' : stat.isWarn ? 'text-warn' : 'text-foreground'
                      }`}
                    >
                      {stat.value}
                    </div>
                    {stat.change && (
                      <div className="text-xs text-gain">{stat.change}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Token Gate CTA */}
            {!isTokenHolder && (
              <div className="glass-card rounded-2xl p-5 neon-border-green text-center">
                <div className="text-3xl mb-3">🔒</div>
                <div className="font-bold text-foreground mb-2">Unlock Full Access</div>
                <div className="text-xs text-muted-foreground mb-4">
                  Hold $FOMOX to comment, react, and get exclusive alpha on every token.
                </div>
                <button
                  onClick={() => setIsTokenHolder(true)}
                  className="btn-primary w-full py-2.5 rounded-lg text-sm font-bold"
                >
                  🚀 Buy $FOMOX
                </button>
              </div>
            )}

            {/* AI Hype Preview */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
                  Live AI Feed
                </h3>
                <button
                  onClick={() => setActiveTab('hype')}
                  className="text-xs text-primary hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-2">
                {allComments.slice(0, 3).map((comment) => (
                  <div
                    key={`preview-${comment.id}`}
                    className="text-xs text-muted-foreground p-2 rounded-lg bg-muted/50 border border-border leading-relaxed"
                  >
                    <span className="text-primary font-semibold">{comment.botEmoji} {comment.botName}</span>
                    {': '}
                    {comment.message.slice(0, 80)}...
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Gate Modal */}
      {showGateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setShowGateModal(false)}
        >
          <div
            className="glass-card neon-border-pink rounded-2xl p-8 max-w-sm w-full mx-4 text-center fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-black text-foreground mb-2">Token-Gated Feature</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Hold <span className="text-primary font-bold font-mono">$FOMOX</span> to react to tokens, leave comments, and access exclusive alpha.
            </p>
            <button
              onClick={() => { setIsTokenHolder(true); setShowGateModal(false); }}
              className="btn-accent w-full py-3 rounded-xl text-sm font-bold mb-3"
            >
              🚀 Buy $FOMOX — Unlock Access
            </button>
            <button
              onClick={() => setShowGateModal(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
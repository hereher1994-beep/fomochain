'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface WatchlistToken {
  symbol: string;
  name: string;
  price: string;
  change: number;
  alertPrice: string;
  watching: boolean;
}

interface AlertHistoryItem {
  id: number;
  token: string;
  type: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_WATCHLIST: WatchlistToken[] = [
  { symbol: '$MITCH', name: 'Mitch', price: 'TBA', change: 0, alertPrice: 'TBA', watching: true },
  { symbol: '$PONS', name: 'Pons Family', price: '$0.0042', change: 18.4, alertPrice: '$0.0035', watching: true },
  { symbol: '$CASHCAT', name: 'Cash Cat', price: '$0.0018', change: 34.2, alertPrice: '$0.0012', watching: true },
  { symbol: '$HMM', name: 'Thinking Cat', price: '$0.0009', change: -5.1, alertPrice: '$0.0011', watching: false },
];

const MOCK_ALERTS: AlertHistoryItem[] = [
  { id: 1, token: '$PONS', type: 'BUY', message: 'Alerted at $100K MC — now 18x', time: '2h ago', read: false },
  { id: 2, token: '$CASHCAT', type: 'BUY', message: 'Alerted at $100K MC — now 34x', time: '5h ago', read: false },
  { id: 3, token: '$HMM', type: 'WATCH', message: 'Added to watchlist at $80K MC', time: '1d ago', read: true },
  { id: 4, token: '$MITCH', type: 'UPCOMING', message: 'Next call — stay tuned!', time: 'Soon', read: false },
];

type Tab = 'watchlist' | 'alerts' | 'preferences';

export default function WatchlistClient() {
  const [activeTab, setActiveTab] = useState<Tab>('watchlist');
  const [watchlist, setWatchlist] = useState<WatchlistToken[]>(MOCK_WATCHLIST);
  const [alerts, setAlerts] = useState<AlertHistoryItem[]>(MOCK_ALERTS);
  const [prefs, setPrefs] = useState({
    telegramAlerts: true,
    twitterAlerts: true,
    emailAlerts: false,
    onlyHot: false,
    minMC: '100K',
  });

  const toggleWatch = (symbol: string) => {
    setWatchlist((prev) =>
      prev.map((t) => (t.symbol === symbol ? { ...t, watching: !t.watching } : t))
    );
  };

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeftIcon" size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-black gradient-text-green">My Dashboard</h1>
            <p className="text-xs text-muted-foreground">Watchlist · Alerts · Preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 pb-0 flex gap-1">
          {([
            { id: 'watchlist', label: 'Watchlist', icon: 'StarIcon' },
            { id: 'alerts', label: `Alerts${unreadCount > 0 ? ` (${unreadCount})` : ''}`, icon: 'BellIcon' },
            { id: 'preferences', label: 'Preferences', icon: 'AdjustmentsHorizontalIcon' },
          ] as { id: Tab; label: string; icon: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* WATCHLIST TAB */}
        {activeTab === 'watchlist' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Token Watchlist</h2>
              <span className="text-xs text-muted-foreground">{watchlist.filter((t) => t.watching).length} watching</span>
            </div>
            {watchlist.map((token) => (
              <div
                key={token.symbol}
                className={`glass-card rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 ${
                  token.watching ? 'border border-primary/20' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-black text-primary">
                    {token.symbol.replace('$', '').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-mono font-bold text-foreground">{token.price}</div>
                    <div className={`text-xs font-semibold ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change === 0 ? '—' : `${token.change >= 0 ? '+' : ''}${token.change}%`}
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-muted-foreground">Alert at</div>
                    <div className="text-xs font-mono text-yellow-400">{token.alertPrice}</div>
                  </div>
                  <button
                    onClick={() => toggleWatch(token.symbol)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      token.watching
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon name="StarIcon" size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add token hint */}
            <div className="glass-card rounded-xl p-4 border border-dashed border-border flex items-center gap-3 text-muted-foreground">
              <Icon name="PlusCircleIcon" size={20} />
              <span className="text-sm">More tokens will appear as Mitch calls them</span>
            </div>
          </div>
        )}

        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Alert History</h2>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Mark all read
                </button>
              )}
            </div>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`glass-card rounded-xl p-4 flex items-start gap-3 transition-all duration-200 ${
                  !alert.read ? 'border border-primary/30 bg-primary/5' : ''
                }`}
              >
                <div
                  className={`mt-0.5 px-2 py-0.5 rounded text-xs font-black shrink-0 ${
                    alert.type === 'BUY' ?'bg-green-500/20 text-green-400'
                      : alert.type === 'UPCOMING' ?'bg-yellow-500/20 text-yellow-400' :'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {alert.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{alert.token}</span>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Notification Preferences</h2>

            {/* Notification channels */}
            <div className="glass-card rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Channels</p>
              {[
                { key: 'telegramAlerts', label: 'Telegram Alerts', icon: '📨', desc: 'Get alerts in the Mitch Telegram channel' },
                { key: 'twitterAlerts', label: 'Twitter/X Alerts', icon: '🐦', desc: 'Follow @MITCH_RHAPP for live calls' },
                { key: 'emailAlerts', label: 'Email Alerts', icon: '📧', desc: 'Receive email notifications for new calls' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{pref.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{pref.label}</div>
                      <div className="text-xs text-muted-foreground">{pref.desc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPrefs((p) => ({ ...p, [pref.key]: !p[pref.key as keyof typeof p] }))}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 shrink-0 ${
                      prefs[pref.key as keyof typeof prefs] ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        prefs[pref.key as keyof typeof prefs] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Filter preferences */}
            <div className="glass-card rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Alert Filters</p>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">🔥 Hot tokens only</div>
                  <div className="text-xs text-muted-foreground">Only alert on high FOMO score tokens</div>
                </div>
                <button
                  onClick={() => setPrefs((p) => ({ ...p, onlyHot: !p.onlyHot }))}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 shrink-0 ${
                    prefs.onlyHot ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      prefs.onlyHot ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">💰 Min Market Cap</div>
                  <div className="text-xs text-muted-foreground">Only alert when MC is above threshold</div>
                </div>
                <select
                  value={prefs.minMC}
                  onChange={(e) => setPrefs((p) => ({ ...p, minMC: e.target.value }))}
                  className="text-xs bg-muted border border-border rounded-lg px-2 py-1.5 text-foreground font-semibold"
                >
                  <option value="50K">$50K</option>
                  <option value="100K">$100K</option>
                  <option value="250K">$250K</option>
                  <option value="500K">$500K</option>
                  <option value="1M">$1M</option>
                </select>
              </div>
            </div>

            {/* Save button */}
            <button className="w-full btn-accent py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
              <Icon name="CheckIcon" size={16} />
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

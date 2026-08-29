'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TickerBanner from '@/components/TickerBanner';
import Link from 'next/link';

// ── Placeholder links — update these when ready ──────────────────────────────
const TWITTER_PROFILE_URL = 'https://twitter.com/MITCH_RHAPP';
const TWITTER_QUOTE_TWEET_URL = 'https://twitter.com/intent/tweet?text=I%27m%20getting%20early%20alerts%20on%20%40MITCH_RHAPP%20%F0%9F%9A%80%20Every%20possible%20gem%20with%20100x%2B%20potential%20on%20Robinhood%20Chain%20%23RobinhoodChain%20%23PONS';
const TELEGRAM_CHANNEL_URL = 'https://t.me/mitchRH';
// ─────────────────────────────────────────────────────────────────────────────

const ROBINHOOD_WINNERS = [
  { ticker: 'MOONSHOT', emoji: '🌙', gain: '+353%', alertDate: 'Jun 10' },
  { ticker: 'RCHAIN', emoji: '⛓️', gain: '+18,086%', alertDate: 'Jan 28' },
  { ticker: 'RBHD', emoji: '🏹', gain: '+919%', alertDate: 'Jan 15' },
  { ticker: 'BULLRUN', emoji: '🐂', gain: '+576%', alertDate: 'Jan 5' },
  { ticker: 'ALPHA', emoji: '📡', gain: '+642%', alertDate: 'Apr 2' },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(8000);

  useEffect(() => {
    const duration = 2000;
    const steps = 80;
    const increment = (target - 8000) / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount((prev) => Math.min(prev + increment, target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="tabular-nums font-mono">
      {Math.floor(count).toLocaleString()}
    </span>
  );
}

type Step = 'idle' | 'twitter_follow' | 'twitter_quote' | 'telegram' | 'done';

export default function EmailCaptureClient() {
  const [isTokenHolder, setIsTokenHolder] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [checkedFollow, setCheckedFollow] = useState(false);
  const [checkedQuote, setCheckedQuote] = useState(false);
  const [checkedTelegram, setCheckedTelegram] = useState(false);

  const allDone = checkedFollow && checkedQuote && checkedTelegram;

  const handleUnlock = () => {
    if (allDone) setStep('done');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isTokenHolder={isTokenHolder} onConnectWallet={() => setIsTokenHolder(!isTokenHolder)} />
      <TickerBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 bg-primary/10 text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              <AnimatedCounter target={8247} /> degens already in
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-5">
              Get{' '}
              <span className="gradient-text-green">Early Alerts</span>
              <br />
              on Robinhood Chain Gems
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-3">
              We alert every possible gem with potential for{' '}
              <span className="text-primary font-bold">100x+</span> — before the crowd finds out.
            </p>
            <p className="text-muted-foreground text-base mb-10">
              Complete the steps below to unlock access to our{' '}
              <span className="text-warn font-semibold">Telegram alert channel</span>.
            </p>

            {/* Steps Card */}
            {step === 'done' ? (
              <div className="glass-card neon-border-green rounded-2xl p-8 max-w-lg mx-auto text-center fade-in-up">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-black text-foreground mb-2">You&apos;re In!</h3>
                <p className="text-muted-foreground mb-4">
                  Welcome to the inner circle. Click below to join the Telegram alert channel and start receiving alerts.
                </p>
                <a
                  href={TELEGRAM_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 mb-3"
                >
                  📲 Open Telegram Channel
                </a>
                <Link href="/" className="btn-ghost w-full py-3 rounded-xl text-sm font-bold text-center block">
                  Browse Trending Tokens →
                </Link>
              </div>
            ) : (
              <div className="glass-card rounded-2xl border border-border p-6 max-w-lg mx-auto text-left">
                <p className="text-sm font-bold text-foreground mb-4 text-center uppercase tracking-wider">
                  🔒 3 Steps to Unlock Alerts
                </p>

                {/* Step 1 — Follow Twitter */}
                <div className={`rounded-xl border p-4 mb-3 transition-all ${checkedFollow ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold border ${checkedFollow ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
                      {checkedFollow ? '✓' : '1'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground text-sm mb-1">Follow on Twitter / X</div>
                      <p className="text-xs text-muted-foreground mb-3">Follow <span className="text-primary font-mono">@MITCH_RHAPP</span> to stay updated on every alert.</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={TWITTER_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                        >
                          🐦 Follow on X
                        </a>
                        <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checkedFollow}
                            onChange={(e) => setCheckedFollow(e.target.checked)}
                            className="accent-primary w-3.5 h-3.5"
                          />
                          Done — I followed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 — Quote Tweet */}
                <div className={`rounded-xl border p-4 mb-3 transition-all ${checkedQuote ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold border ${checkedQuote ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
                      {checkedQuote ? '✓' : '2'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground text-sm mb-1">Quote Tweet / Mention Us</div>
                      <p className="text-xs text-muted-foreground mb-3">Quote or mention <span className="text-primary font-mono">@MITCH_RHAPP</span> to spread the word.</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={TWITTER_QUOTE_TWEET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                        >
                          🔁 Quote Tweet
                        </a>
                        <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checkedQuote}
                            onChange={(e) => setCheckedQuote(e.target.checked)}
                            className="accent-primary w-3.5 h-3.5"
                          />
                          Done — I quoted
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 — Join Telegram */}
                <div className={`rounded-xl border p-4 mb-4 transition-all ${checkedTelegram ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold border ${checkedTelegram ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
                      {checkedTelegram ? '✓' : '3'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground text-sm mb-1">Join the Telegram Channel</div>
                      <p className="text-xs text-muted-foreground mb-3">Join our Telegram to receive real-time alerts the moment we spot a gem with 100x+ potential.</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={TELEGRAM_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                        >
                          📲 Join Telegram
                        </a>
                        <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checkedTelegram}
                            onChange={(e) => setCheckedTelegram(e.target.checked)}
                            className="accent-primary w-3.5 h-3.5"
                          />
                          Done — I joined
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unlock button */}
                <button
                  onClick={handleUnlock}
                  disabled={!allDone}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    allDone
                      ? 'btn-primary shadow-glow-green'
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
                  }`}
                >
                  {allDone ? '🔓 Unlock My Alerts' : `Complete all ${[checkedFollow, checkedQuote, checkedTelegram].filter(Boolean).length}/3 steps to unlock`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Winners Proof */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-12">
        <h2 className="text-xl font-black text-foreground text-center mb-6">
          🏆 Our Past Alerts — <span className="gradient-text-green">when we spot a gem</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {ROBINHOOD_WINNERS.map((w) => (
            <div key={`proof-${w.ticker}`} className="glass-card rounded-xl p-3 text-center neon-border-green">
              <div className="text-2xl mb-1">{w.emoji}</div>
              <div className="text-xs font-bold text-foreground font-mono">${w.ticker}</div>
              <div className="text-xs text-muted-foreground mb-1">{w.alertDate}</div>
              <div className="text-sm font-black text-gain">{w.gain}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          All tokens alerted at ~$100K market cap. Past performance is not financial advice. DYOR.
        </p>
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
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
            <a href={TWITTER_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            <Link href="/token-submission" className="hover:text-primary transition-colors">List Token</Link>
            <Link href="/admin-login" className="hover:text-muted-foreground/60 transition-colors text-xs">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
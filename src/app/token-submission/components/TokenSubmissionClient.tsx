'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import TickerBanner from '@/components/TickerBanner';
import Icon from '@/components/ui/AppIcon';

interface TokenSubmissionForm {
  tokenName: string;
  ticker: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  logoUrl: string;
  launchDate: string;
  category: string;
  contactEmail: string;
}

export default function TokenSubmissionClient() {
  const [isTokenHolder, setIsTokenHolder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenSubmissionForm>();

  const onSubmit = async (data: TokenSubmissionForm) => {
    setIsSubmitting(true);
    // BACKEND INTEGRATION: POST /api/token-submissions with form data
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Token submitted! We\'ll review it within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isTokenHolder={isTokenHolder} onConnectWallet={() => setIsTokenHolder(!isTokenHolder)} />
      <TickerBanner />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-10">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/30 bg-accent/10 text-accent mb-4">
            🚀 Token Listing
          </div>
          <h1 className="text-4xl font-black text-foreground mb-3">
            Launch Your Token on{' '}
            <span className="gradient-text-green">Mitch Robinhood App</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get your token in front of{' '}
            <span className="text-primary font-bold">8,247 Robinhood Chain degens</span>{' '}
            with automated pre-launch email blasts.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="xl:col-span-2 relative">
            {/* Lock Overlay */}
            {!isTokenHolder && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl">
                <div className="absolute inset-0 bg-background/85 backdrop-blur-md rounded-2xl" />
                <div className="relative z-10 text-center px-8 py-10 glass-card neon-border-pink rounded-2xl max-w-md mx-4">
                  <div className="text-6xl mb-4">🔒</div>
                  <h2 className="text-2xl font-black text-foreground mb-3">
                    Hold <span className="text-primary font-mono">$PONS</span> to Submit
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Token submissions are exclusive to $PONS holders. Buy $PONS to unlock
                    the submission form, pre-launch email blasts, and featured placement.
                  </p>
                  <button
                    onClick={() => setIsTokenHolder(true)}
                    className="btn-accent px-8 py-3 rounded-xl text-base font-bold w-full mb-3"
                  >
                    🚀 Buy $PONS — Unlock Submissions
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Already holding?{' '}
                    <button
                      onClick={() => setIsTokenHolder(true)}
                      className="text-primary hover:underline"
                    >
                      Connect your wallet →
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Form — Blurred when locked */}
            <div className={`glass-card rounded-2xl p-6 border border-border ${!isTokenHolder ? 'blur-sm pointer-events-none select-none' : ''}`}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black text-foreground mb-3">Token Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your token is under review. We&apos;ll send an email within 24 hours with next steps.
                    Once approved, we&apos;ll schedule your pre-launch email blast automatically.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary px-6 py-3 rounded-xl font-bold"
                  >
                    Submit Another Token
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Token Details</h3>
                      <p className="text-xs text-muted-foreground">Basic information about your token</p>
                    </div>
                  </div>

                  {/* Row 1: Name + Ticker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Token Name <span className="text-accent">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">Full name as it appears on-chain</p>
                      <input
                        {...register('tokenName', { required: 'Token name is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="e.g. MoonShot Protocol"
                      />
                      {errors.tokenName && (
                        <p className="text-loss text-xs mt-1">{errors.tokenName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Ticker Symbol <span className="text-accent">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">3–6 uppercase letters</p>
                      <input
                        {...register('ticker', {
                          required: 'Ticker is required',
                          pattern: { value: /^[A-Z]{2,6}$/, message: 'Uppercase letters only, 2–6 chars' },
                        })}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-mono uppercase"
                        placeholder="e.g. MOON"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.toUpperCase();
                        }}
                      />
                      {errors.ticker && (
                        <p className="text-loss text-xs mt-1">{errors.ticker.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Description <span className="text-accent">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground mb-2">
                      What does your token do? Be specific — vague descriptions get rejected.
                    </p>
                    <textarea
                      {...register('description', {
                        required: 'Description is required',
                        minLength: { value: 50, message: 'At least 50 characters required' },
                      })}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      placeholder="Describe your token's utility, use case, and why Robinhood Chain degens should care..."
                    />
                    {errors.description && (
                      <p className="text-loss text-xs mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Category + Launch Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Category <span className="text-accent">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">Primary token category</p>
                      <select
                        {...register('category', { required: 'Category is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      >
                        <option value="">Select category...</option>
                        <option value="DeFi">DeFi</option>
                        <option value="DEX">DEX / AMM</option>
                        <option value="Meme">Meme Token</option>
                        <option value="NFT">NFT / Gaming</option>
                        <option value="Yield">Yield Farming</option>
                        <option value="Governance">Governance</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Social">Social / Identity</option>
                      </select>
                      {errors.category && (
                <p className="text-loss text-xs mt-1">{errors.category.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Launch Date <span className="text-accent">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Pre-launch email sends 24hrs before this date
                      </p>
                      <input
                        type="date"
                        {...register('launchDate', { required: 'Launch date is required' })}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                      {errors.launchDate && (
                        <p className="text-loss text-xs mt-1">{errors.launchDate.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Divider — Social Links */}
                  <div className="flex items-center gap-3 pt-2 pb-4 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Social &amp; Web Links</h3>
                      <p className="text-xs text-muted-foreground">At least one social link required</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Website
                      </label>
                      <input
                        {...register('website')}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="https://yourtoken.io"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Twitter / X
                      </label>
                      <input
                        {...register('twitter')}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="https://twitter.com/yourtoken"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Telegram
                      </label>
                      <input
                        {...register('telegram')}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="https://t.me/yourtoken"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Logo URL
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">Direct link to your token logo (PNG/SVG)</p>
                      <input
                        {...register('logoUrl')}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="https://cdn.yourtoken.io/logo.png"
                      />
                    </div>
                  </div>

                  {/* Divider — Contact */}
                  <div className="flex items-center gap-3 pt-2 pb-4 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Contact</h3>
                      <p className="text-xs text-muted-foreground">We&apos;ll reach out here for approval</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Contact Email <span className="text-accent">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground mb-2">
                      We&apos;ll send approval status and pre-launch email confirmation here
                    </p>
                    <input
                      type="email"
                      {...register('contactEmail', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="founder@yourtoken.io"
                    />
                    {errors.contactEmail && (
                      <p className="text-loss text-xs mt-1">{errors.contactEmail.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Submitting Token...
                        </>
                      ) : (
                        <>🚀 Submit Token for Review</>
                      )}
                    </button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Submissions reviewed within 24 hours. Pre-launch email blast included for approved tokens.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Pre-Launch Email Blast Card */}
            <div className="glass-card rounded-2xl p-5 neon-border-green">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔔</div>
                <div>
                  <h3 className="font-bold text-foreground">Pre-Launch Email Blast</h3>
                  <p className="text-xs text-muted-foreground">Automated. No extra steps.</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We&apos;ll automatically send a hype email to all{' '}
                <span className="text-primary font-bold">8,247 subscribers</span> exactly{' '}
                <span className="text-warn font-bold">24 hours before</span> your token launches.
                Set your launch date — we handle the rest.
              </p>
              <div className="space-y-2">
                {[
                  '✅ Sent to 8,247+ verified degens',
                  '✅ Custom hype copy for your token',
                  '✅ Includes your social links & website',
                  '✅ Timed 24hrs before your launch',
                  '✅ Open rate avg: 64.8%',
                ].map((item) => (
                  <div key={`feature-${item}`} className="text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* What Happens After */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="ClockIcon" size={16} className="text-primary" />
                What Happens Next
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Submit Your Token', desc: 'Fill out the form and hit submit', color: 'text-primary', time: 'Now' },
                  { step: '2', title: 'Review (24hrs)', desc: 'Our team reviews for legitimacy and quality', color: 'text-warn', time: '~24 hrs' },
                  { step: '3', title: 'Get Listed', desc: 'Your token appears on the trending feed', color: 'text-gain', time: 'Day 2' },
                  { step: '4', title: 'Email Blast Sent', desc: '8,247 degens alerted 24hrs pre-launch', color: 'text-accent', time: 'Auto' },
                ].map((step) => (
                  <div key={`step-${step.step}`} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${step.color}`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{step.title}</span>
                        <span className="text-xs font-mono text-muted-foreground">{step.time}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Listings */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Recent Approvals
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Based Protocol', ticker: 'BASED', change: '+56.8%', emoji: '🔵', date: 'Aug 10' },
                  { name: 'Chad Index', ticker: 'CHAD', change: '+29.8%', emoji: '😎', date: 'Aug 1' },
                  { name: 'WAGMI Protocol', ticker: 'WAGMI', change: '+122.4%', emoji: '🤝', date: 'Jul 1' },
                ].map((token) => (
                  <div key={`recent-${token.ticker}`} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{token.emoji}</span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{token.name}</div>
                        <div className="text-xs font-mono text-muted-foreground">${token.ticker} · {token.date}</div>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gain tabular-nums">{token.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
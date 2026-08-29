'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavbarProps {
  isTokenHolder: boolean;
  onConnectWallet: () => void;
}

const NAV_LINKS = [
  { label: 'Trending', href: '/', icon: 'FireIcon' },
  { label: 'Token Detail', href: '/token-detail', icon: 'ChartBarIcon' },
  { label: 'Launch', href: '/token-submission', icon: 'RocketLaunchIcon' },
  { label: 'Notify Me', href: '/pre-launch-email-capture', icon: 'BellIcon' },
  { label: 'Admin', href: '/admin-login', icon: 'ShieldCheckIcon', subtle: true },
];

const THREE_DOT_MENU = [
  { label: 'My Watchlist', href: '/watchlist', icon: 'StarIcon', desc: 'Tokens, alerts & preferences' },
  { label: 'Alert History', href: '/watchlist', icon: 'BellAlertIcon', desc: 'View past Mitch calls' },
  { label: 'Preferences', href: '/watchlist', icon: 'AdjustmentsHorizontalIcon', desc: 'Notification settings' },
];

export default function Navbar({ isTokenHolder, onConnectWallet }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Close dots menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dotsRef.current && !dotsRef.current.contains(e.target as Node)) {
        setDotsOpen(false);
      }
    }
    if (dotsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dotsOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full glass-card border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/assets/images/images_-_2026-08-28T174432.362-1787935498414.jpeg"
                alt="Mitch Robinhood App Logo"
                width={36}
                height={36}
                className="rounded-full object-cover border border-primary/30 shadow-glow-green"
                style={{ width: 36, height: 36 }}
              />
              <div className="flex flex-col">
                <span className="font-sans font-800 text-lg leading-tight gradient-text-green">
                  Mitch Robinhood
                </span>
                <span className="text-[10px] font-mono text-muted-foreground leading-tight tracking-widest uppercase">
                  Robinhood Chain
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={`nav-${link.href}`}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      link.subtle ? 'text-muted-foreground text-xs' : ''
                    } ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : link.subtle
                        ? 'hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={link.icon as any} size={14} />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/pre-launch-email-capture"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Icon name="BellIcon" size={14} />
                Notify Me
              </Link>
              <button
                onClick={onConnectWallet}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isTokenHolder
                    ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30' :'btn-accent'
                }`}
              >
                {isTokenHolder ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
                    <span className="hidden sm:inline">Holding $MITCH</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Icon name="WalletIcon" size={14} />
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </>
                )}
              </button>

              {/* Three-dot menu */}
              <div className="relative" ref={dotsRef}>
                <button
                  onClick={() => setDotsOpen((v) => !v)}
                  className={`p-2 rounded-lg transition-colors ${
                    dotsOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="More options"
                >
                  <Icon name="EllipsisVerticalIcon" size={20} />
                </button>

                {/* Dropdown */}
                {dotsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 glass-card border border-border rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Account</p>
                    </div>
                    {THREE_DOT_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setDotsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon name={item.icon as any} size={15} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="px-4 py-2 border-t border-border">
                      <p className="text-[10px] text-muted-foreground text-center">
                        🔒 Connect wallet to unlock personalized alerts
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={`mobile-nav-${link.href}`}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={link.icon as any} size={16} />
                    {link.label}
                  </Link>
                );
              })}
              {/* Watchlist in mobile menu too */}
              <Link
                href="/watchlist"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === '/watchlist' ?'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="StarIcon" size={16} />
                My Watchlist
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
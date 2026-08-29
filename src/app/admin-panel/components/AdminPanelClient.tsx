'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import { MOCK_TOKENS, EMAIL_CAMPAIGNS, TOKEN_SUBMISSIONS } from '@/lib/mockData';
import AdminTokenTable from './AdminTokenTable';
import AdminEmailCampaigns from './AdminEmailCampaigns';
import AdminSubmissions from './AdminSubmissions';

type AdminTab = 'overview' | 'tokens' | 'campaigns' | 'submissions';

const STAT_CARDS = [
  {
    id: 'stat-subscribers',
    label: 'Total Subscribers',
    value: '8,247',
    change: '+214 this week',
    icon: '📧',
    color: 'text-primary',
    borderClass: 'neon-border-green',
  },
  {
    id: 'stat-tokens',
    label: 'Tokens Listed',
    value: '12',
    change: '3 pending review',
    icon: '🪙',
    color: 'text-warn',
    borderClass: 'border border-warn/30',
  },
  {
    id: 'stat-emails',
    label: 'Emails Sent',
    value: '39,894',
    change: 'Avg 64.8% open rate',
    icon: '📨',
    color: 'text-accent',
    borderClass: 'neon-border-pink',
  },
  {
    id: 'stat-users',
    label: 'Active Holders',
    value: '2,841',
    change: '+18.4% this month',
    icon: '💎',
    color: 'text-purple',
    borderClass: 'border border-purple/30',
  },
];

export default function AdminPanelClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const TAB_ITEMS: { id: AdminTab; label: string; icon: string; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: 'ChartBarIcon' },
    { id: 'tokens', label: 'Token Management', icon: 'CurrencyDollarIcon', badge: MOCK_TOKENS.length },
    { id: 'campaigns', label: 'Email Campaigns', icon: 'EnvelopeIcon', badge: EMAIL_CAMPAIGNS.length },
    { id: 'submissions', label: 'Pending Submissions', icon: 'InboxArrowDownIcon', badge: TOKEN_SUBMISSIONS.filter((s) => s.status === 'pending').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-bold text-sm gradient-text-green">Mitch Robinhood App</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-bold">
              <Icon name="ShieldCheckIcon" size={12} />
              Admin Panel
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                A
              </div>
              <span className="hidden sm:inline">admin@mitchrobinhood.app</span>
            </div>
            <button
              onClick={() => router.push('/admin-login')}
              className="btn-ghost px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage tokens, email campaigns, and subscriber lists
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-lg font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-gain pulse-dot" />
            Last sync: just now
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((stat) => (
            <div
              key={stat.id}
              className={`glass-card rounded-2xl p-5 ${stat.borderClass} transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{stat.icon}</div>
                <span className={`text-xs font-semibold ${stat.color}`}></span>
              </div>
              <div className={`text-3xl font-black tabular-nums font-mono mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gain">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted border border-border mb-6 overflow-x-auto">
          {TAB_ITEMS.map((tab) => (
            <button
              key={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-card text-foreground border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={14} />
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary' :'bg-muted-foreground/20 text-muted-foreground'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 fade-in-up">
            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="BoltIcon" size={16} className="text-primary" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Send Blast Email', icon: '📨', action: () => setActiveTab('campaigns') },
                  { label: 'Review Submissions', icon: '📋', action: () => setActiveTab('submissions') },
                  { label: 'Add New Token', icon: '➕', action: () => setActiveTab('tokens') },
                  { label: 'View Trending', icon: '🔥', action: () => router.push('/') },
                ].map((action) => (
                  <button
                    key={`qa-${action.label}`}
                    onClick={action.action}
                    className="glass-card rounded-xl p-4 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center group"
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      {action.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="glass-card rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Icon name="EnvelopeIcon" size={16} className="text-accent" />
                  Recent Email Campaigns
                </h3>
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className="text-xs text-primary hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-2">
                {EMAIL_CAMPAIGNS.slice(0, 3).map((campaign) => (
                  <div
                    key={`overview-campaign-${campaign.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {campaign.subject}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {campaign.tokenName} · {campaign.sentAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
                      <div className="text-right">
                        <div className="text-gain font-bold">{campaign.openRate}%</div>
                        <div className="text-muted-foreground">open rate</div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-bold">{campaign.recipientCount.toLocaleString()}</div>
                        <div className="text-muted-foreground">sent</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gain/10 text-gain border border-gain/20 font-semibold">
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Submissions Alert */}
            {TOKEN_SUBMISSIONS.filter((s) => s.status === 'pending').length > 0 && (
              <div className="glass-card neon-border-pink rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⏳</div>
                  <div>
                    <div className="font-bold text-foreground">
                      {TOKEN_SUBMISSIONS.filter((s) => s.status === 'pending').length} Token Submissions Awaiting Review
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Approve or reject to trigger pre-launch email scheduling
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="btn-accent px-4 py-2 rounded-lg text-sm font-bold shrink-0"
                >
                  Review Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="fade-in-up">
            <AdminTokenTable />
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="fade-in-up">
            <AdminEmailCampaigns />
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="fade-in-up">
            <AdminSubmissions />
          </div>
        )}
      </div>
    </div>
  );
}
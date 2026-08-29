'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { MOCK_TOKENS, EMAIL_CAMPAIGNS, EmailCampaign } from '@/lib/mockData';

interface BlastForm {
  tokenId: string;
  subject: string;
  message: string;
}

interface ScheduleForm {
  tokenId: string;
  launchDate: string;
  launchTime: string;
}

export default function AdminEmailCampaigns() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(EMAIL_CAMPAIGNS);
  const [activeForm, setActiveForm] = useState<'blast' | 'schedule'>('blast');
  const [isSending, setIsSending] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const blastForm = useForm<BlastForm>();
  const scheduleForm = useForm<ScheduleForm>();

  const handleBlast = async (data: BlastForm) => {
    setIsSending(true);
    // BACKEND INTEGRATION: POST /api/campaigns/blast with { tokenId, subject, message, recipientType: 'all' }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const token = MOCK_TOKENS.find((t) => t.id === data.tokenId);
    const newCampaign: EmailCampaign = {
      id: `campaign-new-${Date.now()}`,
      tokenId: data.tokenId,
      tokenName: token?.name || 'Unknown Token',
      subject: data.subject,
      sentAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      recipientCount: 8247,
      openRate: 0,
      clickRate: 0,
      type: 'blast',
      status: 'sent',
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setIsSending(false);
    blastForm.reset();
    toast.success(`📨 Blast sent to 8,247 subscribers!`);
  };

  const handleSchedule = async (data: ScheduleForm) => {
    setIsScheduling(true);
    // BACKEND INTEGRATION: POST /api/campaigns/schedule with { tokenId, launchDate, launchTime, sendOffset: '-24h' }
    await new Promise((resolve) => setTimeout(resolve, 1600));
    const token = MOCK_TOKENS.find((t) => t.id === data.tokenId);
    const newCampaign: EmailCampaign = {
      id: `campaign-sched-${Date.now()}`,
      tokenId: data.tokenId,
      tokenName: token?.name || 'Unknown Token',
      subject: `🚀 ${token?.name} launches tomorrow — get in early`,
      sentAt: `${data.launchDate} ${data.launchTime}`,
      recipientCount: 8247,
      openRate: 0,
      clickRate: 0,
      type: 'pre-launch',
      status: 'scheduled',
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setIsScheduling(false);
    scheduleForm.reset();
    toast.success(`⏰ Pre-launch email scheduled — sends 24hrs before ${token?.name} launch`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-foreground text-lg mb-1">Email Campaigns</h3>
        <p className="text-sm text-muted-foreground">
          Blast announcements or schedule automated pre-launch emails to{' '}
          <span className="text-primary font-bold">8,247 subscribers</span>
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Campaigns', value: campaigns.length, icon: '📊' },
          { label: 'Avg Open Rate', value: '64.8%', icon: '👁️' },
          { label: 'Avg Click Rate', value: '29.0%', icon: '🖱️' },
          { label: 'Subscribers', value: '8,247', icon: '👥' },
        ].map((s) => (
          <div key={`cs-${s.label}`} className="glass-card rounded-xl p-4 border border-border text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-foreground tabular-nums font-mono">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Form Tabs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Blast Form */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-2xl">📨</div>
            <div>
              <h4 className="font-bold text-foreground">Send Launch Announcement</h4>
              <p className="text-xs text-muted-foreground">Blast immediately to all 8,247 subscribers</p>
            </div>
          </div>

          <form onSubmit={blastForm.handleSubmit(handleBlast)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Token <span className="text-accent">*</span>
              </label>
              <select
                {...blastForm.register('tokenId', { required: 'Select a token' })}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
              >
                <option value="">Select token...</option>
                {MOCK_TOKENS.map((t) => (
                  <option key={`blast-token-${t.id}`} value={t.id}>
                    {t.logoEmoji} {t.name} (${t.ticker})
                  </option>
                ))}
              </select>
              {blastForm.formState.errors.tokenId && (
                <p className="text-loss text-xs mt-1">{blastForm.formState.errors.tokenId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Email Subject <span className="text-accent">*</span>
              </label>
              <input
                {...blastForm.register('subject', { required: 'Subject is required' })}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                placeholder="🚀 [Token] is LIVE — early buyers already up 30%"
              />
              {blastForm.formState.errors.subject && (
                <p className="text-loss text-xs mt-1">{blastForm.formState.errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Message Body <span className="text-accent">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                The hype copy that goes in the email body
              </p>
              <textarea
                {...blastForm.register('message', {
                  required: 'Message is required',
                  minLength: { value: 20, message: 'At least 20 characters' },
                })}
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                placeholder="Write your hype announcement here. Include token stats, why it's going to pump, and a link to Mitch Robinhood App..."
              />
              {blastForm.formState.errors.message && (
                <p className="text-loss text-xs mt-1">{blastForm.formState.errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn-accent w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending to 8,247 subscribers...
                </>
              ) : (
                '📨 Blast to All Subscribers'
              )}
            </button>
          </form>
        </div>

        {/* Schedule Pre-Launch Form */}
        <div className="glass-card rounded-2xl p-6 neon-border-green">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-2xl">⏰</div>
            <div>
              <h4 className="font-bold text-foreground">Schedule Pre-Launch Email</h4>
              <p className="text-xs text-muted-foreground">
                Auto-sends 24hrs before the token&apos;s launch date
              </p>
            </div>
          </div>

          <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary mb-4 flex items-start gap-2">
            <Icon name="InformationCircleIcon" size={14} className="shrink-0 mt-0.5" />
            Set the token&apos;s launch date and time. The email will automatically send exactly 24 hours before — no manual action needed.
          </div>

          <form onSubmit={scheduleForm.handleSubmit(handleSchedule)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Token <span className="text-accent">*</span>
              </label>
              <select
                {...scheduleForm.register('tokenId', { required: 'Select a token' })}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
              >
                <option value="">Select token to schedule...</option>
                {MOCK_TOKENS.map((t) => (
                  <option key={`sched-token-${t.id}`} value={t.id}>
                    {t.logoEmoji} {t.name} (${t.ticker})
                  </option>
                ))}
              </select>
              {scheduleForm.formState.errors.tokenId && (
                <p className="text-loss text-xs mt-1">{scheduleForm.formState.errors.tokenId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Launch Date <span className="text-accent">*</span>
                </label>
                <input
                  type="date"
                  {...scheduleForm.register('launchDate', { required: 'Launch date required' })}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
                {scheduleForm.formState.errors.launchDate && (
                  <p className="text-loss text-xs mt-1">{scheduleForm.formState.errors.launchDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Launch Time <span className="text-accent">*</span>
                </label>
                <input
                  type="time"
                  {...scheduleForm.register('launchTime', { required: 'Launch time required' })}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
                {scheduleForm.formState.errors.launchTime && (
                  <p className="text-loss text-xs mt-1">{scheduleForm.formState.errors.launchTime.message}</p>
                )}
              </div>
            </div>

            <div className="px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground">
              📧 Email will auto-send to <span className="text-primary font-bold">8,247 subscribers</span> exactly 24hrs before the launch date/time you set above. Subject line is auto-generated from the token name.
            </div>

            <button
              type="submit"
              disabled={isScheduling}
              className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isScheduling ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Scheduling...
                </>
              ) : (
                '⏰ Schedule Pre-Launch Email'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Campaign History Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
            Campaign History
          </h4>
          <span className="text-xs text-muted-foreground">{campaigns.length} campaigns total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Token</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sent</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Open Rate</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Click Rate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={`campaign-row-${campaign.id}`}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="text-sm text-foreground font-medium truncate max-w-[280px]">
                      {campaign.subject}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{campaign.sentAt}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-foreground">{campaign.tokenName}</span>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                        campaign.type === 'pre-launch' ?'bg-primary/10 text-primary border border-primary/20'
                          : campaign.type === 'blast' ?'bg-accent/10 text-accent border border-accent/20' :'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground">
                    {campaign.recipientCount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums hidden lg:table-cell">
                    <span className={campaign.openRate > 0 ? 'text-gain font-semibold' : 'text-muted-foreground'}>
                      {campaign.openRate > 0 ? `${campaign.openRate}%` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums hidden lg:table-cell">
                    <span className={campaign.clickRate > 0 ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                      {campaign.clickRate > 0 ? `${campaign.clickRate}%` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                        campaign.status === 'sent' ?'bg-gain/10 text-gain border border-gain/20'
                          : campaign.status === 'scheduled' ?'bg-warn/10 text-warn border border-warn/20' :'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
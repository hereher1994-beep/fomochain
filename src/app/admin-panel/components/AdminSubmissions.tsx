'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { TOKEN_SUBMISSIONS, TokenSubmission } from '@/lib/mockData';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<TokenSubmission[]>(TOKEN_SUBMISSIONS);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectConfirm, setRejectConfirm] = useState<string | null>(null);

  const filtered = submissions.filter(
    (s) => filterStatus === 'all' || s.status === filterStatus
  );

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' as const } : s))
    );
    const sub = submissions.find((s) => s.id === id);
    toast.success(`✅ ${sub?.tokenName} approved! Pre-launch email will be scheduled automatically.`);
  };

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' as const } : s))
    );
    setRejectConfirm(null);
    const sub = submissions.find((s) => s.id === id);
    toast.error(`${sub?.tokenName} submission rejected`);
  };

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-foreground text-lg">Token Submissions</h3>
          <p className="text-sm text-muted-foreground">
            {pendingCount > 0 ? (
              <span className="text-warn font-semibold">{pendingCount} submissions awaiting review</span>
            ) : (
              'All submissions reviewed'
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted border border-border">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={`sub-filter-${status}`}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                filterStatus === status
                  ? 'bg-card text-foreground border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
              {status !== 'all' && (
                <span className="ml-1.5 text-xs">
                  ({submissions.filter((s) => s.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl border border-border p-12 text-center">
          <div className="text-4xl mb-3">📭</div>
          <div className="font-bold text-foreground mb-2">No submissions found</div>
          <div className="text-sm text-muted-foreground">
            {filterStatus === 'pending' ?'No pending submissions right now — check back soon.'
              : `No ${filterStatus} submissions to show.`}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((submission) => (
            <div
              key={`submission-${submission.id}`}
              className={`glass-card rounded-2xl p-5 border transition-all duration-200 ${
                submission.status === 'pending' ?'border-warn/30 bg-warn/5'
                  : submission.status === 'approved' ?'border-gain/20 bg-gain/5' :'border-loss/20 bg-loss/5 opacity-75'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left — Token Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="font-bold text-foreground text-base">
                      {submission.tokenName}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-muted border border-border text-muted-foreground">
                      ${submission.ticker}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        submission.status === 'pending' ?'bg-warn/20 text-warn border border-warn/30'
                          : submission.status === 'approved' ?'bg-gain/20 text-gain border border-gain/30' :'bg-loss/20 text-loss border border-loss/30'
                      }`}
                    >
                      {submission.status === 'pending' ? '⏳' : submission.status === 'approved' ? '✅' : '❌'} {submission.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-muted text-muted-foreground border border-border">
                      {submission.category}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {submission.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                    <div>
                      <div className="text-muted-foreground mb-0.5">Submitted</div>
                      <div className="font-mono text-foreground">{submission.submittedAt}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-0.5">Launch Date</div>
                      <div className="font-mono text-warn font-semibold">{submission.launchDate}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-0.5">Contact</div>
                      <div className="font-mono text-foreground truncate">{submission.submitterEmail}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-0.5">Website</div>
                      <a
                        href={submission.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-mono truncate block"
                      >
                        {submission.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {submission.twitter && (
                      <a
                        href={submission.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Icon name="GlobeAltIcon" size={12} />
                        Twitter
                      </a>
                    )}
                    <span className="text-muted-foreground">
                      Pre-launch email: auto-schedules 24hrs before{' '}
                      <span className="text-warn font-semibold">{submission.launchDate}</span>
                    </span>
                  </div>
                </div>

                {/* Right — Actions */}
                {submission.status === 'pending' && (
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(submission.id)}
                      className="btn-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                    >
                      <Icon name="CheckIcon" size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectConfirm(submission.id)}
                      className="btn-ghost px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap border-loss/30 text-loss hover:bg-loss/10 hover:border-loss/50"
                    >
                      <Icon name="XMarkIcon" size={14} />
                      Reject
                    </button>
                  </div>
                )}

                {submission.status === 'approved' && (
                  <div className="text-xs text-gain font-semibold flex items-center gap-1.5 shrink-0 mt-1">
                    <Icon name="CheckCircleIcon" size={14} />
                    Approved — email scheduled
                  </div>
                )}

                {submission.status === 'rejected' && (
                  <div className="text-xs text-loss font-semibold flex items-center gap-1.5 shrink-0 mt-1">
                    <Icon name="XCircleIcon" size={14} />
                    Rejected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Confirm Modal */}
      {rejectConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setRejectConfirm(null)}
        >
          <div
            className="glass-card neon-border-pink rounded-2xl p-6 max-w-sm w-full mx-4 fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl mb-3">❌</div>
            <h3 className="text-lg font-black text-foreground mb-2">Reject Submission?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Rejecting{' '}
              <span className="text-foreground font-bold">
                {submissions.find((s) => s.id === rejectConfirm)?.tokenName}
              </span>{' '}
              will notify the submitter and cancel any scheduled pre-launch email.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleReject(rejectConfirm)}
                className="btn-accent flex-1 py-2.5 rounded-xl text-sm font-bold"
              >
                Yes, Reject
              </button>
              <button
                onClick={() => setRejectConfirm(null)}
                className="btn-ghost flex-1 py-2.5 rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { MOCK_TOKENS, Token, formatPrice, formatMarketCap } from '@/lib/mockData';

export default function AdminTokenTable() {
  const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    toast.success('Token removed from listing');
  };

  const handleFeature = (id: string) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'featured' ? 'listed' : 'featured' } : t
      )
    );
    const token = tokens.find((t) => t.id === id);
    toast.success(
      token?.status === 'featured'
        ? `${token.name} removed from featured`
        : `${token?.name} set as featured`
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-foreground text-lg">Token Management</h3>
          <p className="text-sm text-muted-foreground">{tokens.length} tokens listed on Mitch Robinhood App</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all w-48"
            />
          </div>
          <button
            onClick={() => toast.info('Add token form coming soon')}
            className="btn-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap"
          >
            <Icon name="PlusIcon" size={14} />
            Add Token
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Token</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">24h %</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Market Cap</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Volume</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">FOMO</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((token) => (
                <tr
                  key={`admin-token-${token.id}`}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border shrink-0"
                        style={{
                          backgroundColor: `${token.logoColor}22`,
                          borderColor: `${token.logoColor}44`,
                        }}
                      >
                        {token.logoEmoji}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{token.name}</div>
                        <div className="text-xs font-mono text-muted-foreground">${token.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground">
                    {formatPrice(token.price)}
                  </td>
                  <td className={`px-4 py-3 text-right font-mono tabular-nums font-semibold ${token.change24h >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground hidden md:table-cell">
                    {formatMarketCap(token.marketCap)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground hidden lg:table-cell">
                    {formatMarketCap(token.volume24h)}
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        token.fomoScore >= 90
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : token.fomoScore >= 70
                          ? 'bg-warn/20 text-warn border border-warn/30' :'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {token.fomoScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                        token.status === 'featured' ?'bg-primary/20 text-primary border border-primary/30'
                          : token.status === 'listed' ?'bg-gain/10 text-gain border border-gain/20'
                          : token.status === 'pending' ?'bg-warn/10 text-warn border border-warn/20' :'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {token.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingId(token.id)}
                        title="Edit token"
                        className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
                      >
                        <Icon name="PencilIcon" size={14} />
                      </button>
                      <button
                        onClick={() => handleFeature(token.id)}
                        title={token.status === 'featured' ? 'Unfeature' : 'Feature token'}
                        className={`p-1.5 rounded-lg transition-all ${
                          token.status === 'featured' ?'bg-primary/10 text-primary' :'hover:bg-warn/10 hover:text-warn text-muted-foreground'
                        }`}
                      >
                        <Icon name="StarIcon" size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(token.id)}
                        title="Delete token"
                        className="p-1.5 rounded-lg hover:bg-loss/10 hover:text-loss text-muted-foreground transition-all"
                      >
                        <Icon name="TrashIcon" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-semibold">No tokens match your search</div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="glass-card neon-border-pink rounded-2xl p-6 max-w-sm w-full mx-4 fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="text-lg font-black text-foreground mb-2">Remove Token?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              This will remove{' '}
              <span className="text-foreground font-bold">
                {tokens.find((t) => t.id === deleteConfirm)?.name}
              </span>{' '}
              from Mitch Robinhood App. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn-accent flex-1 py-2.5 rounded-xl text-sm font-bold"
              >
                Yes, Remove Token
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-ghost flex-1 py-2.5 rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal placeholder */}
      {editingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setEditingId(null)}
        >
          <div
            className="glass-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 fade-in-up text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl mb-3">✏️</div>
            <h3 className="text-lg font-black text-foreground mb-2">Edit Token</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Full token edit form would connect to{' '}
              <span className="font-mono text-primary">PUT /api/tokens/{editingId}</span>
            </p>
            <button
              onClick={() => setEditingId(null)}
              className="btn-primary w-full py-2.5 rounded-xl text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';
import React, { useState } from 'react';

interface ReactionsBarProps {
  isTokenHolder: boolean;
  onGateClick: () => void;
}

const REACTIONS = [
  { emoji: '🚀', label: 'Rocket', count: 2847 },
  { emoji: '💎', label: 'Diamond Hands', count: 1924 },
  { emoji: '🔥', label: 'Fire', count: 3412 },
  { emoji: '🐋', label: 'Whale', count: 891 },
  { emoji: '📈', label: 'Bullish', count: 2103 },
  { emoji: '⚡', label: 'Electric', count: 1247 },
];

export default function ReactionsBar({ isTokenHolder, onGateClick }: ReactionsBarProps) {
  const [reacted, setReacted] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState(REACTIONS.map((r) => r.count));

  const handleReact = (index: number, emoji: string) => {
    if (!isTokenHolder) {
      onGateClick();
      return;
    }
    const newReacted = new Set(reacted);
    const newCounts = [...counts];
    if (reacted.has(emoji)) {
      newReacted.delete(emoji);
      newCounts[index] -= 1;
    } else {
      newReacted.add(emoji);
      newCounts[index] += 1;
    }
    setReacted(newReacted);
    setCounts(newCounts);
  };

  return (
    <div className="glass-card rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-foreground">Community Reactions</h4>
        {!isTokenHolder && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            🔒 Hold $FOMOX to react
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((reaction, index) => (
          <button
            key={`reaction-${reaction.emoji}`}
            onClick={() => handleReact(index, reaction.emoji)}
            title={reaction.label}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              reacted.has(reaction.emoji) && isTokenHolder
                ? 'bg-primary/20 border-primary/40 text-primary' :'bg-muted border-border text-muted-foreground hover:border-primary/20 hover:text-foreground'
            } ${!isTokenHolder ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <span>{reaction.emoji}</span>
            <span className="tabular-nums font-mono text-xs">
              {counts[index].toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
'use client';
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Token, formatPrice } from '@/lib/mockData';

interface PriceChartProps {
  token: Token;
}

const TIMEFRAMES = ['24H', '7D', '30D', 'ALL'];

const EXTENDED_PRICE_DATA: Record<string, { time: string; price: number; volume: number }[]> = {
  '24H': [
    { time: '00:00', price: 3.82, volume: 420000 },
    { time: '02:00', price: 3.91, volume: 380000 },
    { time: '04:00', price: 3.78, volume: 290000 },
    { time: '06:00', price: 3.94, volume: 510000 },
    { time: '08:00', price: 4.02, volume: 680000 },
    { time: '10:00', price: 3.98, volume: 720000 },
    { time: '12:00', price: 4.14, volume: 940000 },
    { time: '14:00', price: 4.08, volume: 860000 },
    { time: '16:00', price: 4.21, volume: 1100000 },
    { time: '18:00', price: 4.18, volume: 980000 },
    { time: '20:00', price: 4.24, volume: 1240000 },
    { time: '22:00', price: 4.28, volume: 1380000 },
  ],
  '7D': [
    { time: 'Aug 21', price: 2.1, volume: 1200000 },
    { time: 'Aug 22', price: 2.4, volume: 1800000 },
    { time: 'Aug 23', price: 2.0, volume: 1400000 },
    { time: 'Aug 24', price: 2.8, volume: 2200000 },
    { time: 'Aug 25', price: 3.2, volume: 3100000 },
    { time: 'Aug 26', price: 3.8, volume: 5800000 },
    { time: 'Aug 27', price: 4.28, volume: 8940000 },
  ],
  '30D': [
    { time: 'Jul 28', price: 1.2, volume: 800000 },
    { time: 'Aug 1', price: 1.4, volume: 920000 },
    { time: 'Aug 5', price: 1.1, volume: 780000 },
    { time: 'Aug 8', price: 1.6, volume: 1100000 },
    { time: 'Aug 12', price: 1.9, volume: 1400000 },
    { time: 'Aug 15', price: 1.7, volume: 1200000 },
    { time: 'Aug 18', price: 2.1, volume: 1600000 },
    { time: 'Aug 21', price: 2.0, volume: 1400000 },
    { time: 'Aug 24', price: 2.8, volume: 2200000 },
    { time: 'Aug 27', price: 4.28, volume: 8940000 },
  ],
  'ALL': [
    { time: 'Jan 15', price: 0.42, volume: 210000 },
    { time: 'Feb 1', price: 0.68, volume: 380000 },
    { time: 'Mar 1', price: 0.51, volume: 290000 },
    { time: 'Apr 1', price: 0.89, volume: 540000 },
    { time: 'May 1', price: 1.24, volume: 820000 },
    { time: 'Jun 1', price: 0.98, volume: 680000 },
    { time: 'Jul 1', price: 1.61, volume: 1100000 },
    { time: 'Aug 1', price: 1.4, volume: 920000 },
    { time: 'Aug 15', price: 1.7, volume: 1200000 },
    { time: 'Aug 27', price: 4.28, volume: 8940000 },
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-border rounded-xl p-3 text-sm shadow-xl">
        <div className="text-muted-foreground text-xs mb-1 font-mono">{label}</div>
        <div className="font-bold text-foreground tabular-nums font-mono">
          {formatPrice(payload[0]?.value || 0)}
        </div>
        {payload[1] && (
          <div className="text-xs text-muted-foreground mt-0.5 font-mono">
            Vol: ${((payload[1]?.value || 0) / 1_000_000).toFixed(2)}M
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function PriceChart({ token }: PriceChartProps) {
  const [activeTimeframe, setActiveTimeframe] = useState('7D');
  const data = EXTENDED_PRICE_DATA[activeTimeframe] || EXTENDED_PRICE_DATA['7D'];
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  return (
    <div className="glass-card rounded-2xl p-5 border border-border space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            📈 Price Chart
            <span className={`text-sm font-bold tabular-nums ${isPositive ? 'text-gain' : 'text-loss'}`}>
              {isPositive ? '+' : ''}{(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)}%
            </span>
          </h3>
          <div className="text-xs text-muted-foreground mt-0.5">
            {token.name} ({token.ticker}) · Robinhood Chain
          </div>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
          {TIMEFRAMES.map((tf) => (
            <button
              key={`tf-${tf}`}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                activeTimeframe === tf
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? 'var(--green-gain)' : 'var(--red-loss)'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? 'var(--green-gain)' : 'var(--red-loss)'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? 'var(--green-gain)' : 'var(--red-loss)'}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
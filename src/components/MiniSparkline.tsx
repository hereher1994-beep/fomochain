'use client';
import React from 'react';
import { ResponsiveContainer, AreaChart, Area,  } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  isPositive: boolean;
  color: string;
}

export default function MiniSparkline({ data, isPositive, color }: MiniSparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const gradientId = `sparkline-${isPositive ? 'green' : 'red'}-${Math.floor(data[0] * 10000)}`;

  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
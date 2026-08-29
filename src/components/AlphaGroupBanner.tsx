'use client';
import React, { useState, useEffect } from 'react';

export default function AlphaGroupBanner() {
  const [visible, setVisible] = useState(true);

  // Cataphote blink effect
  useEffect(() => {
    const blink = setInterval(() => {
      setVisible((v) => !v);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <div
      className="w-full border-b border-red-500/60 transition-all duration-100"
      style={{
        background: visible
          ? 'linear-gradient(90deg, rgba(220,38,38,0.85) 0%, rgba(185,28,28,0.9) 50%, rgba(220,38,38,0.85) 100%)'
          : 'linear-gradient(90deg, rgba(127,29,29,0.7) 0%, rgba(153,27,27,0.75) 50%, rgba(127,29,29,0.7) 100%)',
        boxShadow: visible ? '0 0 18px 4px rgba(239,68,68,0.7)' : '0 0 4px 1px rgba(239,68,68,0.2)',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-center text-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">👑</span>
          <span className="text-sm sm:text-base font-bold text-white drop-shadow-lg">
            To join the <span className="text-yellow-300 uppercase tracking-wide font-black">Alpha Group</span> — buy{' '}
            <span className="text-yellow-300 font-black">$MITCH</span> on{' '}
            <a
              href="https://flap.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-200 font-black underline underline-offset-2 hover:text-white transition-colors"
            >
              flap.sh
            </a>
          </span>
          <span className="text-xl">👑</span>
        </div>
      </div>
    </div>
  );
}

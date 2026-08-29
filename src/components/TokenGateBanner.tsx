import React from 'react';


export default function TokenGateBanner() {
  return (
    <div className="w-full rounded-xl neon-border-pink bg-gradient-to-r from-accent/5 to-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-3xl">🔒</div>
        <div>
          <div className="font-bold text-foreground text-base">
            Hold <span className="text-primary font-mono">$PONS</span> to unlock comments, reactions &amp; submissions
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">
            Token-gated access — join the inner circle of Robinhood Chain degens
          </div>
        </div>
      </div>
      <a
        href="https://app.uniswap.org/#/swap?outputCurrency=PONS_TOKEN_ADDRESS_HERE"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors"
      >
        🚀 Buy $PONS
      </a>
    </div>
  );
}
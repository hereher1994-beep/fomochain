import { NextResponse } from 'next/server';

// Known Robinhood Chain token addresses from DexScreener
const ROBINHOOD_TOKENS: Record<string, string> = {
  PONS: '0x39dbed3a2bd333467115de45665cc57f813c4571',
  CASHCAT: '0x020bfc650a365f8bb26819deaabf3e21291018b4',
  HMM: '0x7fe995a80075df3dc8ae11a9b82c7fe4202cd87f',
};

const CHAIN_ID = 'robinhood';

export interface LiveTokenData {
  ticker: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
  logoImage?: string;
  priceHistory: number[];
}

async function fetchDexScreenerToken(address: string): Promise<LiveTokenData | null> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/${CHAIN_ID}/${address}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const pairs: any[] = await res.json();
    if (!pairs || pairs.length === 0) return null;

    // Pick the pair with highest liquidity
    const best = pairs.sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];

    const price = parseFloat(best.priceUsd ?? '0');
    const change24h = best.priceChange?.h24 ?? 0;
    const marketCap = best.marketCap ?? 0;
    const volume24h = best.volume?.h24 ?? 0;
    const liquidity = best.liquidity?.usd ?? 0;
    const fdv = best.fdv ?? 0;
    const ticker = best.baseToken?.symbol ?? '';

    // Build a simple 7-point price history from available price changes
    const h1Change = best.priceChange?.h1 ?? 0;
    const h6Change = best.priceChange?.h6 ?? 0;
    const priceHistory = buildPriceHistory(price, change24h, h6Change, h1Change);

    // Icon from DexScreener CDN
    const logoImage = `https://dd.dexscreener.com/ds-data/tokens/${CHAIN_ID}/${address.toLowerCase()}.png?size=lg`;

    return { ticker, price, change24h, marketCap, volume24h, liquidity, fdv, logoImage, priceHistory };
  } catch {
    return null;
  }
}

async function searchDexScreener(query: string): Promise<LiveTokenData | null> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const pairs: any[] = data.pairs ?? [];
    if (pairs.length === 0) return null;

    // Filter to robinhood chain if possible, else take best liquidity
    const robinhoodPairs = pairs.filter((p) => p.chainId === CHAIN_ID);
    const candidates = robinhoodPairs.length > 0 ? robinhoodPairs : pairs;
    const best = candidates.sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];

    const price = parseFloat(best.priceUsd ?? '0');
    const change24h = best.priceChange?.h24 ?? 0;
    const marketCap = best.marketCap ?? 0;
    const volume24h = best.volume?.h24 ?? 0;
    const liquidity = best.liquidity?.usd ?? 0;
    const fdv = best.fdv ?? 0;
    const ticker = best.baseToken?.symbol ?? query;
    const tokenAddress = best.baseToken?.address ?? '';

    const h1Change = best.priceChange?.h1 ?? 0;
    const h6Change = best.priceChange?.h6 ?? 0;
    const priceHistory = buildPriceHistory(price, change24h, h6Change, h1Change);

    const logoImage = tokenAddress
      ? `https://dd.dexscreener.com/ds-data/tokens/${best.chainId}/${tokenAddress.toLowerCase()}.png?size=lg`
      : best.info?.imageUrl ?? undefined;

    return { ticker, price, change24h, marketCap, volume24h, liquidity, fdv, logoImage, priceHistory };
  } catch {
    return null;
  }
}

function buildPriceHistory(
  currentPrice: number,
  change24h: number,
  change6h: number,
  change1h: number
): number[] {
  if (currentPrice === 0) return [0, 0, 0, 0, 0, 0, 0];
  const price24hAgo = currentPrice / (1 + change24h / 100);
  const price6hAgo = currentPrice / (1 + change6h / 100);
  const price1hAgo = currentPrice / (1 + change1h / 100);
  return [
    price24hAgo,
    price24hAgo * 1.02,
    (price24hAgo + price6hAgo) / 2,
    price6hAgo,
    (price6hAgo + price1hAgo) / 2,
    price1hAgo,
    currentPrice,
  ].map((v) => parseFloat(v.toPrecision(6)));
}

export async function GET() {
  const results: Record<string, LiveTokenData> = {};

  // Fetch known Robinhood chain tokens by address
  const addressFetches = Object.entries(ROBINHOOD_TOKENS).map(async ([ticker, address]) => {
    const data = await fetchDexScreenerToken(address);
    if (data) results[ticker] = { ...data, ticker };
  });

  // Search for other tokens on Robinhood chain
  const searchTokens = ['RBHD', 'RCHAIN', 'BULLRUN', 'MOONSHOT', 'DEGEN', 'WAGMI', 'PEPE2', 'CHAD', 'BASED', 'NGMI', 'ALPHA', 'GYD', 'HYPER'];
  const searchFetches = searchTokens.map(async (ticker) => {
    const data = await searchDexScreener(ticker);
    if (data) results[ticker] = { ...data, ticker };
  });

  await Promise.all([...addressFetches, ...searchFetches]);

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}

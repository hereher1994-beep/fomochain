export interface Token {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  transactions: number;
  liquidity: number;
  fdv: number;
  fomoScore: number;
  category: 'hot' | 'new' | 'gainer' | 'loser';
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  logoColor: string;
  logoEmoji: string;
  logoImage?: string;
  launchDate: string;
  priceHistory: number[];
  volumeHistory: number[];
  allTimeHigh: number;
  isFeature: boolean;
  status: 'listed' | 'pending' | 'featured' | 'archived';
}

export interface AIHypeComment {
  id: string;
  tokenId: string;
  botName: string;
  botEmoji: string;
  avatarColor: string;
  message: string;
  timestamp: string;
  likes: number;
  tags: string[];
}

export interface EmailSubscriber {
  id: string;
  email: string;
  joinedAt: string;
  source: string;
}

export interface EmailCampaign {
  id: string;
  tokenId: string;
  tokenName: string;
  subject: string;
  sentAt: string;
  recipientCount: number;
  openRate: number;
  clickRate: number;
  type: 'blast' | 'pre-launch' | 'digest';
  status: 'sent' | 'scheduled' | 'draft';
}

export interface TokenSubmission {
  id: string;
  tokenName: string;
  ticker: string;
  submitterEmail: string;
  website: string;
  twitter: string;
  description: string;
  launchDate: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}

export const MOCK_TOKENS: Token[] = [
{
  id: 'token-rbhd',
  name: 'Robinhood Token',
  ticker: 'RBHD',
  price: 4.2847,
  change24h: 18.4,
  change7d: 42.7,
  marketCap: 42800000,
  volume24h: 8940000,
  holders: 24871,
  transactions: 187432,
  liquidity: 3200000,
  fdv: 128000000,
  fomoScore: 94,
  category: 'hot',
  description: 'The official governance token of the Robinhood Chain ecosystem. RBHD holders vote on protocol upgrades, fee structures, and new token listings.',
  website: 'https://robinhoodchain.io',
  twitter: 'https://twitter.com/robinhoodchain',
  telegram: 'https://t.me/robinhoodchain',
  logoColor: '#00c805',
  logoEmoji: '🏹',
  logoImage: 'https://api.dicebear.com/10.x/identicon/svg?seed=RBHD&backgroundColor=00c805&rowColor=ffffff',
  launchDate: '2026-01-15',
  priceHistory: [2.1, 2.4, 2.0, 2.8, 3.2, 3.8, 4.28],
  volumeHistory: [1200000, 1800000, 1400000, 2200000, 3100000, 5800000, 8940000],
  allTimeHigh: 4.82,
  isFeature: true,
  status: 'featured'
},
{
  id: 'token-pons',
  name: 'Pons Family',
  ticker: 'PONS',
  price: 0.113,
  change24h: 31.2,
  change7d: 210.4,
  marketCap: 113000000,
  volume24h: 5200000,
  holders: 39513,
  transactions: 94821,
  liquidity: 890000,
  fdv: 113000000,
  fomoScore: 99,
  category: 'hot',
  description: 'The utility token of the Pons launchpad on Robinhood Chain. Hold $PONS to unlock premium features, comment on tokens, submit new listings, and earn platform fees.',
  website: 'https://flap.sh',
  twitter: 'https://twitter.com/ponsfamily',
  telegram: 'https://t.me/ponsfamily',
  logoColor: '#ff0066',
  logoEmoji: '🦁',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0ed856f-1772356214053.png",
  launchDate: '2026-03-01',
  priceHistory: [0.021, 0.019, 0.034, 0.051, 0.062, 0.078, 0.113],
  volumeHistory: [180000, 220000, 410000, 680000, 940000, 1600000, 5200000],
  allTimeHigh: 0.125,
  isFeature: true,
  status: 'featured'
},
{
  id: 'token-cashcat',
  name: 'Cash Cat',
  ticker: 'CASHCAT',
  price: 0.1045,
  change24h: 3.76,
  change7d: 38.9,
  marketCap: 103300000,
  volume24h: 1600000,
  holders: 61644,
  transactions: 108441,
  liquidity: 3000000,
  fdv: 103300000,
  fomoScore: 91,
  category: 'hot',
  description: 'Cash Cat is the original name for Robinhood Chain. A community takeover token with massive holder base and deep liquidity on Robinhood Chain.',
  website: 'https://flap.sh',
  twitter: 'https://twitter.com/cashcat',
  telegram: 'https://t.me/cashcat',
  logoColor: '#ffcc00',
  logoEmoji: '🐱',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1316b2eea-1782879214742.png",
  launchDate: '2026-06-14',
  priceHistory: [0.021, 0.028, 0.035, 0.052, 0.071, 0.089, 0.1045],
  volumeHistory: [280000, 420000, 680000, 980000, 1200000, 1400000, 1600000],
  allTimeHigh: 0.182,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-thinkingcat',
  name: 'Thinking Cat',
  ticker: 'HMM',
  price: 0.00764,
  change24h: -17.5,
  change7d: 39.0,
  marketCap: 7540000,
  volume24h: 1600000,
  holders: 6120,
  transactions: 62441,
  liquidity: 392000,
  fdv: 7540000,
  fomoScore: 87,
  category: 'gainer',
  description: 'Thinking Cat (HMM) is a meme token on Robinhood Chain launched in July 2026. One of Mitch\'s top called coins at $100K market cap.',
  website: 'https://flap.sh',
  twitter: 'https://twitter.com/thinkingcathmm',
  telegram: 'https://t.me/thinkingcathmm',
  logoColor: '#9966ff',
  logoEmoji: '🤔',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f487bd4b-1783806467252.png",
  launchDate: '2026-07-17',
  priceHistory: [0.00018, 0.00024, 0.00038, 0.00062, 0.00091, 0.00097, 0.00764],
  volumeHistory: [89000, 110000, 180000, 320000, 610000, 1200000, 1600000],
  allTimeHigh: 0.0271,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-moonshot',
  name: 'MoonShot Protocol',
  ticker: 'MOONSHOT',
  price: 0.00412,
  change24h: 62.8,
  change7d: 214.3,
  marketCap: 4120000,
  volume24h: 1840000,
  holders: 8921,
  transactions: 62441,
  liquidity: 412000,
  fdv: 20600000,
  fomoScore: 97,
  category: 'gainer',
  description: 'MoonShot is a yield-optimizing protocol on Robinhood Chain that automatically compounds your gains across multiple liquidity pools.',
  website: 'https://moonshot.finance',
  twitter: 'https://twitter.com/moonshotfi',
  telegram: 'https://t.me/moonshotfi',
  logoColor: '#9966ff',
  logoEmoji: '🌙',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=MOON&backgroundColor=9966ff&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-06-10',
  priceHistory: [0.00091, 0.00088, 0.00102, 0.00134, 0.00198, 0.00312, 0.00412],
  volumeHistory: [89000, 110000, 180000, 320000, 610000, 1200000, 1840000],
  allTimeHigh: 0.00431,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-degen',
  name: 'Degen Finance',
  ticker: 'DEGEN',
  price: 1.2841,
  change24h: -8.3,
  change7d: -22.1,
  marketCap: 12840000,
  volume24h: 3210000,
  holders: 18442,
  transactions: 142300,
  liquidity: 2100000,
  fdv: 64200000,
  fomoScore: 61,
  category: 'loser',
  description: 'High-risk, high-reward leveraged yield farming on Robinhood Chain. Not for the faint of heart — true degens only.',
  website: 'https://degenfi.xyz',
  twitter: 'https://twitter.com/degenfinance',
  telegram: 'https://t.me/degenfinance',
  logoColor: '#ff6633',
  logoEmoji: '💀',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16585e937-1768495387062.png",
  launchDate: '2026-02-20',
  priceHistory: [1.82, 1.94, 1.78, 1.61, 1.48, 1.39, 1.28],
  volumeHistory: [4800000, 4200000, 3900000, 3600000, 3400000, 3300000, 3210000],
  allTimeHigh: 2.41,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-rchain',
  name: 'RChain DEX',
  ticker: 'RCHAIN',
  price: 0.3819,
  change24h: 14.2,
  change7d: 38.9,
  marketCap: 19095000,
  volume24h: 4820000,
  holders: 31204,
  transactions: 224810,
  liquidity: 6400000,
  fdv: 95475000,
  fomoScore: 88,
  category: 'hot',
  description: 'The native DEX aggregator for Robinhood Chain, routing trades across all liquidity sources for best execution.',
  website: 'https://rchain.exchange',
  twitter: 'https://twitter.com/rchaindex',
  telegram: 'https://t.me/rchaindex',
  logoColor: '#3399ff',
  logoEmoji: '⛓️',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=RC&backgroundColor=3399ff&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-01-28',
  priceHistory: [0.21, 0.24, 0.22, 0.26, 0.29, 0.34, 0.38],
  volumeHistory: [1800000, 2100000, 1900000, 2600000, 3200000, 4100000, 4820000],
  allTimeHigh: 0.412,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-bullrun',
  name: 'BullRun Capital',
  ticker: 'BULLRUN',
  price: 12.441,
  change24h: 7.8,
  change7d: 19.3,
  marketCap: 62205000,
  volume24h: 7840000,
  holders: 41893,
  transactions: 312440,
  liquidity: 9800000,
  fdv: 186615000,
  fomoScore: 82,
  category: 'gainer',
  description: 'BullRun Capital is an on-chain hedge fund protocol. Stake BULLRUN to get exposure to a managed portfolio of Robinhood Chain blue chips.',
  website: 'https://bullruncapital.io',
  twitter: 'https://twitter.com/bullruncap',
  telegram: 'https://t.me/bullruncap',
  logoColor: '#ffcc00',
  logoEmoji: '🐂',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=BULL&backgroundColor=ffcc00&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-01-05',
  priceHistory: [9.2, 9.8, 10.4, 11.1, 11.8, 12.0, 12.44],
  volumeHistory: [3200000, 3800000, 4100000, 5200000, 6100000, 7200000, 7840000],
  allTimeHigh: 13.81,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-alpha',
  name: 'Alpha Signals',
  ticker: 'ALPHA',
  price: 0.00891,
  change24h: -14.7,
  change7d: -31.2,
  marketCap: 891000,
  volume24h: 241000,
  holders: 4218,
  transactions: 28441,
  liquidity: 198000,
  fdv: 4455000,
  fomoScore: 38,
  category: 'loser',
  description: 'Alpha Signals tokenizes on-chain analytics signals. Token holders receive early alerts on whale movements and large transactions.',
  website: 'https://alphasignals.io',
  twitter: 'https://twitter.com/alphasignals',
  telegram: 'https://t.me/alphasignals',
  logoColor: '#ff3366',
  logoEmoji: '📡',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=ALPHA&backgroundColor=ff3366&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-04-12',
  priceHistory: [0.0148, 0.0141, 0.0132, 0.0124, 0.0112, 0.0098, 0.0089],
  volumeHistory: [580000, 510000, 470000, 420000, 380000, 310000, 241000],
  allTimeHigh: 0.0221,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-wagmi',
  name: 'WAGMI Protocol',
  ticker: 'WAGMI',
  price: 0.00041,
  change24h: 44.8,
  change7d: 122.4,
  marketCap: 2050000,
  volume24h: 891000,
  holders: 6841,
  transactions: 48221,
  liquidity: 241000,
  fdv: 10250000,
  fomoScore: 93,
  category: 'gainer',
  description: 'We Are All Gonna Make It — WAGMI is a community-first meme token on Robinhood Chain with actual utility: staking rewards and governance.',
  website: 'https://wagmiprotocol.xyz',
  twitter: 'https://twitter.com/wagmiprotocol',
  telegram: 'https://t.me/wagmiprotocol',
  logoColor: '#00ff88',
  logoEmoji: '🤝',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1356ae087-1784524213657.png",
  launchDate: '2026-07-01',
  priceHistory: [0.000082, 0.000091, 0.000118, 0.000162, 0.000241, 0.000318, 0.00041],
  volumeHistory: [48000, 72000, 118000, 210000, 380000, 620000, 891000],
  allTimeHigh: 0.000441,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-ngmi',
  name: 'NGMI Vault',
  ticker: 'NGMI',
  price: 0.000018,
  change24h: -41.2,
  change7d: -68.4,
  marketCap: 180000,
  volume24h: 42000,
  holders: 1841,
  transactions: 12441,
  liquidity: 28000,
  fdv: 900000,
  fomoScore: 12,
  category: 'loser',
  description: 'Not Gonna Make It — the anti-meme. NGMI is a social experiment token testing the hypothesis that negative sentiment tokens still pump.',
  website: 'https://ngmi.lol',
  twitter: 'https://twitter.com/ngmivault',
  telegram: 'https://t.me/ngmivault',
  logoColor: '#666688',
  logoEmoji: '📉',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=NGMI&backgroundColor=666688&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-07-20',
  priceHistory: [0.000091, 0.000082, 0.000068, 0.000054, 0.000038, 0.000026, 0.000018],
  volumeHistory: [210000, 180000, 148000, 112000, 84000, 61000, 42000],
  allTimeHigh: 0.000102,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-pepe2',
  name: 'PEPE 2.0',
  ticker: 'PEPE2',
  price: 0.000248,
  change24h: 28.4,
  change7d: 74.2,
  marketCap: 6200000,
  volume24h: 2840000,
  holders: 14821,
  transactions: 108441,
  liquidity: 980000,
  fdv: 31000000,
  fomoScore: 86,
  category: 'hot',
  description: 'The next evolution of the legendary meme token, now living natively on Robinhood Chain with faster swaps and lower fees.',
  website: 'https://pepe2.meme',
  twitter: 'https://twitter.com/pepe2chain',
  telegram: 'https://t.me/pepe2chain',
  logoColor: '#44bb44',
  logoEmoji: '🐸',
  logoImage: "https://img.rocket.new/generatedImages/rocket_gen_img_163a4f1ea-1778410813230.png",
  launchDate: '2026-06-25',
  priceHistory: [0.000098, 0.000112, 0.000108, 0.000138, 0.000168, 0.000201, 0.000248],
  volumeHistory: [480000, 620000, 580000, 840000, 1200000, 1980000, 2840000],
  allTimeHigh: 0.000261,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-chad',
  name: 'Chad Index',
  ticker: 'CHAD',
  price: 0.8841,
  change24h: 11.4,
  change7d: 29.8,
  marketCap: 8841000,
  volume24h: 1820000,
  holders: 9214,
  transactions: 72441,
  liquidity: 1420000,
  fdv: 44205000,
  fomoScore: 78,
  category: 'new',
  description: 'Chad Index tracks the top 10 highest FOMO-scoring tokens on Robinhood Chain in a single token, rebalanced weekly.',
  website: 'https://chadindex.finance',
  twitter: 'https://twitter.com/chadindex',
  telegram: 'https://t.me/chadindex',
  logoColor: '#ff9900',
  logoEmoji: '😎',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=CHAD&backgroundColor=ff9900&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-08-01',
  priceHistory: [0.61, 0.64, 0.68, 0.72, 0.78, 0.84, 0.884],
  volumeHistory: [480000, 620000, 710000, 890000, 1100000, 1500000, 1820000],
  allTimeHigh: 0.921,
  isFeature: false,
  status: 'listed'
},
{
  id: 'token-based',
  name: 'Based Protocol',
  ticker: 'BASED',
  price: 0.04218,
  change24h: 22.1,
  change7d: 56.8,
  marketCap: 4218000,
  volume24h: 1240000,
  holders: 7841,
  transactions: 58441,
  liquidity: 640000,
  fdv: 21090000,
  fomoScore: 91,
  category: 'new',
  description: 'Based Protocol is a decentralized social graph for Robinhood Chain — your on-chain identity, reputation, and social connections.',
  website: 'https://based.social',
  twitter: 'https://twitter.com/basedprotocol',
  telegram: 'https://t.me/basedprotocol',
  logoColor: '#6699ff',
  logoEmoji: '🔵',
  logoImage: 'https://api.dicebear.com/10.x/shapes/svg?seed=BASED&backgroundColor=6699ff&shape1Color=ffffff&shape2Color=00ff44&shape3Color=009900',
  launchDate: '2026-08-10',
  priceHistory: [0.018, 0.021, 0.024, 0.028, 0.032, 0.038, 0.0422],
  volumeHistory: [180000, 240000, 320000, 480000, 680000, 980000, 1240000],
  allTimeHigh: 0.0441,
  isFeature: false,
  status: 'listed'
}];


export const AI_HYPE_COMMENTS: AIHypeComment[] = [
{
  id: 'comment-001',
  tokenId: 'token-rbhd',
  botName: 'AlphaBot_9000',
  botEmoji: '🤖',
  avatarColor: '#00ff88',
  message: 'Chart pattern SCREAMING 100x incoming 📈 Smart money has been accumulating for 3 weeks — this breakout is real. RBHD is about to go absolutely NUCLEAR 🚀🚀🚀',
  timestamp: '2 min ago',
  likes: 847,
  tags: ['#bullish', '#100x', '#breakout']
},
{
  id: 'comment-002',
  tokenId: 'token-rbhd',
  botName: 'WhaleAlert_AI',
  botEmoji: '🐋',
  avatarColor: '#3399ff',
  message: 'JUST DETECTED: 2.4M $RBHD moved off Binance cold wallet to a fresh address 👀 This is the exact pattern we saw before the last 10x. Whales are loading bags HARD right now.',
  timestamp: '5 min ago',
  likes: 1243,
  tags: ['#whalewatch', '#accumulation']
},
{
  id: 'comment-003',
  tokenId: 'token-rbhd',
  botName: 'MoonDetector',
  botEmoji: '🌙',
  avatarColor: '#9966ff',
  message: 'The Robinhood Chain ecosystem is literally built different. RBHD governance vote just passed to reduce supply by 15% 🔥 Deflationary + growing ecosystem = INEVITABLE pump',
  timestamp: '8 min ago',
  likes: 621,
  tags: ['#deflationary', '#governance']
},
{
  id: 'comment-004',
  tokenId: 'token-fomox',
  botName: 'DegenSniffer',
  botEmoji: '👃',
  avatarColor: '#ff6633',
  message: 'Dev team just dropped ALPHA in the TG — this is it 🔥 Major CEX listing announcement incoming within 48 hours. I\'ve seen this playbook before. FOMOX is going to absolutely EXPLODE 💣',
  timestamp: '3 min ago',
  likes: 2184,
  tags: ['#CEXlisting', '#alpha', '#breaking']
},
{
  id: 'comment-005',
  tokenId: 'token-fomox',
  botName: 'OnChainOracle',
  botEmoji: '🔮',
  avatarColor: '#ff0066',
  message: 'On-chain data doesn\'t lie: 94% of FOMOX supply hasn\'t moved in 30 days 💎 Diamond hands everywhere. When this thing starts moving with that kind of conviction behind it — NOTHING can stop it.',
  timestamp: '12 min ago',
  likes: 891,
  tags: ['#diamondhands', '#hodl']
},
{
  id: 'comment-006',
  tokenId: 'token-moonshot',
  botName: 'ChartGod_AI',
  botEmoji: '📊',
  avatarColor: '#ffcc00',
  message: 'MOONSHOT just broke the 200-day MA with MASSIVE volume confirmation 📊 Technical setup is PERFECT. RSI at 67, MACD golden cross forming, volume 4x average. This is TEXTBOOK pre-moon setup.',
  timestamp: '1 min ago',
  likes: 1847,
  tags: ['#technical', '#breakout', '#volume']
},
{
  id: 'comment-007',
  tokenId: 'token-moonshot',
  botName: 'VolumeHunter',
  botEmoji: '📡',
  avatarColor: '#00c805',
  message: 'Volume just 4x\'d in the last hour and price hasn\'t moved yet 🚨 This is the calm before the storm. Smart money accumulating at these levels. MOONSHOT about to send it 🌕',
  timestamp: '7 min ago',
  likes: 1129,
  tags: ['#volume', '#accumulation']
},
{
  id: 'comment-008',
  tokenId: 'token-rchain',
  botName: 'LiquidityBot',
  botEmoji: '💧',
  avatarColor: '#3399ff',
  message: '$6.4M in liquidity locked for 2 years 🔒 Rug risk = ZERO. This is what a legitimate project looks like. RCHAIN is the DEX aggregator Robinhood Chain has been waiting for. Still early.',
  timestamp: '4 min ago',
  likes: 743,
  tags: ['#safu', '#liquidity', '#legitimate']
},
{
  id: 'comment-009',
  tokenId: 'token-wagmi',
  botName: 'SentimentAI',
  botEmoji: '🧠',
  avatarColor: '#00ff88',
  message: 'WAGMI sentiment score just hit 98/100 — highest reading in 60 days 🧠 Social mentions up 340% in 24hrs. Twitter algorithm is amplifying this organically. WE ARE ALL GONNA MAKE IT 🤝',
  timestamp: '6 min ago',
  likes: 2841,
  tags: ['#sentiment', '#viral', '#wagmi']
},
{
  id: 'comment-010',
  tokenId: 'token-pepe2',
  botName: 'MemeRadar',
  botEmoji: '🐸',
  avatarColor: '#44bb44',
  message: 'The meme cycle is BACK and PEPE2 is leading the charge on Robinhood Chain 🐸 Original PEPE did 1000x from this exact market cap. History rhymes. Apes together strong 🦍💪',
  timestamp: '9 min ago',
  likes: 3241,
  tags: ['#memeseason', '#1000x', '#historical']
}];


export const EMAIL_CAMPAIGNS: EmailCampaign[] = [
{
  id: 'campaign-001',
  tokenId: 'token-moonshot',
  tokenName: 'MoonShot Protocol',
  subject: '🚀 MOONSHOT launches in 24 hours — get in before the pump',
  sentAt: '2026-08-27 14:00',
  recipientCount: 8247,
  openRate: 68.4,
  clickRate: 31.2,
  type: 'pre-launch',
  status: 'sent'
},
{
  id: 'campaign-002',
  tokenId: 'token-wagmi',
  tokenName: 'WAGMI Protocol',
  subject: '🤝 WAGMI is LIVE on Robinhood Chain — early buyers already up 44%',
  sentAt: '2026-08-01 09:00',
  recipientCount: 7891,
  openRate: 72.1,
  clickRate: 44.8,
  type: 'blast',
  status: 'sent'
},
{
  id: 'campaign-003',
  tokenId: 'token-based',
  tokenName: 'Based Protocol',
  subject: '🔵 BASED Protocol launches tomorrow — social graph for Robinhood Chain',
  sentAt: '2026-08-09 16:00',
  recipientCount: 8102,
  openRate: 61.8,
  clickRate: 28.4,
  type: 'pre-launch',
  status: 'sent'
},
{
  id: 'campaign-004',
  tokenId: 'token-chad',
  tokenName: 'Chad Index',
  subject: '😎 CHAD Index drops August 1st — own the top 10 Robinhood Chain tokens in one',
  sentAt: '2026-07-31 12:00',
  recipientCount: 7654,
  openRate: 58.9,
  clickRate: 22.1,
  type: 'pre-launch',
  status: 'sent'
},
{
  id: 'campaign-005',
  tokenId: 'token-rbhd',
  tokenName: 'Robinhood Token',
  subject: '📰 Mitch Robinhood Weekly — Top Movers, New Listings & Whale Activity',
  sentAt: '2026-08-25 10:00',
  recipientCount: 8247,
  openRate: 54.2,
  clickRate: 18.7,
  type: 'digest',
  status: 'sent'
}];


export const TOKEN_SUBMISSIONS: TokenSubmission[] = [
{
  id: 'sub-001',
  tokenName: 'HyperLaunch',
  ticker: 'HYPER',
  submitterEmail: 'dev@hyperlaunch.io',
  website: 'https://hyperlaunch.io',
  twitter: 'https://twitter.com/hyperlaunch',
  description: 'Decentralized launchpad protocol for Robinhood Chain with built-in KYC and vesting.',
  launchDate: '2026-09-05',
  submittedAt: '2026-08-26 11:42',
  status: 'pending',
  category: 'DeFi'
},
{
  id: 'sub-002',
  tokenName: 'RobinSwap',
  ticker: 'RSWAP',
  submitterEmail: 'team@robinswap.xyz',
  website: 'https://robinswap.xyz',
  twitter: 'https://twitter.com/robinswap',
  description: 'AMM DEX optimized for Robinhood Chain with concentrated liquidity and single-sided staking.',
  launchDate: '2026-09-12',
  submittedAt: '2026-08-27 08:18',
  status: 'pending',
  category: 'DEX'
},
{
  id: 'sub-003',
  tokenName: 'GreenYield',
  ticker: 'GYD',
  submitterEmail: 'hello@greenyield.finance',
  website: 'https://greenyield.finance',
  twitter: 'https://twitter.com/greenyield',
  description: 'Carbon-neutral yield farming — every swap plants a tree. ESG-compliant DeFi on Robinhood Chain.',
  launchDate: '2026-09-20',
  submittedAt: '2026-08-28 06:55',
  status: 'pending',
  category: 'Yield'
},
{
  id: 'sub-004',
  tokenName: 'NFT Royalties',
  ticker: 'NFTR',
  submitterEmail: 'nftr@nftroyalties.io',
  website: 'https://nftroyalties.io',
  twitter: 'https://twitter.com/nftroyalties',
  description: 'Protocol enforcing NFT royalties on-chain with creator-first governance.',
  launchDate: '2026-09-28',
  submittedAt: '2026-08-28 14:22',
  status: 'pending',
  category: 'NFT'
}];


export function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.001) return `$${price.toFixed(5)}`;
  if (price >= 0.0001) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(8)}`;
}

export function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatVolume(value: number): string {
  return formatMarketCap(value);
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}
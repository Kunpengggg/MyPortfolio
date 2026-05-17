export const assetClasses = [
  {
    id: "demandCash",
    name: "活钱 / 银行存款",
    hint: "活期、定期、大额存单、备用金",
    expectedReturn: 0.018,
    volatility: 0.003,
    group: "cash",
    color: "#4e8f7a",
    rebalanceable: true
  },
  {
    id: "moneyFund",
    name: "货币基金 / 现金管理",
    hint: "余额宝类、现金管理理财",
    expectedReturn: 0.02,
    volatility: 0.006,
    group: "cash",
    color: "#8fbc8f",
    rebalanceable: true
  },
  {
    id: "bonds",
    name: "债券 / 固收",
    hint: "纯债基金、债券 ETF、固收类理财",
    expectedReturn: 0.035,
    volatility: 0.04,
    group: "bonds",
    color: "#3f6f8f",
    rebalanceable: true
  },
  {
    id: "chinaBroadIndex",
    name: "A股宽基指数",
    hint: "沪深300、中证500、创业板、全市场",
    expectedReturn: 0.065,
    volatility: 0.22,
    group: "chinaEquity",
    color: "#2f75b5",
    rebalanceable: true
  },
  {
    id: "dividendStrategy",
    name: "红利 / 低波策略",
    hint: "红利低波、高股息、央企红利",
    expectedReturn: 0.058,
    volatility: 0.16,
    group: "chinaEquity",
    color: "#7a9f35",
    rebalanceable: true
  },
  {
    id: "sectorFunds",
    name: "行业 / 主题基金",
    hint: "科技、医药、新能源、半导体等",
    expectedReturn: 0.08,
    volatility: 0.32,
    group: "sectorEquity",
    color: "#b86b2b",
    rebalanceable: true
  },
  {
    id: "singleStocks",
    name: "个股",
    hint: "单只股票或高度集中的股票组合",
    expectedReturn: 0.09,
    volatility: 0.45,
    group: "singleStocks",
    color: "#a94442",
    rebalanceable: true
  },
  {
    id: "hkChinaEquity",
    name: "港股 / 中概",
    hint: "港股通、恒生科技、中概互联",
    expectedReturn: 0.07,
    volatility: 0.28,
    group: "hkEquity",
    color: "#7759a6",
    rebalanceable: true
  },
  {
    id: "overseasEquity",
    name: "海外权益",
    hint: "QDII、全球/美股指数基金",
    expectedReturn: 0.055,
    volatility: 0.18,
    group: "overseasEquity",
    color: "#4c78a8",
    rebalanceable: true
  },
  {
    id: "gold",
    name: "黄金",
    hint: "黄金 ETF、积存金、实物黄金",
    expectedReturn: 0.04,
    volatility: 0.16,
    group: "gold",
    color: "#c99a2e",
    rebalanceable: true
  },
  {
    id: "reits",
    name: "公募 REITs",
    hint: "基础设施 REITs，偏收益型",
    expectedReturn: 0.045,
    volatility: 0.14,
    group: "reits",
    color: "#7f6d5f",
    rebalanceable: true
  },
  {
    id: "pensionInsurance",
    name: "保险 / 养老金",
    hint: "年金险、增额寿、个人养老金",
    expectedReturn: 0.03,
    volatility: 0.02,
    group: "insurance",
    color: "#89a4b8",
    rebalanceable: false
  },
  {
    id: "property",
    name: "房产",
    hint: "自住房、投资房，按净值估算",
    expectedReturn: 0.02,
    volatility: 0.12,
    group: "property",
    color: "#b9a37d",
    rebalanceable: false
  },
  {
    id: "other",
    name: "其他资产",
    hint: "私募、股权、收藏品、其他高风险资产",
    expectedReturn: 0.04,
    volatility: 0.24,
    group: "other",
    color: "#8f8f8f",
    rebalanceable: false
  }
];

export const groupCorrelation = {
  cash: { cash: 1, bonds: 0.18, chinaEquity: 0.03, sectorEquity: 0.03, singleStocks: 0.03, hkEquity: 0.03, overseasEquity: 0.02, gold: 0, reits: 0.05, insurance: 0.12, property: 0.05, other: 0.05 },
  bonds: { cash: 0.18, bonds: 1, chinaEquity: 0.12, sectorEquity: 0.1, singleStocks: 0.08, hkEquity: 0.1, overseasEquity: 0.08, gold: 0.08, reits: 0.18, insurance: 0.35, property: 0.12, other: 0.12 },
  chinaEquity: { cash: 0.03, bonds: 0.12, chinaEquity: 1, sectorEquity: 0.75, singleStocks: 0.65, hkEquity: 0.72, overseasEquity: 0.48, gold: 0.05, reits: 0.42, insurance: 0.12, property: 0.28, other: 0.4 },
  sectorEquity: { cash: 0.03, bonds: 0.1, chinaEquity: 0.75, sectorEquity: 1, singleStocks: 0.72, hkEquity: 0.68, overseasEquity: 0.46, gold: 0.06, reits: 0.4, insurance: 0.1, property: 0.25, other: 0.42 },
  singleStocks: { cash: 0.03, bonds: 0.08, chinaEquity: 0.65, sectorEquity: 0.72, singleStocks: 1, hkEquity: 0.55, overseasEquity: 0.35, gold: 0.05, reits: 0.28, insurance: 0.08, property: 0.2, other: 0.45 },
  hkEquity: { cash: 0.03, bonds: 0.1, chinaEquity: 0.72, sectorEquity: 0.68, singleStocks: 0.55, hkEquity: 1, overseasEquity: 0.58, gold: 0.08, reits: 0.38, insurance: 0.1, property: 0.26, other: 0.42 },
  overseasEquity: { cash: 0.02, bonds: 0.08, chinaEquity: 0.48, sectorEquity: 0.46, singleStocks: 0.35, hkEquity: 0.58, overseasEquity: 1, gold: 0.04, reits: 0.34, insurance: 0.08, property: 0.18, other: 0.35 },
  gold: { cash: 0, bonds: 0.08, chinaEquity: 0.05, sectorEquity: 0.06, singleStocks: 0.05, hkEquity: 0.08, overseasEquity: 0.04, gold: 1, reits: 0.12, insurance: 0.05, property: 0.1, other: 0.18 },
  reits: { cash: 0.05, bonds: 0.18, chinaEquity: 0.42, sectorEquity: 0.4, singleStocks: 0.28, hkEquity: 0.38, overseasEquity: 0.34, gold: 0.12, reits: 1, insurance: 0.14, property: 0.5, other: 0.35 },
  insurance: { cash: 0.12, bonds: 0.35, chinaEquity: 0.12, sectorEquity: 0.1, singleStocks: 0.08, hkEquity: 0.1, overseasEquity: 0.08, gold: 0.05, reits: 0.14, insurance: 1, property: 0.12, other: 0.1 },
  property: { cash: 0.05, bonds: 0.12, chinaEquity: 0.28, sectorEquity: 0.25, singleStocks: 0.2, hkEquity: 0.26, overseasEquity: 0.18, gold: 0.1, reits: 0.5, insurance: 0.12, property: 1, other: 0.28 },
  other: { cash: 0.05, bonds: 0.12, chinaEquity: 0.4, sectorEquity: 0.42, singleStocks: 0.45, hkEquity: 0.42, overseasEquity: 0.35, gold: 0.18, reits: 0.35, insurance: 0.1, property: 0.28, other: 1 }
};

export const portfolios = [
  {
    id: "cnStable",
    name: "国内稳健固收+",
    badge: "更稳",
    fit: "适合不想大幅波动、刚开始从存款转向基金/理财的人。",
    description: "面向中国普通家庭的低波动组合：保留现金流动性，以债券/固收为核心，用宽基指数、红利和黄金提升长期弹性。",
    weights: { demandCash: 0.15, moneyFund: 0.1, bonds: 0.45, chinaBroadIndex: 0.1, dividendStrategy: 0.08, overseasEquity: 0.02, gold: 0.1 }
  },
  {
    id: "cnBalanced",
    name: "国内均衡配置",
    badge: "默认推荐",
    fit: "适合多数家庭的长期闲钱：希望比存款更有弹性，但不想把权益仓位拉太高。",
    description: "股债黄金多元配置，权益部分以宽基和红利为核心，少量港股/海外提高分散度。",
    weights: { demandCash: 0.1, moneyFund: 0.1, bonds: 0.35, chinaBroadIndex: 0.15, dividendStrategy: 0.08, sectorFunds: 0.03, hkChinaEquity: 0.08, overseasEquity: 0.03, gold: 0.08 }
  },
  {
    id: "cnGrowth",
    name: "国内进取长期",
    badge: "收益潜力高",
    fit: "适合 5 年以上不用、能接受账户明显上下波动的钱。",
    description: "提高宽基、红利、行业主题、港股和海外权益占比，追求更高长期收益弹性。",
    weights: { demandCash: 0.05, moneyFund: 0.05, bonds: 0.22, chinaBroadIndex: 0.22, dividendStrategy: 0.08, sectorFunds: 0.1, singleStocks: 0.03, hkChinaEquity: 0.12, overseasEquity: 0.08, gold: 0.05 }
  },
  {
    id: "cnHighReturn",
    name: "长期进取增长",
    badge: "高收益潜力",
    fit: "适合 5-10 年不用、能承受较大回撤，并愿意承担权益集中波动的人。",
    description: "更重视长期增值，把权益资产作为主体。行业主题和个股只保留小比例，避免把高收益潜力变成单点押注。",
    weights: { demandCash: 0.03, moneyFund: 0.02, bonds: 0.15, chinaBroadIndex: 0.25, dividendStrategy: 0.1, sectorFunds: 0.15, singleStocks: 0.05, hkChinaEquity: 0.1, overseasEquity: 0.1, gold: 0.05 }
  },
  {
    id: "cnIncome",
    name: "现金流优先",
    badge: "短中期",
    fit: "适合 1-3 年可能要用的钱，优先保留流动性和较低波动。",
    description: "强调流动性和较低波动，适合短中期目标资金或风险承受力较低的用户。",
    weights: { demandCash: 0.2, moneyFund: 0.25, bonds: 0.4, dividendStrategy: 0.05, gold: 0.05, reits: 0.05 }
  },
  {
    id: "cnRetirement",
    name: "养老长期稳健",
    badge: "养老",
    fit: "适合为养老单独做账户的人，保险/养老金作为长期锁定资产观察。",
    description: "适合养老储备视角：把稳健资产作为主体，保留养老金/保险观察项，宽基、红利和黄金用于抗通胀与长期增值。",
    weights: { demandCash: 0.1, moneyFund: 0.1, bonds: 0.35, chinaBroadIndex: 0.12, dividendStrategy: 0.08, overseasEquity: 0.05, gold: 0.05, pensionInsurance: 0.15 }
  },
  {
    id: "cnBarbell",
    name: "杠铃型配置",
    badge: "攻守分明",
    fit: "适合想把安全垫和增长仓分得很清楚的人。",
    description: "一端是现金和债券，一端是宽基、红利、主题和黄金，中间少放，适合清晰区分安全垫和增长仓。",
    weights: { demandCash: 0.15, moneyFund: 0.1, bonds: 0.3, chinaBroadIndex: 0.16, dividendStrategy: 0.08, sectorFunds: 0.04, hkChinaEquity: 0.07, overseasEquity: 0.03, gold: 0.07 }
  }
];

export const emptyAssets = Object.fromEntries(assetClasses.map((asset) => [asset.id, 0]));

export const assetClasses = [
  {
    id: "demandCash",
    name: "活钱 / 银行存款",
    hint: "活期、定期、大额存单、备用金",
    expectedReturn: 0.018,
    volatility: 0.003,
    rebalanceable: true
  },
  {
    id: "moneyFund",
    name: "货币基金 / 现金管理",
    hint: "余额宝类、现金管理理财",
    expectedReturn: 0.02,
    volatility: 0.006,
    rebalanceable: true
  },
  {
    id: "bonds",
    name: "债券 / 固收",
    hint: "纯债基金、债券 ETF、固收类理财",
    expectedReturn: 0.035,
    volatility: 0.04,
    rebalanceable: true
  },
  {
    id: "chinaEquity",
    name: "A股权益",
    hint: "宽基指数、主动权益、红利策略",
    expectedReturn: 0.065,
    volatility: 0.22,
    rebalanceable: true
  },
  {
    id: "hkChinaEquity",
    name: "港股 / 中概",
    hint: "港股通、恒生科技、中概互联",
    expectedReturn: 0.07,
    volatility: 0.28,
    rebalanceable: true
  },
  {
    id: "overseasEquity",
    name: "海外权益",
    hint: "QDII、全球/美股指数基金",
    expectedReturn: 0.055,
    volatility: 0.18,
    rebalanceable: true
  },
  {
    id: "gold",
    name: "黄金",
    hint: "黄金 ETF、积存金、实物黄金",
    expectedReturn: 0.04,
    volatility: 0.16,
    rebalanceable: true
  },
  {
    id: "reits",
    name: "公募 REITs",
    hint: "基础设施 REITs，偏收益型",
    expectedReturn: 0.045,
    volatility: 0.14,
    rebalanceable: true
  },
  {
    id: "pensionInsurance",
    name: "保险 / 养老金",
    hint: "年金险、增额寿、个人养老金",
    expectedReturn: 0.03,
    volatility: 0.02,
    rebalanceable: false
  },
  {
    id: "property",
    name: "房产",
    hint: "自住房、投资房，按净值估算",
    expectedReturn: 0.02,
    volatility: 0.12,
    rebalanceable: false
  },
  {
    id: "other",
    name: "其他资产",
    hint: "私募、股权、收藏品、其他高风险资产",
    expectedReturn: 0.04,
    volatility: 0.24,
    rebalanceable: false
  }
];

export const correlation = {
  demandCash: { demandCash: 1, moneyFund: 0.5, bonds: 0.1, chinaEquity: 0.02, hkChinaEquity: 0.02, overseasEquity: 0.02, gold: 0, reits: 0.05, pensionInsurance: 0.08, property: 0.05, other: 0.05 },
  moneyFund: { demandCash: 0.5, moneyFund: 1, bonds: 0.2, chinaEquity: 0.03, hkChinaEquity: 0.03, overseasEquity: 0.02, gold: 0, reits: 0.05, pensionInsurance: 0.12, property: 0.05, other: 0.05 },
  bonds: { demandCash: 0.1, moneyFund: 0.2, bonds: 1, chinaEquity: 0.12, hkChinaEquity: 0.1, overseasEquity: 0.08, gold: 0.08, reits: 0.18, pensionInsurance: 0.35, property: 0.12, other: 0.12 },
  chinaEquity: { demandCash: 0.02, moneyFund: 0.03, bonds: 0.12, chinaEquity: 1, hkChinaEquity: 0.72, overseasEquity: 0.48, gold: 0.05, reits: 0.42, pensionInsurance: 0.12, property: 0.28, other: 0.4 },
  hkChinaEquity: { demandCash: 0.02, moneyFund: 0.03, bonds: 0.1, chinaEquity: 0.72, hkChinaEquity: 1, overseasEquity: 0.58, gold: 0.08, reits: 0.38, pensionInsurance: 0.1, property: 0.26, other: 0.42 },
  overseasEquity: { demandCash: 0.02, moneyFund: 0.02, bonds: 0.08, chinaEquity: 0.48, hkChinaEquity: 0.58, overseasEquity: 1, gold: 0.04, reits: 0.34, pensionInsurance: 0.08, property: 0.18, other: 0.35 },
  gold: { demandCash: 0, moneyFund: 0, bonds: 0.08, chinaEquity: 0.05, hkChinaEquity: 0.08, overseasEquity: 0.04, gold: 1, reits: 0.12, pensionInsurance: 0.05, property: 0.1, other: 0.18 },
  reits: { demandCash: 0.05, moneyFund: 0.05, bonds: 0.18, chinaEquity: 0.42, hkChinaEquity: 0.38, overseasEquity: 0.34, gold: 0.12, reits: 1, pensionInsurance: 0.14, property: 0.5, other: 0.35 },
  pensionInsurance: { demandCash: 0.08, moneyFund: 0.12, bonds: 0.35, chinaEquity: 0.12, hkChinaEquity: 0.1, overseasEquity: 0.08, gold: 0.05, reits: 0.14, pensionInsurance: 1, property: 0.12, other: 0.1 },
  property: { demandCash: 0.05, moneyFund: 0.05, bonds: 0.12, chinaEquity: 0.28, hkChinaEquity: 0.26, overseasEquity: 0.18, gold: 0.1, reits: 0.5, pensionInsurance: 0.12, property: 1, other: 0.28 },
  other: { demandCash: 0.05, moneyFund: 0.05, bonds: 0.12, chinaEquity: 0.4, hkChinaEquity: 0.42, overseasEquity: 0.35, gold: 0.18, reits: 0.35, pensionInsurance: 0.1, property: 0.28, other: 1 }
};

export const portfolios = [
  {
    id: "cnStable",
    name: "国内稳健固收+",
    badge: "更稳",
    fit: "适合不想大幅波动、刚开始从存款转向基金/理财的人。",
    description: "面向中国普通家庭的低波动组合：保留现金流动性，以债券/固收为核心，少量权益和黄金提升长期弹性。",
    weights: { demandCash: 0.15, moneyFund: 0.1, bonds: 0.45, chinaEquity: 0.15, overseasEquity: 0.05, gold: 0.1 }
  },
  {
    id: "cnBalanced",
    name: "国内均衡配置",
    badge: "默认推荐",
    fit: "适合多数家庭的长期闲钱：希望比存款更有弹性，但不想把权益仓位拉太高。",
    description: "股债黄金多元配置，适合希望从存款迁移到金融资产、但仍重视回撤控制的长期资金。",
    weights: { demandCash: 0.1, moneyFund: 0.1, bonds: 0.35, chinaEquity: 0.2, hkChinaEquity: 0.1, overseasEquity: 0.05, gold: 0.1 }
  },
  {
    id: "cnGrowth",
    name: "国内进取长期",
    badge: "收益潜力高",
    fit: "适合 5 年以上不用、能接受账户明显上下波动的钱。",
    description: "提高 A股、港股和海外权益占比，适合周期较长、能承受明显波动的资金。",
    weights: { demandCash: 0.05, moneyFund: 0.05, bonds: 0.25, chinaEquity: 0.3, hkChinaEquity: 0.15, overseasEquity: 0.1, gold: 0.1 }
  },
  {
    id: "cnIncome",
    name: "现金流优先",
    badge: "短中期",
    fit: "适合 1-3 年可能要用的钱，优先保留流动性和较低波动。",
    description: "强调流动性和较低波动，适合短中期目标资金或风险承受力较低的用户。",
    weights: { demandCash: 0.2, moneyFund: 0.25, bonds: 0.4, gold: 0.05, reits: 0.1 }
  },
  {
    id: "cnRetirement",
    name: "养老长期稳健",
    badge: "养老",
    fit: "适合为养老单独做账户的人，保险/养老金作为长期锁定资产观察。",
    description: "适合养老储备视角：把稳健资产作为主体，保留养老金/保险观察项，权益和黄金用于抗通胀与长期增值。",
    weights: { demandCash: 0.1, moneyFund: 0.1, bonds: 0.35, chinaEquity: 0.15, overseasEquity: 0.05, gold: 0.1, pensionInsurance: 0.15 }
  },
  {
    id: "cnBarbell",
    name: "杠铃型配置",
    badge: "攻守分明",
    fit: "适合想把安全垫和增长仓分得很清楚的人。",
    description: "一端是现金和债券，一端是权益和黄金，中间少放，适合想清楚区分安全垫和增长仓的用户。",
    weights: { demandCash: 0.15, moneyFund: 0.1, bonds: 0.3, chinaEquity: 0.2, hkChinaEquity: 0.1, overseasEquity: 0.05, gold: 0.1 }
  }
];

export const emptyAssets = {
  demandCash: 0,
  moneyFund: 0,
  bonds: 0,
  chinaEquity: 0,
  hkChinaEquity: 0,
  overseasEquity: 0,
  gold: 0,
  reits: 0,
  pensionInsurance: 0,
  property: 0,
  other: 0
};

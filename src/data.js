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
    hint: "沪深300、中证500、创业板、A500、全市场",
    expectedReturn: 0.07,
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
    expectedReturn: 0.085,
    volatility: 0.32,
    group: "sectorEquity",
    color: "#b86b2b",
    rebalanceable: true
  },
  {
    id: "singleStocks",
    name: "个股",
    hint: "单只股票或高度集中的股票组合",
    expectedReturn: 0.095,
    volatility: 0.45,
    group: "singleStocks",
    color: "#a94442",
    rebalanceable: true
  },
  {
    id: "hkChinaEquity",
    name: "港股 / 中概",
    hint: "港股通、恒生科技、中概互联",
    expectedReturn: 0.055,
    volatility: 0.28,
    group: "hkEquity",
    color: "#7759a6",
    rebalanceable: true
  },
  {
    id: "usEquity",
    name: "美国核心宽基",
    hint: "标普500、美国全市场 QDII；美股分散主仓",
    role: "核心仓",
    expectedReturn: 0.105,
    volatility: 0.18,
    group: "usEquity",
    color: "#4c78a8",
    rebalanceable: true
  },
  {
    id: "usTechGrowth",
    name: "美股科技卫星",
    hint: "纳指100、AI、科技成长；高收益弹性仓",
    role: "增长仓",
    expectedReturn: 0.16,
    volatility: 0.3,
    group: "usTechGrowth",
    color: "#2f5597",
    rebalanceable: true
  },
  {
    id: "globalExUsEquity",
    name: "非美海外权益",
    hint: "欧洲、日本、印度等海外市场基金，不含美国",
    expectedReturn: 0.052,
    volatility: 0.19,
    group: "globalExUsEquity",
    color: "#5f9ea0",
    rebalanceable: true
  },
  {
    id: "gold",
    name: "黄金",
    hint: "黄金 ETF、积存金、实物黄金",
    expectedReturn: 0.05,
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
  cash: { cash: 1, bonds: 0.18, chinaEquity: 0.03, sectorEquity: 0.03, singleStocks: 0.03, hkEquity: 0.03, usEquity: 0.02, usTechGrowth: 0.02, globalExUsEquity: 0.02, gold: 0, reits: 0.05, insurance: 0.12, property: 0.05, other: 0.05 },
  bonds: { cash: 0.18, bonds: 1, chinaEquity: 0.12, sectorEquity: 0.1, singleStocks: 0.08, hkEquity: 0.1, usEquity: 0.08, usTechGrowth: 0.06, globalExUsEquity: 0.08, gold: 0.08, reits: 0.18, insurance: 0.35, property: 0.12, other: 0.12 },
  chinaEquity: { cash: 0.03, bonds: 0.12, chinaEquity: 1, sectorEquity: 0.75, singleStocks: 0.65, hkEquity: 0.72, usEquity: 0.42, usTechGrowth: 0.46, globalExUsEquity: 0.48, gold: 0.05, reits: 0.42, insurance: 0.12, property: 0.28, other: 0.4 },
  sectorEquity: { cash: 0.03, bonds: 0.1, chinaEquity: 0.75, sectorEquity: 1, singleStocks: 0.72, hkEquity: 0.68, usEquity: 0.42, usTechGrowth: 0.5, globalExUsEquity: 0.46, gold: 0.06, reits: 0.4, insurance: 0.1, property: 0.25, other: 0.42 },
  singleStocks: { cash: 0.03, bonds: 0.08, chinaEquity: 0.65, sectorEquity: 0.72, singleStocks: 1, hkEquity: 0.55, usEquity: 0.35, usTechGrowth: 0.5, globalExUsEquity: 0.35, gold: 0.05, reits: 0.28, insurance: 0.08, property: 0.2, other: 0.45 },
  hkEquity: { cash: 0.03, bonds: 0.1, chinaEquity: 0.72, sectorEquity: 0.68, singleStocks: 0.55, hkEquity: 1, usEquity: 0.52, usTechGrowth: 0.5, globalExUsEquity: 0.58, gold: 0.08, reits: 0.38, insurance: 0.1, property: 0.26, other: 0.42 },
  usEquity: { cash: 0.02, bonds: 0.08, chinaEquity: 0.42, sectorEquity: 0.42, singleStocks: 0.35, hkEquity: 0.52, usEquity: 1, usTechGrowth: 0.88, globalExUsEquity: 0.72, gold: 0.04, reits: 0.34, insurance: 0.08, property: 0.18, other: 0.35 },
  usTechGrowth: { cash: 0.02, bonds: 0.06, chinaEquity: 0.46, sectorEquity: 0.5, singleStocks: 0.5, hkEquity: 0.5, usEquity: 0.88, usTechGrowth: 1, globalExUsEquity: 0.65, gold: 0.03, reits: 0.3, insurance: 0.06, property: 0.15, other: 0.35 },
  globalExUsEquity: { cash: 0.02, bonds: 0.08, chinaEquity: 0.48, sectorEquity: 0.46, singleStocks: 0.35, hkEquity: 0.58, usEquity: 0.72, usTechGrowth: 0.65, globalExUsEquity: 1, gold: 0.04, reits: 0.34, insurance: 0.08, property: 0.18, other: 0.35 },
  gold: { cash: 0, bonds: 0.08, chinaEquity: 0.05, sectorEquity: 0.06, singleStocks: 0.05, hkEquity: 0.08, usEquity: 0.04, usTechGrowth: 0.03, globalExUsEquity: 0.04, gold: 1, reits: 0.12, insurance: 0.05, property: 0.1, other: 0.18 },
  reits: { cash: 0.05, bonds: 0.18, chinaEquity: 0.42, sectorEquity: 0.4, singleStocks: 0.28, hkEquity: 0.38, usEquity: 0.34, usTechGrowth: 0.3, globalExUsEquity: 0.34, gold: 0.12, reits: 1, insurance: 0.14, property: 0.5, other: 0.35 },
  insurance: { cash: 0.12, bonds: 0.35, chinaEquity: 0.12, sectorEquity: 0.1, singleStocks: 0.08, hkEquity: 0.1, usEquity: 0.08, usTechGrowth: 0.06, globalExUsEquity: 0.08, gold: 0.05, reits: 0.14, insurance: 1, property: 0.12, other: 0.1 },
  property: { cash: 0.05, bonds: 0.12, chinaEquity: 0.28, sectorEquity: 0.25, singleStocks: 0.2, hkEquity: 0.26, usEquity: 0.18, usTechGrowth: 0.15, globalExUsEquity: 0.18, gold: 0.1, reits: 0.5, insurance: 0.12, property: 1, other: 0.28 },
  other: { cash: 0.05, bonds: 0.12, chinaEquity: 0.4, sectorEquity: 0.42, singleStocks: 0.45, hkEquity: 0.42, usEquity: 0.35, usTechGrowth: 0.35, globalExUsEquity: 0.35, gold: 0.18, reits: 0.35, insurance: 0.1, property: 0.28, other: 1 }
};

export const returnProfiles = [
  {
    id: "conservative",
    name: "保守预测",
    description: "更接近机构长期资本市场假设，适合想看偏谨慎结果的人。",
    expectedReturns: {
      demandCash: 0.016,
      moneyFund: 0.018,
      bonds: 0.032,
      chinaBroadIndex: 0.055,
      dividendStrategy: 0.052,
      sectorFunds: 0.065,
      singleStocks: 0.075,
      hkChinaEquity: 0.045,
      usEquity: 0.07,
      usTechGrowth: 0.105,
      globalExUsEquity: 0.05,
      gold: 0.038,
      reits: 0.04,
      pensionInsurance: 0.028,
      property: 0.015,
      other: 0.035
    }
  },
  {
    id: "base",
    name: "历史中性",
    description: "参考长期名义收益和当前模型默认假设，适合作为主视角。",
    expectedReturns: {}
  },
  {
    id: "techOptimistic",
    name: "成长强化",
    description: "提高美股科技和 AI 成长资产的长期收益假设，但不代表收益承诺。",
    expectedReturns: {
      chinaBroadIndex: 0.08,
      dividendStrategy: 0.065,
      sectorFunds: 0.11,
      singleStocks: 0.13,
      hkChinaEquity: 0.065,
      usEquity: 0.12,
      usTechGrowth: 0.22,
      globalExUsEquity: 0.06,
      gold: 0.06,
      reits: 0.05,
      other: 0.05
    }
  }
];

export const portfolios = [
  {
    id: "cnStable",
    name: "低波动防守",
    badge: "更稳",
    fit: "适合不想大幅波动、刚开始从存款转向基金/理财的人。",
    description: "面向中国普通家庭的低波动组合：保留现金流动性，以债券/固收为核心，用宽基、红利、美国核心宽基和黄金提升长期弹性。",
    weights: { demandCash: 0.14, moneyFund: 0.1, bonds: 0.43, chinaBroadIndex: 0.08, dividendStrategy: 0.07, usEquity: 0.06, gold: 0.12 }
  },
  {
    id: "cnBalanced",
    name: "均衡增长",
    badge: "默认推荐",
    fit: "适合多数家庭的长期闲钱：希望比存款更有弹性，但不想把权益仓位拉太高。",
    description: "股债黄金多元配置，权益部分以 A股宽基、红利、美国核心宽基和纳指科技为主体，港股/中概只做小比例卫星仓。",
    weights: { demandCash: 0.07, moneyFund: 0.07, bonds: 0.28, chinaBroadIndex: 0.11, dividendStrategy: 0.07, sectorFunds: 0.03, hkChinaEquity: 0.02, usEquity: 0.16, usTechGrowth: 0.08, globalExUsEquity: 0.02, gold: 0.09 }
  },
  {
    id: "cnGrowth",
    name: "稳中求进",
    badge: "收益潜力高",
    fit: "适合 5 年以上不用、能接受账户明显上下波动的钱。",
    description: "提高中美宽基和纳指科技占比，追求更高长期收益弹性；港股/中概保留低比例，用于估值修复机会而非重仓押注。",
    weights: { demandCash: 0.03, moneyFund: 0.03, bonds: 0.13, chinaBroadIndex: 0.16, dividendStrategy: 0.06, sectorFunds: 0.08, singleStocks: 0.03, hkChinaEquity: 0.03, usEquity: 0.22, usTechGrowth: 0.15, globalExUsEquity: 0.02, gold: 0.06 }
  },
  {
    id: "cnHighReturn",
    name: "高成长进取",
    badge: "高收益潜力",
    fit: "适合 5-10 年不用、能承受较大回撤，并愿意承担权益集中波动的人。",
    description: "更重视长期增值，把美国核心宽基、纳指科技和 A股宽基作为主体。行业主题和个股控制在可承受范围内，避免把高收益潜力变成单点押注。",
    weights: { demandCash: 0.02, moneyFund: 0.02, bonds: 0.07, chinaBroadIndex: 0.16, dividendStrategy: 0.05, sectorFunds: 0.1, singleStocks: 0.05, hkChinaEquity: 0.02, usEquity: 0.28, usTechGrowth: 0.18, globalExUsEquity: 0.02, gold: 0.03 }
  },
  {
    id: "soloMaxGrowth",
    name: "全球科技高增长 10%+",
    badge: "极高风险",
    fit: "适合现金流稳定、10 年以上不用、能承受 40% 以上回撤，并主动追求科技成长收益的人。",
    description: "这是历史乐观口径下的高风险增长模型，核心押注美国核心宽基和纳指/AI 科技成长，少量配置 A股、主题、个股和黄金。它可能长期高收益，也可能经历深度回撤和多年不赚钱。",
    weights: { demandCash: 0.01, bonds: 0.01, chinaBroadIndex: 0.04, sectorFunds: 0.08, singleStocks: 0.05, hkChinaEquity: 0.01, usEquity: 0.3, usTechGrowth: 0.46, globalExUsEquity: 0.02, gold: 0.02 }
  },
  {
    id: "cnIncome",
    name: "短期现金管理",
    badge: "短中期",
    fit: "适合 1-3 年可能要用的钱，优先保留流动性和较低波动。",
    description: "强调流动性和较低波动，适合短中期目标资金或风险承受力较低的用户。黄金保留小比例用于通胀和地缘风险对冲。",
    weights: { demandCash: 0.2, moneyFund: 0.24, bonds: 0.4, dividendStrategy: 0.05, gold: 0.06, reits: 0.05 }
  },
  {
    id: "cnRetirement",
    name: "养老稳健账户",
    badge: "养老",
    fit: "适合为养老单独做账户的人，保险/养老金作为长期锁定资产观察。",
    description: "适合养老储备视角：把稳健资产作为主体，保留养老金/保险观察项，宽基、红利、美国核心宽基和黄金用于抗通胀与长期增值。",
    weights: { demandCash: 0.09, moneyFund: 0.09, bonds: 0.34, chinaBroadIndex: 0.1, dividendStrategy: 0.08, usEquity: 0.1, globalExUsEquity: 0.02, gold: 0.03, pensionInsurance: 0.15 }
  },
  {
    id: "cnBarbell",
    name: "安全垫 + 增长仓",
    badge: "攻守分明",
    fit: "适合想把安全垫和增长仓分得很清楚的人。",
    description: "一端是现金和债券，一端是宽基、红利、科技成长和黄金，中间少放，适合清晰区分安全垫和增长仓。",
    weights: { demandCash: 0.14, moneyFund: 0.1, bonds: 0.29, chinaBroadIndex: 0.13, dividendStrategy: 0.08, sectorFunds: 0.04, hkChinaEquity: 0.02, usEquity: 0.12, usTechGrowth: 0.03, gold: 0.05 }
  }
];

export const emptyAssets = Object.fromEntries(assetClasses.map((asset) => [asset.id, 0]));

export const currencies = [
  { code: "CNY", name: "人民币", symbol: "¥", rateToCny: 1, volatility: 0 },
  { code: "USD", name: "美元", symbol: "$", rateToCny: 6.82, volatility: 0.06 },
  { code: "HKD", name: "港币", symbol: "HK$", rateToCny: 0.87, volatility: 0.055 },
  { code: "EUR", name: "欧元", symbol: "€", rateToCny: 8.05, volatility: 0.08 }
];

export const defaultAssetCurrencies = Object.fromEntries(assetClasses.map((asset) => [asset.id, "CNY"]));

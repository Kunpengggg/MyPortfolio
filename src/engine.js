import { assetClasses, groupCorrelation } from "./data.js";

const byId = Object.fromEntries(assetClasses.map((asset) => [asset.id, asset]));

export function sumAssets(assets) {
  return Object.values(assets).reduce((sum, value) => sum + normalizeNumber(value), 0);
}

export function normalizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function weightsFromAssets(assets) {
  const total = sumAssets(assets);
  return Object.fromEntries(
    assetClasses.map((asset) => [asset.id, total > 0 ? normalizeNumber(assets[asset.id]) / total : 0])
  );
}

export function weightsFromInvestableAssets(assets) {
  const total = assetClasses
    .filter((asset) => asset.rebalanceable)
    .reduce((sum, asset) => sum + normalizeNumber(assets[asset.id]), 0);
  return Object.fromEntries(
    assetClasses.map((asset) => {
      if (!asset.rebalanceable) return [asset.id, 0];
      return [asset.id, total > 0 ? normalizeNumber(assets[asset.id]) / total : 0];
    })
  );
}

export function normalizeWeights(weights) {
  return Object.fromEntries(assetClasses.map((asset) => [asset.id, weights[asset.id] || 0]));
}

export function normalizeInvestableTargetWeights(weights) {
  const investableTotal = assetClasses
    .filter((asset) => asset.rebalanceable)
    .reduce((sum, asset) => sum + (weights[asset.id] || 0), 0);

  return Object.fromEntries(
    assetClasses.map((asset) => {
      if (!asset.rebalanceable) return [asset.id, 0];
      return [asset.id, investableTotal > 0 ? (weights[asset.id] || 0) / investableTotal : 0];
    })
  );
}

export function portfolioStats(weights) {
  const fullWeights = normalizeWeights(weights);
  const expectedReturn = assetClasses.reduce((sum, asset) => {
    return sum + fullWeights[asset.id] * asset.expectedReturn;
  }, 0);

  let variance = 0;
  for (const left of assetClasses) {
    for (const right of assetClasses) {
      variance +=
        fullWeights[left.id] *
        fullWeights[right.id] *
        byId[left.id].volatility *
        byId[right.id].volatility *
        correlationFor(left, right);
    }
  }

  const volatility = Math.sqrt(Math.max(variance, 0));
  return {
    expectedReturn,
    volatility,
    score: volatility > 0 ? expectedReturn / volatility : 0
  };
}

function correlationFor(left, right) {
  if (left.id === right.id) return 1;
  return groupCorrelation[left.group]?.[right.group] ?? groupCorrelation[right.group]?.[left.group] ?? 0.3;
}

export function rebalanceRows(assets, targetWeights) {
  const total = sumAssets(assets);
  const investableTotal = assetClasses
    .filter((asset) => asset.rebalanceable)
    .reduce((sum, asset) => sum + normalizeNumber(assets[asset.id]), 0);
  const rebalanceableTargetTotal = assetClasses
    .filter((asset) => asset.rebalanceable)
    .reduce((sum, asset) => sum + (targetWeights[asset.id] || 0), 0);
  const currentWeights = weightsFromAssets(assets);
  return assetClasses.map((asset) => {
    const currentAmount = normalizeNumber(assets[asset.id]);
    const rawTargetWeight = targetWeights[asset.id] || 0;
    const targetWeight =
      asset.rebalanceable && rebalanceableTargetTotal > 0 ? rawTargetWeight / rebalanceableTargetTotal : rawTargetWeight;
    const targetAmount = asset.rebalanceable ? investableTotal * targetWeight : currentAmount;
    const delta = targetAmount - currentAmount;
    const investableWeight = asset.rebalanceable && investableTotal > 0 ? currentAmount / investableTotal : 0;
    return {
      id: asset.id,
      name: asset.name,
      rebalanceable: asset.rebalanceable,
      currentAmount,
      currentWeight: currentWeights[asset.id],
      investableWeight,
      rawTargetWeight,
      targetWeight,
      targetAmount,
      delta,
      absDelta: Math.abs(delta)
    };
  });
}

export function scenarios(stats) {
  return [
    {
      name: "稳健情景",
      expectedReturn: stats.expectedReturn * 0.85,
      volatility: stats.volatility * 0.9
    },
    {
      name: "均衡情景",
      expectedReturn: stats.expectedReturn,
      volatility: stats.volatility
    },
    {
      name: "进取情景",
      expectedReturn: stats.expectedReturn * 1.15,
      volatility: stats.volatility * 1.12
    }
  ];
}

export function riskLevel(volatility) {
  if (volatility < 0.06) return "低波动";
  if (volatility < 0.11) return "中低波动";
  if (volatility < 0.16) return "中高波动";
  return "高波动";
}

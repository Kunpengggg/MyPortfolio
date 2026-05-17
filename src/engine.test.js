import assert from "node:assert/strict";
import { assetClasses, portfolios, sampleAssets } from "./data.js";
import {
  normalizeInvestableTargetWeights,
  portfolioStats,
  rebalanceRows,
  sumAssets,
  weightsFromInvestableAssets
} from "./engine.js";

const investableAssetIds = assetClasses.filter((asset) => asset.rebalanceable).map((asset) => asset.id);

for (const portfolio of portfolios) {
  const normalizedWeights = normalizeInvestableTargetWeights(portfolio.weights);
  const investableWeightSum = investableAssetIds.reduce((sum, id) => sum + normalizedWeights[id], 0);
  const stats = portfolioStats(normalizedWeights);

  assert.ok(Math.abs(investableWeightSum - 1) < 0.000001, `${portfolio.name} investable weights should sum to 100%`);
  assert.ok(Number.isFinite(stats.expectedReturn), `${portfolio.name} expected return should be finite`);
  assert.ok(Number.isFinite(stats.volatility), `${portfolio.name} volatility should be finite`);
  assert.ok(stats.volatility >= 0, `${portfolio.name} volatility should not be negative`);
}

const totalAssets = sumAssets(sampleAssets);
assert.equal(totalAssets, 2330000, "sample household asset total should match demo value");

const currentWeights = weightsFromInvestableAssets(sampleAssets);
const currentInvestableWeightSum = investableAssetIds.reduce((sum, id) => sum + currentWeights[id], 0);
assert.ok(Math.abs(currentInvestableWeightSum - 1) < 0.000001, "current investable weights should sum to 100%");

for (const portfolio of portfolios) {
  const rows = rebalanceRows(sampleAssets, portfolio.weights);
  const targetAmountSum = rows
    .filter((row) => row.rebalanceable)
    .reduce((sum, row) => sum + row.targetAmount, 0);
  const investableTotal = investableAssetIds.reduce((sum, id) => sum + sampleAssets[id], 0);

  assert.ok(Math.abs(targetAmountSum - investableTotal) < 0.01, `${portfolio.name} target amounts should fully allocate investable assets`);
}

const incomeVolatility = portfolioStats(normalizeInvestableTargetWeights(portfolios.find((item) => item.id === "cnIncome").weights)).volatility;
const growthVolatility = portfolioStats(normalizeInvestableTargetWeights(portfolios.find((item) => item.id === "cnGrowth").weights)).volatility;
assert.ok(incomeVolatility < growthVolatility, "cash-flow portfolio should be less volatile than growth portfolio");

console.log("engine tests passed");

import assert from "node:assert/strict";
import { assetClasses, emptyAssets, portfolios } from "./data.js";
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

const testAssets = {
  ...emptyAssets,
  demandCash: 80000,
  moneyFund: 50000,
  bonds: 120000,
  chinaEquity: 80000,
  hkChinaEquity: 30000,
  overseasEquity: 20000,
  gold: 40000,
  reits: 10000,
  pensionInsurance: 100000,
  property: 1800000
};

const totalAssets = sumAssets(testAssets);
assert.equal(totalAssets, 2330000, "test household asset total should match fixture value");

const currentWeights = weightsFromInvestableAssets(testAssets);
const currentInvestableWeightSum = investableAssetIds.reduce((sum, id) => sum + currentWeights[id], 0);
assert.ok(Math.abs(currentInvestableWeightSum - 1) < 0.000001, "current investable weights should sum to 100%");

for (const portfolio of portfolios) {
  const rows = rebalanceRows(testAssets, portfolio.weights);
  const targetAmountSum = rows
    .filter((row) => row.rebalanceable)
    .reduce((sum, row) => sum + row.targetAmount, 0);
  const investableTotal = investableAssetIds.reduce((sum, id) => sum + testAssets[id], 0);

  assert.ok(Math.abs(targetAmountSum - investableTotal) < 0.01, `${portfolio.name} target amounts should fully allocate investable assets`);
}

const incomeVolatility = portfolioStats(normalizeInvestableTargetWeights(portfolios.find((item) => item.id === "cnIncome").weights)).volatility;
const growthVolatility = portfolioStats(normalizeInvestableTargetWeights(portfolios.find((item) => item.id === "cnGrowth").weights)).volatility;
assert.ok(incomeVolatility < growthVolatility, "cash-flow portfolio should be less volatile than growth portfolio");

console.log("engine tests passed");

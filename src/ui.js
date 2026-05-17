import { assetClasses, emptyAssets, portfolios } from "./data.js";
import {
  normalizeInvestableTargetWeights,
  portfolioStats,
  rebalanceRows,
  riskLevel,
  scenarios,
  sumAssets,
  weightsFromInvestableAssets
} from "./engine.js";
import { clearSnapshots, deleteSnapshot, loadSnapshots, saveSnapshot } from "./store.js";

const state = {
  assets: createEmptyAssets(),
  portfolioId: "cnBalanced",
  snapshots: loadSnapshots()
};

const formatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0
});

const percentFormatter = new Intl.NumberFormat("zh-CN", {
  style: "percent",
  maximumFractionDigits: 1
});

const nodes = {
  assetInputs: document.querySelector("#assetInputs"),
  totalAssets: document.querySelector("#totalAssets"),
  portfolioCards: document.querySelector("#portfolioCards"),
  portfolioDescription: document.querySelector("#portfolioDescription"),
  diagnosis: document.querySelector("#diagnosis"),
  totalPie: document.querySelector("#totalPie"),
  totalLegend: document.querySelector("#totalLegend"),
  investablePie: document.querySelector("#investablePie"),
  investableLegend: document.querySelector("#investableLegend"),
  targetBars: document.querySelector("#targetBars"),
  metrics: document.querySelector("#metrics"),
  riskLabel: document.querySelector("#riskLabel"),
  scenarioTable: document.querySelector("#scenarioTable"),
  rebalanceList: document.querySelector("#rebalanceList"),
  historyList: document.querySelector("#historyList"),
  saveSnapshotBtn: document.querySelector("#saveSnapshotBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  clearHistoryBtn: document.querySelector("#clearHistoryBtn"),
  horizonSelect: document.querySelector("#horizonSelect"),
  drawdownSelect: document.querySelector("#drawdownSelect"),
  goalSelect: document.querySelector("#goalSelect"),
  recommendBtn: document.querySelector("#recommendBtn"),
  recommendationResult: document.querySelector("#recommendationResult")
};

function createEmptyAssets() {
  return { ...emptyAssets };
}

function migrateAssets(assets) {
  const migrated = createEmptyAssets();
  for (const asset of assetClasses) {
    migrated[asset.id] = Number(assets?.[asset.id] || 0);
  }

  if (assets?.chinaEquity && !assets.chinaBroadIndex) {
    migrated.chinaBroadIndex = Number(assets.chinaEquity || 0);
  }

  if (assets?.overseasEquity && !assets.usEquity) {
    migrated.usEquity = Number(assets.overseasEquity || 0);
  }

  return migrated;
}

function selectedPortfolio() {
  return portfolios.find((portfolio) => portfolio.id === state.portfolioId) || portfolios[0];
}

function renderInputs() {
  nodes.assetInputs.innerHTML = assetClasses
    .map((asset) => {
      const value = state.assets[asset.id] || "";
      return `
        <label class="asset-row">
          <span>
            <span class="asset-name">${asset.name}${asset.role ? `<span class="asset-role">${asset.role}</span>` : ""}</span>
            <span class="asset-meta">${asset.hint}</span>
          </span>
          <input data-asset-id="${asset.id}" type="number" min="0" step="100" value="${value}" aria-label="${asset.name}金额" />
        </label>
      `;
    })
    .join("");
}

function hasInputAssets() {
  return sumAssets(state.assets) > 0;
}

function hasInvestableAssets() {
  return assetClasses
    .filter((asset) => asset.rebalanceable)
    .some((asset) => Number(state.assets[asset.id] || 0) > 0);
}

function renderPortfolioCards() {
  const sortedPortfolios = [...portfolios].sort((left, right) => {
    return (
      portfolioStats(normalizeInvestableTargetWeights(left.weights)).volatility -
      portfolioStats(normalizeInvestableTargetWeights(right.weights)).volatility
    );
  });

  nodes.portfolioCards.innerHTML = sortedPortfolios
    .map((portfolio) => {
      const stats = portfolioStats(normalizeInvestableTargetWeights(portfolio.weights));
      const checked = portfolio.id === state.portfolioId;
      return `
        <button class="portfolio-card" type="button" role="radio" aria-checked="${checked}" data-portfolio-id="${portfolio.id}">
          <span class="portfolio-card-head">
            <span class="portfolio-card-title">${portfolio.name}</span>
            <span class="portfolio-badge">${portfolio.badge}</span>
          </span>
          <span class="portfolio-card-meta">
            <span>预期收益<strong>${percentFormatter.format(stats.expectedReturn)}</strong></span>
            <span>波动率<strong>${percentFormatter.format(stats.volatility)}</strong></span>
            <span>风险<strong>${riskLevel(stats.volatility)}</strong></span>
          </span>
          <span class="portfolio-fit">${portfolio.fit}</span>
        </button>
      `;
    })
    .join("");
}

function renderTarget() {
  const portfolio = selectedPortfolio();
  const investableWeights = normalizeInvestableTargetWeights(portfolio.weights);
  const observerAssets = assetClasses.filter((asset) => !asset.rebalanceable && portfolio.weights[asset.id]);
  nodes.portfolioDescription.textContent = portfolio.description;
  nodes.targetBars.innerHTML = assetClasses
    .filter((asset) => asset.rebalanceable && investableWeights[asset.id])
    .map((asset) => {
      const weight = investableWeights[asset.id];
      return `
        <div class="bar-row">
          <span>${asset.name}</span>
          <span class="bar-track"><span class="bar-fill" style="width: ${weight * 100}%"></span></span>
          <strong>${percentFormatter.format(weight)}</strong>
        </div>
      `;
    })
    .join("") +
    observerAssets
      .map(
        (asset) => `
          <div class="bar-row observer-row">
            <span>${asset.name}</span>
            <span class="muted">观察项，不参与直接调仓</span>
            <strong>${percentFormatter.format(portfolio.weights[asset.id])}</strong>
          </div>
        `
      )
      .join("");
}

function renderSummary() {
  const total = sumAssets(state.assets);
  const currentStats = portfolioStats(weightsFromInvestableAssets(state.assets));
  const targetStats = portfolioStats(normalizeInvestableTargetWeights(selectedPortfolio().weights));
  nodes.totalAssets.textContent = formatter.format(total);

  if (!hasInputAssets()) {
    nodes.riskLabel.textContent = `目标：${riskLevel(targetStats.volatility)}`;
    nodes.diagnosis.textContent = "录入资产后，这里会生成一句话诊断，帮助你判断当前配置偏保守、偏激进，还是接近目标。";
    nodes.metrics.innerHTML = [
      ["当前预期收益", "-"],
      ["当前波动率", "-"],
      ["目标波动率", percentFormatter.format(targetStats.volatility)],
      ["目标预期收益", percentFormatter.format(targetStats.expectedReturn)],
      ["收益/波动", targetStats.score.toFixed(2)],
      ["组合差异", "-"]
    ]
      .map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");
    renderScenarioTable(targetStats);
    return;
  }

  nodes.riskLabel.textContent = `目标：${riskLevel(targetStats.volatility)}`;
  nodes.diagnosis.textContent = diagnosisText(currentStats, targetStats, state.assets);

  nodes.metrics.innerHTML = [
    ["当前预期收益", percentFormatter.format(currentStats.expectedReturn)],
    ["当前波动率", percentFormatter.format(currentStats.volatility)],
    ["目标波动率", percentFormatter.format(targetStats.volatility)],
    ["目标预期收益", percentFormatter.format(targetStats.expectedReturn)],
    ["收益/波动", targetStats.score.toFixed(2)],
    ["组合差异", percentFormatter.format(Math.abs(targetStats.volatility - currentStats.volatility))]
  ]
    .map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  renderScenarioTable(targetStats);
}

function renderPieCharts() {
  renderPieChart({
    assets: assetClasses,
    container: nodes.totalPie,
    legend: nodes.totalLegend,
    emptyText: "录入资产后显示家庭总资产结构"
  });

  renderPieChart({
    assets: assetClasses.filter((asset) => asset.rebalanceable),
    container: nodes.investablePie,
    legend: nodes.investableLegend,
    emptyText: "录入金融资产后显示可投资结构"
  });
}

function renderPieChart({ assets, container, legend, emptyText }) {
  const rows = assets
    .map((asset) => ({
      ...asset,
      amount: Number(state.assets[asset.id] || 0)
    }))
    .filter((asset) => asset.amount > 0);
  const total = rows.reduce((sum, asset) => sum + asset.amount, 0);

  if (total <= 0) {
    container.style.background = "#edf0ec";
    container.setAttribute("aria-label", emptyText);
    legend.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }

  let start = 0;
  const segments = rows.map((asset) => {
    const percent = asset.amount / total;
    const end = start + percent * 100;
    const segment = `${asset.color} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
    start = end;
    return segment;
  });

  container.style.background = `conic-gradient(${segments.join(", ")})`;
  container.setAttribute(
    "aria-label",
    rows.map((asset) => `${asset.name} ${percentFormatter.format(asset.amount / total)}`).join("，")
  );
  legend.innerHTML = rows
    .sort((left, right) => right.amount - left.amount)
    .map(
      (asset) => `
        <div class="legend-row">
          <span class="legend-dot" style="background: ${asset.color}"></span>
          <span class="legend-name">${asset.name}</span>
          <strong>${percentFormatter.format(asset.amount / total)}</strong>
        </div>
      `
    )
    .join("");
}

function renderScenarioTable(targetStats) {
  nodes.scenarioTable.innerHTML = `
    <div class="scenario-row"><span>目标组合情景</span><span>收益</span><span>波动</span></div>
    ${scenarios(targetStats)
      .map(
        (scenario) => `
          <div class="scenario-row">
            <span>${scenario.name}</span>
            <span>${percentFormatter.format(scenario.expectedReturn)}</span>
            <span>${percentFormatter.format(scenario.volatility)}</span>
          </div>
        `
      )
      .join("")}
  `;
}

function renderRebalance() {
  if (!hasInvestableAssets()) {
    nodes.rebalanceList.innerHTML = `<div class="empty-state">录入现金、固收、权益、黄金等可投资金融资产后，这里会显示目标金额和分批调整建议。房产、保险和养老金会作为观察项展示。</div>`;
    return;
  }

  const rows = rebalanceRows(state.assets, selectedPortfolio().weights).sort((a, b) => b.absDelta - a.absDelta);
  nodes.rebalanceList.innerHTML = rows
    .filter((row) => row.currentAmount > 0 || row.targetWeight > 0)
    .map((row) => {
      const deltaClass = row.delta >= 0 ? "delta-positive" : "delta-negative";
      const action = row.delta >= 0 ? "增加" : "减少";
      const deltaText = row.rebalanceable
        ? `${action} ${formatter.format(Math.abs(row.delta))}`
        : "观察项";
      const targetText = row.rebalanceable ? formatter.format(row.targetAmount) : "不直接调仓";
      const targetWeightText = row.rebalanceable ? percentFormatter.format(row.targetWeight) : "观察";
      const currentWeightText = row.rebalanceable
        ? `金融资产占比 ${percentFormatter.format(row.investableWeight)}`
        : `总资产占比 ${percentFormatter.format(row.currentWeight)}`;
      return `
        <div class="rebalance-item">
          <div>
            <strong>${row.name}</strong>
            <span class="rebalance-sub">${currentWeightText} → 目标 ${targetWeightText}</span>
          </div>
          <span>${formatter.format(row.currentAmount)}</span>
          <span>${targetText}</span>
          <span>
            <span class="${row.rebalanceable ? deltaClass : "muted"}">${deltaText}</span>
            ${row.rebalanceable && row.absDelta > 0 ? `<span class="rebalance-sub">可分 3-6 次调整</span>` : ""}
          </span>
        </div>
      `;
    })
    .join("");
}

function diagnosisText(currentStats, targetStats, assets) {
  const volatilityGap = currentStats.volatility - targetStats.volatility;
  const returnGap = currentStats.expectedReturn - targetStats.expectedReturn;
  const total = sumAssets(assets);
  const propertyRatio = total > 0 ? Number(assets.property || 0) / total : 0;
  const investableTotal = assetClasses
    .filter((asset) => asset.rebalanceable)
    .reduce((sum, asset) => sum + Number(assets[asset.id] || 0), 0);
  const usTechRatio = investableTotal > 0 ? Number(assets.usTechGrowth || 0) / investableTotal : 0;
  const propertyNote =
    propertyRatio > 0.6
      ? `另外，房产占总资产 ${percentFormatter.format(propertyRatio)}，这是国内家庭最需要优先观察的集中度风险。`
      : "";
  const techNote =
    usTechRatio > 0.25
      ? `美股科技卫星占可投资资产 ${percentFormatter.format(usTechRatio)}，已经是高集中度仓位，建议确认这部分钱是否真能长期承受大幅回撤。`
      : "";

  if (volatilityGap > 0.025) {
    return `一句话诊断：你的金融资产比当前目标更激进，预期波动高 ${percentFormatter.format(volatilityGap)}。如果这笔钱 3 年内可能用到，优先降低权益和高波动资产。${techNote}${propertyNote}`;
  }

  if (volatilityGap < -0.025) {
    return `一句话诊断：你的金融资产比当前目标更保守，预期波动低 ${percentFormatter.format(Math.abs(volatilityGap))}，但长期收益弹性也可能偏低。${techNote}${propertyNote}`;
  }

  if (returnGap < -0.008) {
    return `一句话诊断：你的金融资产风险接近目标，但预期收益略低。可以检查现金类和固收类是否占比过高。${techNote}${propertyNote}`;
  }

  return `一句话诊断：你的金融资产和当前目标组合接近，下一步重点是定期记录和小幅再平衡，而不是频繁交易。${techNote}${propertyNote}`;
}

function recommendedPortfolioId() {
  const horizon = nodes.horizonSelect.value;
  const drawdown = nodes.drawdownSelect.value;
  const goal = nodes.goalSelect.value;

  if (horizon === "retirement") return "cnRetirement";
  if (horizon === "short" || goal === "liquidity") return "cnIncome";
  if (drawdown === "low") return "cnStable";
  if (horizon === "long" && drawdown === "high" && goal === "growth") return "soloMaxGrowth";
  if (goal === "growth" && drawdown !== "low") return "cnGrowth";
  if (goal === "balance" && drawdown === "medium") return "cnBalanced";
  return "cnBalanced";
}

function applyRecommendation() {
  const id = recommendedPortfolioId();
  const portfolio = portfolios.find((item) => item.id === id) || selectedPortfolio();
  state.portfolioId = portfolio.id;
  nodes.recommendationResult.textContent = `推荐：${portfolio.name}。${portfolio.fit}`;
  renderPortfolioCards();
  renderAll();
}

function renderHistory() {
  if (state.snapshots.length === 0) {
    nodes.historyList.innerHTML = `<p class="muted">还没有保存的快照。录入资产后点击“保存快照”。</p>`;
    return;
  }

  nodes.historyList.innerHTML = state.snapshots
    .map((snapshot) => {
      const date = new Date(snapshot.createdAt).toLocaleString("zh-CN", { hour12: false });
      return `
        <div class="history-item">
          <div>
            <div class="history-title">${date}</div>
            <div class="muted">${snapshot.portfolioName} · ${formatter.format(sumAssets(snapshot.assets))}</div>
          </div>
          <div class="history-actions">
            <button data-load-id="${snapshot.id}" class="ghost-btn" type="button">加载</button>
            <button data-delete-id="${snapshot.id}" class="ghost-btn danger" type="button">删除</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderAll() {
  renderTarget();
  renderPieCharts();
  renderSummary();
  renderRebalance();
  renderHistory();
}

function bindEvents() {
  nodes.assetInputs.addEventListener("input", (event) => {
    const assetId = event.target.dataset.assetId;
    if (!assetId) return;
    state.assets[assetId] = event.target.value;
    renderAll();
  });

  nodes.portfolioCards.addEventListener("click", (event) => {
    const card = event.target.closest("[data-portfolio-id]");
    if (!card) return;
    state.portfolioId = card.dataset.portfolioId;
    renderPortfolioCards();
    renderAll();
  });

  nodes.recommendBtn.addEventListener("click", applyRecommendation);

  nodes.saveSnapshotBtn.addEventListener("click", () => {
    const portfolio = selectedPortfolio();
    state.snapshots = saveSnapshot({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      assets: { ...state.assets }
    });
    renderHistory();
  });

  nodes.resetBtn.addEventListener("click", () => {
    state.assets = createEmptyAssets();
    renderInputs();
    renderAll();
  });

  nodes.clearHistoryBtn.addEventListener("click", () => {
    state.snapshots = clearSnapshots();
    renderHistory();
  });

  nodes.historyList.addEventListener("click", (event) => {
    const loadId = event.target.dataset.loadId;
    const deleteId = event.target.dataset.deleteId;

    if (loadId) {
      const snapshot = state.snapshots.find((item) => item.id === loadId);
      if (!snapshot) return;
      state.assets = migrateAssets(snapshot.assets);
      state.portfolioId = snapshot.portfolioId;
      renderInputs();
      renderPortfolioCards();
      renderAll();
    }

    if (deleteId) {
      state.snapshots = deleteSnapshot(deleteId);
      renderHistory();
    }
  });
}

renderInputs();
renderPortfolioCards();
renderAll();
bindEvents();

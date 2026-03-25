// ══════════════════════════════════════════
//  WASTE SCORE PAGE
// ══════════════════════════════════════════

/** Renders the waste score page with savings summary and current inventory breakdown. */
function renderScore() {
    const items = getItems();
    const used = savedItems;
    const total = used.reduce((sum, i) => sum + (PRICES[i.name] || 15) * i.qty, 0);
    const tracked = items.reduce((sum, i) => sum + (PRICES[i.name] || 15) * i.qty, 0);

    document.getElementById('scoreContent').innerHTML = `
    <div class="score-hero">
      <div class="score-label">Total food value saved from waste</div>
      <div class="score-amount">₹${total.toLocaleString('en-IN')}</div>
      <div class="score-sub">${used.length} item${used.length !== 1 ? 's' : ''} used before expiry</div>
    </div>

    <div class="score-cards">
      <div class="score-card">
        <div class="sc-icon">🥗</div>
        <div class="sc-val">${items.length}</div>
        <div class="sc-label">Items tracked</div>
      </div>
      <div class="score-card">
        <div class="sc-icon">✅</div>
        <div class="sc-val">${used.length}</div>
        <div class="sc-label">Items used in time</div>
      </div>
      <div class="score-card">
        <div class="sc-icon">💰</div>
        <div class="sc-val">₹${tracked}</div>
        <div class="sc-label">Value in kitchen now</div>
      </div>
      <div class="score-card">
        <div class="sc-icon">🌱</div>
        <div class="sc-val">${Math.round(used.length * 0.4)} kg</div>
        <div class="sc-label">CO₂ emissions avoided (est.)</div>
      </div>
    </div>

    ${items.length > 0 ? `
    <div class="score-items-list">
      <h3>Current inventory value breakdown</h3>
      ${items.map(i => `
        <div class="score-row">
          <span class="score-row-name">🥬 ${i.name} ×${i.qty}</span>
          <span class="score-row-val">₹${(PRICES[i.name] || 15) * i.qty} · ${getDaysLeft(i)} days left</span>
        </div>`).join('')}
    </div>` : ''}
  `;
}
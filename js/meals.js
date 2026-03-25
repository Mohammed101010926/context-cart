// ══════════════════════════════════════════
//  MEALS PAGE
// ══════════════════════════════════════════

/** Renders the meals page — shows expiring ingredients and API key notice. */
function renderMealsPage() {
    const key = getApiKey();
    document.getElementById('api-notice').style.display = key ? 'none' : 'flex';

    const expiring = getItems()
        .filter(i => getDaysLeft(i) <= 4)
        .sort((a, b) => getDaysLeft(a) - getDaysLeft(b));

    const preview = document.getElementById('expiring-preview');

    if (expiring.length === 0) {
        preview.innerHTML = '<p style="color:var(--muted)">No items expiring within 4 days. Looking good!</p>';
    } else {
        preview.innerHTML = '<p>Using soon:</p>' +
            expiring.map(i => `<span class="ingredient-tag">${i.name} (${getDaysLeft(i)}d)</span>`).join('');
    }
}

/** Saves the Spoonacular API key to localStorage. */
function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key) { toast('Please enter an API key', true); return; }
    localStorage.setItem('spoon_api_key', key);
    document.getElementById('api-notice').style.display = 'none';
    toast('✅ API key saved!');
}

/** Fetches meal suggestions from Spoonacular based on expiring ingredients. */
async function fetchMeals() {
    const key = getApiKey();
    if (!key) { toast('Please save your Spoonacular API key first!', true); return; }

    const expiring = getItems().filter(i => getDaysLeft(i) <= 4).map(i => i.name);

    if (expiring.length === 0) {
        document.getElementById('mealCards').innerHTML =
            `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🍽️</div>
        <h3>No expiring items</h3>
        <p>Add some groceries first to get meal suggestions!</p>
      </div>`;
        return;
    }

    const btn = document.getElementById('fetch-btn');
    btn.disabled = true;
    btn.textContent = 'Finding recipes…';
    document.getElementById('mealCards').innerHTML =
        `<div class="loader" style="grid-column:1/-1">
      <div class="spinner"></div>Searching for recipes…
    </div>`;

    try {
        const res = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${expiring.join(',')}&number=6&ranking=2&apiKey=${key}`
        );
        if (!res.ok) throw new Error('API error: ' + res.status);
        const data = await res.json();

        if (!data.length) {
            document.getElementById('mealCards').innerHTML =
                `<div class="empty-state" style="grid-column:1/-1">
          <div class="empty-icon">😕</div>
          <h3>No recipes found</h3>
          <p>Try adding more items to your inventory.</p>
        </div>`;
            return;
        }

        document.getElementById('mealCards').innerHTML = data.map(r => {
                    const used = r.usedIngredients.map(i => i.name);
                    const missing = r.missedIngredients.map(i => i.name);
                    return `<div class="meal-card" onclick="loadRecipeToGrocery(${r.id}, '${r.title.replace(/'/g, "\\'")}', ${JSON.stringify(missing).replace(/"/g, "'")})">
        ${r.image
          ? `<img src="${r.image}" alt="${r.title}" loading="lazy">`
          : `<div class="meal-img-placeholder">🍲</div>`}
        <div class="meal-info">
          <h3>${r.title}</h3>
          <div class="meal-tags">
            ${used.slice(0, 3).map(n => `<span class="meal-tag">✓ ${n}</span>`).join('')}
            ${missing.slice(0, 2).map(n => `<span class="meal-tag missing">+ ${n}</span>`).join('')}
          </div>
          <div class="meal-cta">Add to grocery list →</div>
        </div>
      </div>`;
    }).join('');

  } catch (e) {
    document.getElementById('mealCards').innerHTML =
      `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">⚠️</div>
        <h3>Could not load recipes</h3>
        <p>${e.message}. Check your API key and internet connection.</p>
      </div>`;
  } finally {
    btn.disabled    = false;
    btn.textContent = '🔍 Find Recipes';
  }
}
// ══════════════════════════════════════════
//  GROCERY PAGE
// ══════════════════════════════════════════

/**
 * Adds missing ingredients from a recipe to the grocery list,
 * then navigates to the Grocery page.
 * @param {number}   id      - Spoonacular recipe ID (unused currently, reserved).
 * @param {string}   title   - Recipe title.
 * @param {string[]} missing - Array of missing ingredient names.
 */
function loadRecipeToGrocery(id, title, missing) {
    missing.forEach(name => {
        if (!groceryList.find(g => g.name.toLowerCase() === name.toLowerCase())) {
            groceryList.push({ id: Date.now() + Math.random(), name, recipe: title, bought: false });
        }
    });
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    updateBadges();
    showPage('grocery', document.querySelectorAll('.tab-btn')[2]);
    toast(`🛒 Added ${missing.length} items for "${title}"`);
}

/** Toggles the bought state of a grocery item. */
function toggleGrocery(id) {
    groceryList = groceryList.map(g => g.id === id ? {...g, bought: !g.bought } : g);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    updateBadges();
    renderGroceryPage();
}

/** Removes all bought items from the grocery list. */
function clearBought() {
    groceryList = groceryList.filter(g => !g.bought);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    updateBadges();
    renderGroceryPage();
    toast('🗑️ Cleared bought items');
}

/** Renders the full grocery list UI. */
function renderGroceryPage() {
    const headerWrap = document.getElementById('grocery-header-wrap');
    const container = document.getElementById('groceryItems');
    const bought = groceryList.filter(g => g.bought).length;

    if (groceryList.length === 0) {
        headerWrap.innerHTML = '';
        container.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🛒</div>
      <h3>Your grocery list is empty</h3>
      <p>Go to Meal Ideas, pick a recipe, and items will appear here!</p>
    </div>`;
        return;
    }

    headerWrap.innerHTML = `<div class="grocery-header">
    <div>
      <h3>Shopping List</h3>
      <p>${groceryList.length - bought} items remaining · ${bought} bought</p>
    </div>
    ${bought > 0 ? `<button class="clear-btn" onclick="clearBought()">Clear bought items</button>` : ''}
  </div>`;

  container.innerHTML = groceryList.map(g => `
    <label class="grocery-item ${g.bought ? 'bought' : ''}" onclick="toggleGrocery(${g.id})">
      <input type="checkbox" class="grocery-check" ${g.bought ? 'checked' : ''} onclick="event.stopPropagation();toggleGrocery(${g.id})">
      <span class="grocery-name">${g.name}</span>
      <span class="grocery-amount" style="font-size:11px;color:var(--muted)">
        ${g.recipe ? 'for ' + g.recipe.substring(0, 20) + '…' : ''}
      </span>
    </label>`).join('');
}
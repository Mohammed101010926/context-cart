// ══════════════════════════════════════════
//  INVENTORY PAGE
// ══════════════════════════════════════════

/** Sets the purchase date input to today's date. */
function setDefaultDate() {
    document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0];
}

/** Adds a new item to the inventory from the form inputs. */
function addItem() {
    const name = document.getElementById('itemName').value.trim().toLowerCase();
    const qty = parseInt(document.getElementById('itemQty').value) || 1;
    const storage = document.getElementById('storageType').value;
    const date = document.getElementById('purchaseDate').value;

    if (!name) { toast('Please enter an item name', true); return; }
    if (!date) { toast('Please select a purchase date', true); return; }

    const rule = SPOILAGE[name] || { fridge: 5, shelf: 3, freezer: 90 };
    const shelfLife = rule[storage];
    const item = { id: Date.now(), name, qty, storage, date, shelfLife };

    const items = getItems();
    items.push(item);
    saveItemsStore(items);

    document.getElementById('itemName').value = '';
    document.getElementById('itemQty').value = '1';
    setDefaultDate();
    renderCards();
    updateBadges();
    toast(`✅ ${name} added to your kitchen!`);
}

/** Removes an item from the inventory by ID. */
function removeItem(id) {
    const items = getItems().filter(i => i.id !== id);
    saveItemsStore(items);
    renderCards();
    updateBadges();
    toast('🗑️ Item removed');
}

/** Marks an item as used, moves it to savedItems, and removes it from inventory. */
function markUsed(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    savedItems.push({...item, usedAt: new Date().toISOString() });
    localStorage.setItem('savedItems', JSON.stringify(savedItems));

    const newItems = items.filter(i => i.id !== id);
    saveItemsStore(newItems);
    renderCards();
    updateBadges();
    renderScore();
    toast(`🎉 ${item.name} marked as used — waste prevented!`);
}

/** Sets the active filter chip and re-renders cards. */
function setFilter(f, btn) {
    currentFilter = f;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
}

/** Renders all inventory item cards, applying the current filter. */
function renderCards() {
    const items = getItems();
    const grid = document.getElementById('itemCards');
    let filtered = items;

    if (currentFilter !== 'all') {
        filtered = items.filter(i => getCardClass(getDaysLeft(i)) === currentFilter);
    }

    // Update hero stats
    const fresh = items.filter(i => getDaysLeft(i) > 5).length;
    const warning = items.filter(i => { const d = getDaysLeft(i); return d > 2 && d <= 5; }).length;
    const urgent = items.filter(i => getDaysLeft(i) <= 2).length;
    document.getElementById('stat-fresh').textContent = fresh;
    document.getElementById('stat-warning').textContent = warning;
    document.getElementById('stat-urgent').textContent = urgent;

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-icon">🥗</div>
      <h3>No items here</h3>
      <p>${currentFilter === 'all' ? 'Add your first grocery item above!' : 'No items in this category.'}</p>
    </div>`;
        return;
    }

    // Sort by days left (most urgent first)
    filtered.sort((a, b) => getDaysLeft(a) - getDaysLeft(b));

    grid.innerHTML = filtered.map(item => {
        const days = getDaysLeft(item);
        const cls = getCardClass(days);
        const pct = Math.max(0, Math.min(100, (days / item.shelfLife) * 100));
        const price = PRICES[item.name] || 15;
        return `<div class="item-card ${cls}">
      <div class="card-name">${item.name}</div>
      <div class="card-meta">Qty: ${item.qty} &nbsp;|&nbsp; ${item.storage} &nbsp;|&nbsp; ₹${price * item.qty} est.</div>
      <div class="days-badge">${daysLabel(days)}</div>
      <div class="expiry-bar-wrap"><div class="expiry-bar" style="width:${pct}%"></div></div>
      <div class="card-actions">
        <button class="used-btn"   onclick="markUsed(${item.id})">✓ Used</button>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    </div>`;
    }).join('');

    updateBadges();
}

/** Updates the badge counters on the nav tabs. */
function updateBadges() {
    const items = getItems();
    document.getElementById('badge-items').textContent = items.length;
    document.getElementById('badge-grocery').textContent = groceryList.filter(g => !g.bought).length;
}
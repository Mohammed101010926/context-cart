// ══════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════

/**
 * Switches the visible page and updates the active tab button.
 * Also triggers the render function for the newly shown page.
 * @param {string}      id  - Page ID suffix (e.g. 'inventory', 'meals').
 * @param {HTMLElement} btn - The tab button that was clicked.
 */
function showPage(id, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    if (btn) btn.classList.add('active');

    if (id === 'inventory') renderCards();
    if (id === 'meals') renderMealsPage();
    if (id === 'grocery') renderGroceryPage();
    if (id === 'score') renderScore();
}
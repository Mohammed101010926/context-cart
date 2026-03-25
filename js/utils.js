// ══════════════════════════════════════════
//  CORE UTILITY FUNCTIONS
// ══════════════════════════════════════════

/**
 * Returns the number of days remaining before an item expires.
 * Negative values mean the item has already expired.
 */
function getDaysLeft(item) {
    const expiry = new Date(item.date);
    expiry.setDate(expiry.getDate() + item.shelfLife);
    return Math.ceil((expiry - new Date()) / 86400000);
}

/**
 * Returns a CSS class name based on days remaining.
 */
function getCardClass(days) {
    if (days <= 0) return 'expired';
    if (days <= 2) return 'urgent';
    if (days <= 5) return 'warning';
    return 'fresh';
}

/**
 * Returns a human-readable label with emoji for days remaining.
 */
function daysLabel(days) {
    if (days <= 0) return '⚠️ Expired';
    if (days === 1) return '🔴 1 day left';
    if (days <= 2) return `🔴 ${days} days left`;
    if (days <= 5) return `🟡 ${days} days left`;
    return `🟢 ${days} days left`;
}

// ══════════════════════════════════════════
//  TOAST NOTIFICATION
// ══════════════════════════════════════════

let toastTimer;

/**
 * Displays a temporary toast notification.
 * @param {string}  msg      - Message to display.
 * @param {boolean} isError  - If true, shows an error-styled toast.
 */
function toast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show' + (isError ? ' error' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
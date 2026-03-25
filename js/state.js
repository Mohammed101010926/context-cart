// ══════════════════════════════════════════
//  STATE & STORAGE
// ══════════════════════════════════════════

let currentFilter = 'all';
let groceryList = JSON.parse(localStorage.getItem('groceryList') || '[]');
let savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');

function getItems() { return JSON.parse(localStorage.getItem('items') || '[]'); }

function saveItemsStore(items) { localStorage.setItem('items', JSON.stringify(items)); }

function getApiKey() { return localStorage.getItem('spoon_api_key') || ''; }

// ══════════════════════════════════════════
//  SEED DEMO DATA (runs once on first visit)
// ══════════════════════════════════════════
(function seedDemo() {
    if (localStorage.getItem('demo_seeded')) return;
    const today = new Date();
    const daysAgo = n => {
        const d = new Date(today);
        d.setDate(d.getDate() - n);
        return d.toISOString().split('T')[0];
    };
    const demo = [
        { id: 1001, name: 'spinach', qty: 1, storage: 'fridge', date: daysAgo(3), shelfLife: 4 },
        { id: 1002, name: 'milk', qty: 2, storage: 'fridge', date: daysAgo(5), shelfLife: 7 },
        { id: 1003, name: 'tomato', qty: 4, storage: 'shelf', date: daysAgo(3), shelfLife: 4 },
        { id: 1004, name: 'chicken', qty: 1, storage: 'fridge', date: daysAgo(1), shelfLife: 2 },
        { id: 1005, name: 'bread', qty: 1, storage: 'shelf', date: daysAgo(3), shelfLife: 5 },
        { id: 1006, name: 'egg', qty: 6, storage: 'fridge', date: daysAgo(5), shelfLife: 21 },
        { id: 1007, name: 'onion', qty: 3, storage: 'shelf', date: daysAgo(2), shelfLife: 14 },
        { id: 1008, name: 'carrot', qty: 2, storage: 'fridge', date: daysAgo(10), shelfLife: 14 },
    ];
    saveItemsStore(demo);
    localStorage.setItem('demo_seeded', '1');
})();
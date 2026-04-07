# ContextCart — Smart Kitchen Manager

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20PWA-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🍳 Overview

**ContextCart** is a comprehensive smart kitchen management system that helps users track food inventory, reduce waste, save money, and discover recipes using expiring ingredients. The application provides real-time expiry tracking, intelligent recipe suggestions via Spoonacular API, grocery list management, and environmental impact scoring.

🔗 **Live Demo:** [ContextCart - Smart Kitchen Manager](#)

---

## ✨ Key Features

### 🥗 Inventory Management
- Add, edit, and remove kitchen items with customizable expiry dates
- Smart shelf-life estimation based on item type and storage method (fridge, shelf, freezer)
- Visual expiry tracking with color-coded status indicators:
  - 🟢 Fresh (6+ days left)
  - 🟡 Warning (3-5 days left)
  - 🔴 Urgent (1-2 days left)
  - ⚫ Expired
- Filter items by expiry status
- Mark items as used to track waste reduction

### 🍽️ Smart Recipe Suggestions
- Integration with **Spoonacular API** for real-time recipe discovery
- Automatically suggests recipes based on expiring ingredients
- Shows which ingredients you have vs. missing
- One-click addition of missing ingredients to grocery list

### 🛒 Grocery List Management
- Auto-generated shopping list from selected recipes
- Check off items as purchased
- Track bought vs. pending items
- Clear completed items with one click

### ♻️ Waste Score Dashboard
- Calculate total food value saved from waste
- Track environmental impact (CO₂ emissions avoided)
- Monitor current inventory value
- View detailed breakdown of used vs. expired items
- Real-time savings tracking

### 🔐 Authentication System
- Secure login page with demo credentials
- Session persistence with "Remember Me" functionality
- Beautiful chef-themed landing page

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **API** | Spoonacular Recipe API |
| **Storage** | LocalStorage / SessionStorage |
| **Fonts** | Google Fonts (Playfair Display, Plus Jakarta Sans, DM Sans, DM Serif Display) |
| **Icons** | Emoji-based UI icons |
| **Architecture** | Modular JavaScript (separate files for concerns) |

---

## 📁 Project Structure

```
contextcart/
├── index.html          # Main dashboard
├── login.html          # Authentication page
├── styles.css          # Global styling
├── app.js              # Application initialization
├── inventory.js        # Inventory management logic
├── meals.js            # Recipe suggestions logic
├── grocery.js          # Grocery list management
├── score.js            # Waste score dashboard
├── state.js            # Global state & storage
├── data.js             # Static data (spoilage rates, prices)
├── utils.js            # Helper functions (date calc, toast)
├── navigation.js       # Page routing
└── README.md           # Documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API features
- (Optional) Spoonacular API key for recipe suggestions

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/contextcart.git
cd contextcart
```

2. **Open the application**
```bash
# Using Python (any version)
python -m http.server 8000

# Using Node.js
npx serve .

# Or simply open index.html in your browser
```

3. **Access the application**
- Navigate to `http://localhost:8000`
- You'll be redirected to login page

### API Key Setup (Optional but Recommended)

1. Sign up for free at [Spoonacular API](https://spoonacular.com/food-api)
2. Navigate to your profile → copy your API key
3. In the app, go to **Meal Ideas** tab
4. Paste your API key and click "Save Key"

> **Note:** Free tier allows 150 points/day (approx. 150 recipe searches)

---

## 🔐 Demo Credentials

| Field | Value |
|-------|-------|
| **Email** | `chef@kitchen.com` |
| **Password** | `chef123` |

*Click "Demo credentials" button on login page to auto-fill*

---

## 📖 Usage Guide

### 1. Adding Items to Inventory
- Navigate to **My Items** tab
- Fill in item name, quantity, storage type, and purchase date
- Click **+ Add Item**
- The system automatically calculates expiry date based on spoilage rates

### 2. Tracking Expiry
- Items are color-coded based on days remaining
- Progress bar shows freshness percentage
- Use **Mark Used** button when you consume an item
- Use **Remove** button to discard expired items

### 3. Getting Recipe Suggestions
- Go to **Meal Ideas** tab
- Ensure API key is saved
- Click **Find Recipes**
- Browse recipes that use your expiring ingredients
- Click any recipe card to add missing ingredients to grocery list

### 4. Managing Grocery List
- Switch to **Grocery** tab
- View all items added from recipes
- Click items to mark as purchased
- Use **Clear bought items** to remove checked items

### 5. Tracking Waste Score
- Go to **Waste Score** tab
- View total savings, CO₂ avoided, and inventory value
- See detailed breakdown of all items

---

## 🎨 UI Features

- **Responsive Design** — Works on desktop, tablet, and mobile
- **Smooth Animations** — Fade-in effects, hover states, loading spinners
- **Toast Notifications** — Real-time feedback for all actions
- **Color-Coded System** — Intuitive visual indicators for expiry status
- **Gradient Backgrounds** — Modern, chef-inspired aesthetic

---

## 📊 Data Models

### Inventory Item
```javascript
{
  id: number,
  name: string,
  qty: number,
  storage: "fridge" | "shelf" | "freezer",
  date: string (YYYY-MM-DD),
  shelfLife: number
}
```

### Grocery Item
```javascript
{
  id: number,
  name: string,
  recipe: string,
  bought: boolean
}
```

### Saved Item (Used)
```javascript
{
  ...item,
  usedAt: string (ISO date)
}
```

---

## 🔧 Configuration

### Spoilage Rates (data.js)
Default shelf-life values for common ingredients:
- **Dairy** (milk, curd, butter, cheese): 2-30 days
- **Proteins** (chicken, fish, mutton): 2-3 days
- **Vegetables** (spinach, tomato, onion): 4-30 days
- **Fruits** (apple, banana, mango): 3-30 days
- **Pantry** (rice, dal, bread): 5-365 days

### Price Database
Estimated prices in ₹ (Indian Rupees) for value tracking:
- Milk: ₹25 | Chicken: ₹120 | Spinach: ₹15
- Tomato: ₹10 | Onion: ₹8 | Apple: ₹20

*Edit `PRICES` object in data.js to customize*

---

## 🌐 API Integration

### Spoonacular Endpoint Used
```
GET https://api.spoonacular.com/recipes/findByIngredients
```

**Parameters:**
- `ingredients` — Comma-separated list of expiring items
- `number` — Number of recipes (default: 6)
- `ranking` — Ranking strategy (1 = minimize missing, 2 = maximize used)
- `apiKey` — Your personal API key

---

## 🧪 Testing

### Manual Test Cases

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Add Item | Add "milk" with date 5 days ago | Shows "🔴 2 days left" |
| Filter | Click "Urgent" filter | Shows only items with ≤2 days left |
| Mark Used | Click ✓ Used on an item | Item disappears, savings increase |
| Recipes | Click Find Recipes | Shows recipes using expiring items |
| Grocery | Click recipe card | Missing items added to grocery list |
| Waste Score | Check after marking used | Total saved value increases |

---

## 📈 Performance Optimization

- **LocalStorage** — All data persists across sessions
- **Modular Code** — Separated concerns for maintainability
- **Lazy Loading** — Recipe images load asynchronously
- **Debounced API Calls** — Prevents excessive requests
- **CSS Animations** — GPU-accelerated transforms

---

## 🐛 Known Issues & Limitations

| Issue | Status | Workaround |
|-------|--------|-------------|
| Spoonacular API requires key | ✅ Documented | Free key available |
| No backend authentication | 🟡 Feature | Session-based only |
| Limited ingredient database | 🟢 Extensible | Add to `SPOILAGE` object |
| No multi-user support | 🔮 Planned | Future enhancement |

---

## 🔮 Roadmap

### Phase 2 (Coming Soon)
- [ ] User accounts with Firebase
- [ ] Barcode scanning for quick add
- [ ] Meal planning calendar
- [ ] Export grocery list to email
- [ ] Dark mode support

### Phase 3 (Future)
- [ ] AI-powered meal planning
- [ ] Recipe sharing community
- [ ] Pantry restock recommendations
- [ ] Nutritional tracking
- [ ] Mobile app (React Native)

---

## 👥 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style (ES6+)
- Test thoroughly before submitting
- Update documentation as needed
- Keep UI consistent with design system

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- **Spoonacular API** for recipe data
- **Google Fonts** for typography
- **EmojiOne** for emoji icons
- **Team Fahhhh** for design inspiration

---

## 📧 Contact & Support

- **Project Lead:** Team Fahhhh
- **Email:** support@contextcart.com
- **GitHub Issues:** [Report Bug](https://github.com/Mohammed101010926/contextcart/issues)

---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub and share it with fellow home cooks and chefs!

---

**Built with 💚 for a zero-waste kitchen**

*ContextCart — Where every ingredient counts*

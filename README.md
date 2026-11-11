# GabayPH — Philippine Public Services & Information Directory

> **Portal ng Serbisyo Publiko ng Pilipinas**  
> An iOS-inspired, interactive public information platform helping Filipino citizens discover government services, civil registry requirements, open careers, financial assistance, scholarships, and disaster safety resources.

---

## 🌟 Highlights & Features

- **Apple HIG-Inspired UX**: Adaptive iOS typography (Inter / SF Pro), 4px spacing rhythm, grouped list cards, segmented tabs, and bottom sheets for mobile.
- **6 Core Public Sectors**:
  1. **Trabaho (Employment)** — Plantilla civil service, healthcare, tech, and agriculture opportunities with salary grades and application instructions.
  2. **Serbisyo (Government Services)** — PhilSys National ID, DFA e-Passport, NBI Clearance, SSS, PhilHealth, LTO, and PSA Civil Registry guides.
  3. **Pera (Financial Aid)** — DSWD AICS crisis medical aid, 4Ps conditional cash grants, DOLE TUPAD cash-for-work, and SSS calamity loans.
  4. **Bayanihan (Community)** — Red Cross blood donor drives, Brigada Eskwela school rehabilitation, and volunteer sign-up intake.
  5. **Aral (Education)** — DOST-SEI STEM scholarships, CHED Tulong Dunong, and TESDA free TVET vouchers.
  6. **Kaligtasan (Safety & Hotlines)** — Verified national hotlines (911, 8888, 143, 1553, 1343), typhoon signals 1–5, earthquake duck-cover-hold guides, and first aid CPR/choking protocols.
- **Universal Search**: Real-time multi-category search with recent queries and popular suggestion tags.
- **Citizen Account & Bookmarks**: Local simulated login/registration with demo profile, bookmark storage, and notification center.
- **Admin Operations Portal**: 14-section admin suite with mock CRUD, moderation reviews (approve/reject/resolve), and audit trail logging.
- **Full Client-Side Routing**: Configured with `vercel.json` SPA rewrite rules so direct URLs and browser refreshes work without 404s.

---

## 🚀 One-Click Deploy to Vercel

Deploy directly to your Vercel account:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDietherFernandez%2FGabayph)

### Vercel Configuration Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `./`

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/DietherFernandez/Gabayph.git
cd Gabayph

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
npm run preview
```

---

## 🛡️ License & Transparency

GabayPH is a prototype public service platform designed for demonstration purposes. Verified national hotlines are linked to official Philippine numbers. No personal information is transmitted to external servers.

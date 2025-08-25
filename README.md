# 🔗 Next.js URL Shortener with Analytics

A modern **URL shortener app** (like a mini Bitly) built with **Next.js 14, Drizzle ORM, PostgreSQL, and Tailwind CSS**.  
Create short, shareable links and track their performance with built-in analytics (click counts, devices, timestamps, charts).

---

## 🚀 Features

- ✨ Shorten any long URL into a clean short link
- 📊 Analytics dashboard with:
  - Total clicks
  - Clicks over time (charts)
  - Device breakdown (Mobile, Tablet, Desktop)
  - Recent click logs (IP, User Agent, timestamp)
- 🏠 Homepage with quick shortener form
- 🖥️ Dashboard with:
  - List of all shortened URLs + click counts
  - Inline form to create new short URLs
- 📱 Responsive design (mobile-friendly)
- ⚡ Powered by Next.js App Router + API Routes
- 🎨 Styled with TailwindCSS + shadcn/ui
- 🔄 PostgreSQL + Drizzle ORM for schema + migrations
- ☁️ Deploy-ready on **Vercel**

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Database**: PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/en-US/)

---

## ⚙️ Setup

### 1. Clone Repository

```bash
git clone https://github.com/Code14-ZeD/shorturl.git
cd shorturl
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shortener
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Setup Database with Drizzle

```bash
npm run db:push   # push schema to DB
```

## ▶️ Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
🚀

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

# 🗳️ Pemilihan Ketua OSIS — Web App

> "Suaramu Menentukan Masa Depan SMK Taruna Bhakti"

A digital OSIS chairman election web application built for SMK Taruna Bhakti Depok. This was a **group project** for the Program Analysis subject, allowing students to vote for their OSIS candidates digitally — replacing the traditional paper ballot system.

## 👥 Team Members

- Aghis Sulaiman
- Anindita Amantaruna Putri Roswanto
- Muhamad Fazril Sugianto
- Rifky Chandra
- Yoel Siahaan

## 💡 Project Concept

The app provides a complete digital voting experience — from a landing page introducing the candidates, to a secure login system, voting interface, and live result visualization. Built with Next.js and Supabase as the backend for real-time data and authentication.

## ✨ Key Features

**💫 Splash Screen**
Animated splash screen on first load using Framer Motion before the landing page appears.

**🏠 Landing Page**
Public-facing page with hero section ("Suaramu Menentukan Masa Depan"), candidate information, OSIS background section, and footer.

**🔐 Authentication**
Secure login system powered by Supabase Auth — only registered students can access the voting page.

**🗳️ Voting System**
Students can cast their vote for their preferred OSIS chairman and vice chairman candidate.

**📊 Live Results**
Real-time vote count visualization using Recharts — results update instantly as votes come in.

**📱 Responsive Design**
Fully responsive across desktop, tablet, and mobile using Tailwind CSS v4.

## 🛠️ Technologies Used

| Technology | Description |
|---|---|
| ▲ Next.js 16 | React framework with App Router |
| 🗄️ Supabase | Backend, database, and authentication |
| 🎨 Tailwind CSS v4 | Utility-first styling |
| 🎞️ Framer Motion | Splash screen and page animations |
| 📊 Recharts | Live vote result charts |
| 👁️ React Intersection Observer | Scroll-triggered animations |

## 🚀 Getting Started

```bash
git clone https://github.com/Aghissulaiman/pemilihan-osis-web.git
cd pemilihan-osis-web
npm install
npm run dev
```

> ⚠️ You'll need to set up your own Supabase project and add the environment variables to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📜 Available Scripts

```bash
npm run dev
npm run build
npm run start
```
---

> Built as a group project for the Program Analysis subject at SMK Taruna Bhakti Depok. 🏫
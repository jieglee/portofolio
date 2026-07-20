# 🗳️ Pemilihan Ketua OSIS — Web App

> "Suaramu Menentukan Masa Depan SMK Taruna Bhakti"

Aplikasi web pemilihan ketua OSIS digital yang dibangun untuk SMK Taruna Bhakti Depok. Ini adalah **proyek kelompok** untuk mata pelajaran Analisis Program, memungkinkan siswa memilih kandidat OSIS mereka secara digital — menggantikan sistem surat suara kertas tradisional.

## 👥 Anggota Tim

- Aghis Sulaiman
- Anindita Amantaruna Putri Roswanto
- Muhamad Fazril Sugianto
- Rifky Chandra
- Yoel Siahaan

## 💡 Konsep Proyek

Aplikasi ini menyediakan pengalaman voting digital yang lengkap — dari halaman landing yang memperkenalkan kandidat, hingga sistem login yang aman, antarmuka voting, dan visualisasi hasil real-time. Dibangun dengan Next.js dan Supabase sebagai backend untuk data real-time dan autentikasi.

## ✨ Fitur Utama

- **Splash Screen** — Splash screen animasi pada muatan pertama menggunakan Framer Motion sebelum halaman landing muncul.
- **Landing Page** — Halaman publik dengan bagian hero ("Suaramu Menentukan Masa Depan"), informasi kandidat, bagian latar belakang OSIS, dan footer.
- **Autentikasi** — Sistem login aman menggunakan Supabase Auth — hanya siswa terdaftar yang dapat mengakses halaman voting.
- **Sistem Voting** — Siswa dapat memberikan suara untuk kandidat ketua dan wakil ketua OSIS pilihan mereka.
- **Hasil Real-time** — Visualisasi penghitungan suara real-time menggunakan Recharts — hasil diperbarui secara instan saat suara masuk.
- **Desain Responsif** — Sepenuhnya responsif di desktop, tablet, dan mobile menggunakan Tailwind CSS v4.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|---|---|
| Next.js 16 | React framework dengan App Router |
| Supabase | Backend, database, dan autentikasi |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Splash screen dan animasi halaman |
| Recharts | Grafik hasil voting real-time |
| React Intersection Observer | Animasi yang terpicu saat scroll |

## 🚀 Memulai

```bash
git clone https://github.com/Aghissulaiman/pemilihan-osis-web.git
cd pemilihan-osis-web
npm install
npm run dev
```

> ⚠️ Kamu perlu membuat proyek Supabase sendiri dan menambahkan variabel environment ke `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📜 Script yang Tersedia

```bash
npm run dev
npm run build
npm run start
```

---

> Dibangun sebagai proyek kelompok untuk mata pelajaran Analisis Program di SMK Taruna Bhakti Depok. 🏫

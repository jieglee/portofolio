# 📚 PusTBaka — Perpustakaan Sekolah

> "Baca Banyak, Tanya Banyak, Jadi Banyak Tahu"

PusTBaka adalah aplikasi perpustakaan sekolah berbasis digital yang dibangun dalam **dua platform**: **Mobile (Expo/React Native)** untuk siswa dan **Web (Next.js)** untuk admin & backend. Proyek ini dirancang untuk menggantikan sistem peminjaman buku manual dengan solusi digital yang modern, efisien, dan mudah digunakan.

## 💡 Project Concept

PusTBaka (singkatan dari **Pus**at **T**elusur **Ba**caan dan **Ka**rta) hadir untuk menjawab kebutuhan perpustakaan sekolah yang masih menggunakan pencatatan manual. Aplikasi ini memisahkan peran antara **siswa** yang meminjam buku melalui aplikasi mobile, dan **petugas/admin** yang mengelola koleksi serta peminjaman melalui web.

## ✨ Key Features

### 📱 Mobile App (Siswa)
- **🔐 Login & Register** — Autentikasi pengguna untuk akses sistem
- **📖 Katalog Buku** — Jelajahi koleksi buku perpustakaan
- **🔍 Pencarian Buku** — Cari buku berdasarkan judul atau kategori
- **📥 Peminjaman Buku** — Siswa dapat meminjam buku langsung dari aplikasi
- **📤 Pengembalian Buku** — Proses pengembalian dengan estimasi denda keterlambatan
- **📋 Riwayat Peminjaman** — Lihat histori peminjaman dan status buku
- **👤 Profil Pengguna** — Kelola informasi akun

### 💻 Web App (Admin)
- **🏠 Dashboard** — Ringkasan data perpustakaan (total buku, peminjaman aktif, anggota)
- **📚 Manajemen Buku** — CRUD koleksi buku dengan upload cover
- **👥 Manajemen Anggota** — Kelola data siswa yang terdaftar sebagai anggota
- **📊 Laporan Peminjaman** — Lihat dan kelola semua transaksi peminjaman
- **🔐 Autentikasi Admin** — Login khusus untuk petugas perpustakaan

## 🛠️ Technologies Used

### Mobile App
| Technology | Description |
|---|---|
| 🟦 TypeScript | Type-safe JavaScript |
| ⚛️ Expo / React Native | Cross-platform mobile framework |
| 🗄️ Supabase | Backend, database, storage, dan autentikasi |
| 🧭 Expo Router | File-based routing untuk navigasi |
| 🎨 Tailwind CSS (NativeWind) | Utility-first styling di mobile |

### Web App & Backend
| Technology | Description |
|---|---|
| 🟨 JavaScript | Bahasa pemrograman utama |
| ▲ Next.js | React framework dengan App Router |
| 🗄️ Supabase | Backend, database, storage, dan autentikasi |
| 🎨 CSS | Styling dan layout halaman admin |

## 🚀 Getting Started

### Mobile App
```bash
git clone https://github.com/jieglee/pustbaka-expo.git
cd pustbaka-expo
npm install
npx expo start
```

### Web App
```bash
git clone https://github.com/jieglee/pustbaka-next.git
cd pustbaka-next
npm install
npm run dev
```

> ⚠️ Kedua aplikasi membutuhkan proyek Supabase. Buat file `.env` atau `.env.local` dengan kredensial Supabase kamu.

---

> Dibangun dengan ❤️ untuk memajukan budaya literasi di sekolah. — PusTBaka

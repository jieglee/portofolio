# 📢 LaporGas — Pengaduan Masyarakat

> "Lapor Cepat, Tanggap Cepat"

LaporGas adalah sistem pengaduan masyarakat berbasis digital yang dibangun dalam **tiga platform**: **Mobile (Expo/React Native)** untuk warga yang ingin menyampaikan laporan, **Web (Next.js)** untuk admin yang mengelola laporan, dan **Backend API (Express.js)** sebagai penghubung antar platform.

## 💡 Project Concept

LaporGas hadir untuk mempermudah masyarakat dalam menyampaikan pengaduan atau laporan terkait layanan gas. Dengan aplikasi ini, warga dapat melaporkan keluhan secara langsung dari ponsel mereka, melacak status laporan, dan melihat peta lokasi pengaduan — tanpa perlu datang ke kantor layanan.

## ✨ Key Features

### 📱 Mobile App (Warga)
- **🔐 Login & Register** — Autentikasi pengguna untuk akses sistem
- **📝 Buat Laporan** — Formulir pengaduan dengan upload foto bukti dan lokasi
- **📍 Peta Lokasi** — Tampilkan lokasi pengaduan di peta interaktif
- **📋 Riwayat Laporan** — Pantau status semua laporan yang pernah dibuat
- **🔔 Notifikasi** — Update status laporan secara real-time
- **👤 Profil Pengguna** — Kelola informasi akun

### 💻 Web App (Admin)
- **🏠 Dashboard** — Ringkasan data pengaduan (total laporan, status, statistik)
- **📊 Visualisasi Data** — Grafik dan chart untuk analisis pengaduan
- **📋 Manajemen Laporan** — Lihat, filter, dan update status pengaduan
- **🗺️ Peta Interaktif** — Tampilan peta untuk lokasi semua pengaduan
- **👥 Manajemen Pengguna** — Kelola data warga yang terdaftar
- **🔐 Autentikasi Admin** — Login khusus untuk petugas

### ⚙️ Backend API
- **🔗 RESTful API** — Endpoint untuk komunikasi antar platform
- **🗄️ Database** — Supabase sebagai database dan autentikasi
- **📤 Upload File** — Cloudinary untuk penyimpanan foto bukti
- **🔒 Keamanan** — JWT authentication dan password hashing

## 🛠️ Technologies Used

### Mobile App
| Technology | Description |
|---|---|
| 🟦 TypeScript | Type-safe JavaScript |
| ⚛️ Expo / React Native | Cross-platform mobile framework |
| 🧭 Expo Router | File-based routing untuk navigasi |
| 🗺️ React Native Maps | Peta interaktif di mobile |
| 📦 Zustand | State management |
| 🎨 React Native Paper | UI component library |

### Web App
| Technology | Description |
|---|---|
| 🟦 TypeScript | Type-safe JavaScript |
| ▲ Next.js | React framework dengan App Router |
| 🎨 Tailwind CSS | Utility-first CSS framework |
| 🎞️ Framer Motion | Animasi halaman dan komponen |
| 📊 Recharts | Library untuk visualisasi data |
| 🗺️ React Leaflet | Peta interaktif di web |
| 🔐 NextAuth | Autentikasi pengguna |
| 🎨 Shadcn UI | UI component library |

### Backend API
| Technology | Description |
|---|---|
| 🟨 JavaScript | Bahasa pemrograman utama |
| ⚡ Express.js | Web framework untuk REST API |
| 🗄️ Supabase | Database, autentikasi, dan storage |
| ☁️ Cloudinary | Penyimpanan dan optimasi gambar |
| 🔒 JWT & Bcrypt | Autentikasi dan enkripsi password |
| ✅ Zod | Validasi data |

## 🚀 Getting Started

### Mobile App
```bash
git clone https://github.com/jieglee/laporGas-expo-mobile.git
cd laporGas-expo-mobile
npm install
npx expo start
```

### Web App
```bash
git clone https://github.com/jieglee/laporGas-next.git
cd laporGas-next
npm install
npm run dev
```

### Backend API
```bash
git clone https://github.com/jieglee/lapor-gas-express.git
cd lapor-gas-express
npm install
npm run dev
```

> ⚠️ Semua aplikasi membutuhkan konfigurasi environment variables. Buat file `.env` atau `.env.local` dengan kredensial Supabase, Cloudinary, dan JWT secret kamu.

---

> Dibangun dengan ❤️ untuk memberikan layanan pengaduan yang lebih baik bagi masyarakat. — LaporGas

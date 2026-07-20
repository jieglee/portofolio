# 🚨 LaporGas — Platform Pengaduan Warga

Platform pengaduan warga full-stack yang memungkinkan warga melaporkan masalah infrastruktur dan layanan publik di daerah mereka. Dibangun sebagai **sistem 3 platform**: dashboard web (Next.js), aplikasi mobile (Expo/React Native), dan backend REST API (Express.js + PostgreSQL).

> 📝 **Proyek Kelas XI Semester 4** — SMK Taruna Bhakti, Program Keahlian Rekayasa Perangkat Lunak

## 💡 Konsep Proyek

LaporGas (sebelumnya LaporAja) dibangun untuk menjembatani kesenjangan antara warga dan pemerintah daerah. Pengguna dapat mengirimkan pengaduan dengan foto, lokasi GPS, dan deskripsi. Admin meninjau, mengkategorikan (dengan auto-categorization AI via **Ollama**), dan menyelesaikan laporan. Sistem ini mendukung akses berbasis peran (user, admin, superadmin) dan notifikasi real-time.

## 🏗️ Arsitektur Sistem

```
Mobile App (Expo)  ←→  Backend API (Express)  ←→  Web Dashboard (Next.js)
                              ↕
                    PostgreSQL (pgAdmin 4)
                    Cloudinary (Images)
                    Ollama (AI)
```

## 📱 Mobile App (Expo / React Native)

Aplikasi mobile untuk warga yang ingin mengirimkan dan melacak pengaduan.

**Fitur Utama:**
- Pemilihan lokasi berbasis GPS untuk pengiriman pengaduan
- Upload multi-foto via Cloudinary
- NearbyReports — lihat pengaduan di sekitar lokasi kamu (react-native-maps)
- Notifikasi push untuk update status
- Sistem komentar pada laporan
- Autentikasi dengan Zustand + SecureStore (JWT)
- Login admin/superadmin diblokir di mobile

**Tech Stack:**

| Teknologi | Deskripsi |
|---|---|
| Expo / React Native | Framework mobile cross-platform |
| Expo Router | Navigasi berbasis file |
| Expo Location | Koordinat GPS |
| React Native Maps | Tampilan peta laporan terdekat |
| TanStack Query | Manajemen state server |
| Zustand | Manajemen state autentikasi |
| Expo SecureStore | Penyimpanan JWT aman |
| Expo Image Picker | Upload multi-foto |

## 🌐 Web Dashboard (Next.js)

Dashboard admin untuk mengelola laporan, pengguna, dan statistik.

**Fitur Utama:**
- Dashboard dengan statistik dan ringkasan laporan
- Integrasi peta Leaflet untuk lokasi laporan
- Galeri foto dengan lightbox
- Manajemen laporan (tinjau, update status, riwayat edit)
- Manajemen pengguna dengan diferensiasi peran
- Sistem notifikasi
- Grafik dengan Recharts

**Tech Stack:**

| Teknologi | Deskripsi |
|---|---|
| Next.js + TypeScript | React framework dengan App Router |
| Leaflet + React Leaflet | Peta interaktif (dynamic import, SSR disabled) |
| Recharts | Grafik statistik |
| Tailwind CSS + shadcn/ui | Styling dan komponen |
| Framer Motion | Animasi |
| NextAuth | Autentikasi |

## ⚙️ Backend API (Express.js)

RESTful API yang menangani semua logika bisnis, upload file, dan kategorisasi AI.

**Fitur Utama:**
- Autentikasi JWT dengan akses berbasis peran (user/admin/superadmin)
- Auto-categorization AI menggunakan **Ollama** (LLM lokal, berjalan di mesin kamu)
- Upload multi-foto via **Cloudinary** (multer + multer-storage-cloudinary)
- PostgreSQL dikelola via **pgAdmin 4**
- Geocoding dengan **Nominatim**
- Validasi request dengan **Zod**
- CORS dikonfigurasi untuk web + mobile

**Tech Stack:**

| Teknologi | Deskripsi |
|---|---|
| Express.js | Framework REST API Node.js |
| PostgreSQL + pg | Database relasional |
| pgAdmin 4 | Manajemen database PostgreSQL |
| Cloudinary | Upload dan hosting gambar |
| Ollama | Model AI lokal untuk kategorisasi pengaduan |
| JWT + bcrypt | Autentikasi & enkripsi password |
| Zod | Validasi skema |

## 🚀 Memulai

**Backend:**
```bash
git clone https://github.com/jieglee/lapor-gas-express.git
cd lapor-gas-express
npm install
npm run dev
```

**Web Dashboard:**
```bash
git clone https://github.com/jieglee/laporGas-next.git
cd laporGas-next
npm install
npm run dev
```

**Mobile App:**
```bash
git clone https://github.com/jieglee/laporGas-expo-mobile.git
cd laporGas-expo-mobile
npm install
npx expo start
```

## ⚙️ Variabel Environment

```bash
DATABASE_URL=your_supabase_postgresql_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
OLLAMA_BASE_URL=http://localhost:11434
```

## 🌐 Source Code

- [Web Dashboard — laporGas-next](https://github.com/jieglee/laporGas-next)
- [Mobile App — laporGas-expo-mobile](https://github.com/jieglee/laporGas-expo-mobile)
- [Backend API — lapor-gas-express](https://github.com/jieglee/lapor-gas-express)

---

> Proyek civic tech yang menggabungkan AI, peta, dan notifikasi real-time untuk membantu warga melaporkan dan melacak masalah layanan publik. 🏙️

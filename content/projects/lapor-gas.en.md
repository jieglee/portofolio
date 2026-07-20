# 🚨 LaporGas — Civic Complaint Platform

A full-stack civic complaint platform that allows citizens to report infrastructure and public service issues in their area. Built as a **3-platform system**: a web dashboard (Next.js), a mobile app (Expo/React Native), and a REST API backend (Express.js + PostgreSQL).

> 📝 **Grade XI Semester 4 Project** — SMK Taruna Bhakti, Software Engineering Program

## 💡 Project Concept

LaporGas (previously LaporAja) was built to bridge the gap between citizens and local authorities. Users can submit complaints with photos, GPS location, and descriptions. Admins review, categorize (with AI auto-categorization via **Ollama**), and resolve reports. The system supports role-based access (user, admin, superadmin) and real-time notifications.

## 🏗️ System Architecture

```
Mobile App (Expo)  ←→  Backend API (Express)  ←→  Web Dashboard (Next.js)
                              ↕
                    PostgreSQL (pgAdmin 4)
                    Cloudinary (Images)
                    Ollama (AI)
```

## 📱 Mobile App (Expo / React Native)

Student-facing mobile app for submitting and tracking complaints.

**Key Features:**
- GPS-based location picker for complaint submission
- Multi-photo upload via Cloudinary
- NearbyReports — see complaints near your location (react-native-maps)
- Push notifications for status updates
- Comment system on reports
- Auth with Zustand + SecureStore (JWT)
- Admin/superadmin login blocked on mobile

**Tech Stack:**

| Technology | Description |
|---|---|
| Expo / React Native | Cross-platform mobile framework |
| Expo Router | File-based navigation |
| Expo Location | GPS coordinates |
| React Native Maps | Nearby reports map view |
| TanStack Query | Server state management |
| Zustand | Auth state management |
| Expo SecureStore | Secure JWT storage |
| Expo Image Picker | Multi-photo upload |

## 🌐 Web Dashboard (Next.js)

Admin-facing dashboard for managing reports, users, and statistics.

**Key Features:**
- Dashboard with statistics and report overview
- Leaflet map integration for report locations
- Photo gallery with lightbox
- Report management (review, update status, edit history)
- User management with role differentiation
- Notification system
- Charts with Recharts

**Tech Stack:**

| Technology | Description |
|---|---|
| Next.js + TypeScript | React framework with App Router |
| Leaflet + React Leaflet | Interactive map (dynamic import, SSR disabled) |
| Recharts | Statistics charts |
| Tailwind CSS + shadcn/ui | Styling and components |
| Framer Motion | Animations |
| NextAuth | Authentication |

## ⚙️ Backend API (Express.js)

RESTful API handling all business logic, file uploads, and AI categorization.

**Key Features:**
- JWT authentication with role-based access (user/admin/superadmin)
- AI auto-categorization using **Ollama** (local LLM, runs on your machine)
- Multi-photo upload via **Cloudinary** (multer + multer-storage-cloudinary)
- PostgreSQL managed via **pgAdmin 4**
- Geocoding with **Nominatim**
- Request validation with **Zod**
- CORS configured for web + mobile

**Tech Stack:**

| Technology | Description |
|---|---|
| Express.js | Node.js REST API framework |
| PostgreSQL + pg | Relational database |
| pgAdmin 4 | PostgreSQL database management |
| Cloudinary | Image upload and hosting |
| Ollama | Local AI model for complaint categorization |
| JWT + bcrypt | Authentication & password hashing |
| Zod | Schema validation |

## 🚀 Getting Started

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

## ⚙️ Environment Variables

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

> A civic tech project combining AI, maps, and real-time notifications to help citizens report and track public service issues. 🏙️

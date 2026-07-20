# 📚 PusTBaka — Digital School Library

> "Read More, Ask More, Know More"

PusTBaka is a digital school library application built on **two platforms**: **Mobile (Expo/React Native)** for students and **Web (Next.js)** for admin & backend. This project was designed to replace the manual book borrowing system with a modern, efficient, and easy-to-use digital solution.

> 📝 **Grade XI Semester 3 Project** — SMK Taruna Bhakti, Software Engineering Program

## 💡 Project Concept

PusTBaka (short for **Pus**at **T**elusur **B**acaan dan **K**artu) was created to address the needs of school libraries that still rely on manual record-keeping. The application separates roles between **students** who borrow books through the mobile app, and **staff/admin** who manage collections and loans through the web.

## ✨ Key Features

### 📱 Mobile App (Students)

- **Login & Register** — User authentication for system access
- **Book Catalog** — Browse the library's book collection
- **Book Search** — Find books by title or category
- **Book Borrowing** — Students can borrow books directly from the app
- **Book Returns** — Return process with overdue fine estimation
- **Borrowing History** — View loan history and book status
- **User Profile** — Manage account information

### 💻 Web App (Admin)

- **Dashboard** — Library data overview (total books, active loans, members)
- **Book Management** — CRUD book collection with cover upload
- **Member Management** — Manage registered student data
- **Loan Reports** — View and manage all borrowing transactions
- **Admin Authentication** — Dedicated login for library staff

## 🛠️ Technologies Used

### Mobile App

| Technology | Description |
|---|---|
| Expo / React Native | Cross-platform mobile framework |
| Expo Router | File-based routing for navigation |
| Tailwind CSS (NativeWind) | Utility-first styling on mobile |

### Web App & Backend

| Technology | Description |
|---|---|
| Next.js | React framework with App Router |
| Supabase | Backend, database, storage, and authentication |
| CSS | Styling and admin page layout |

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

> ⚠️ Both applications require a Supabase project. Create a `.env` or `.env.local` file with your Supabase credentials.

---

> Built with ❤️ to promote literacy culture in schools. — PusTBaka

# 🐾 JiePaws — Pet Shop E-Commerce

A fully functional pet shop e-commerce web application built with React + Vite and Tailwind CSS. Created as a school project (Grade 10, Semester 2) for the Software Engineering concentration at SMK Taruna Bhakti.

## 💡 Project Concept

JiePaws is an online pet shop platform that allows users to browse pet products, add items to a cart or wishlist, complete a checkout flow, and manage their orders and profile — all in one modern, responsive web app.

The design uses a warm and friendly aesthetic fitting for a pet shop, featuring pet illustrations, brand logos, and a smooth animated UI powered by Framer Motion.

## ✨ Key Features

**🏠 Landing Page**
Public-facing landing page with hero section, bestseller products, brand showcase, and footer — visible before login.

**🔐 Authentication**
Full login and register flow with route protection. Users are redirected to the home page after successful login.

**🐶 Home Page (After Login)**
Personalized homepage with navbar, search bar, promo section, pet categories, bestseller grid, and brand carousel.

**🛍️ Product Detail**
Individual product page with full details, images, and an Add to Cart button.

**🛒 Cart (Keranjang)**
Cart page showing selected items with quantity control and total price calculation.

**💳 Checkout**
Checkout flow (`/co`) for completing purchases from the cart.

**❤️ Wishlist**
Save favorite products to a personal wishlist page.

**📦 My Orders**
Order history page showing past purchases.

**👤 Profile**
User profile page with personal information management.

**🔔 Toast Notifications**
Real-time feedback using `react-toastify` for add to cart, login success, and other actions.

## 🛠️ Technologies Used

| Technology | Description |
|---|---|
| ⚛️ React | Component-based UI library |
| ⚡ Vite | Fast build tool and dev server |
| 🎨 Tailwind CSS | Utility-first CSS framework |
| 🎞️ Framer Motion | Smooth page and component animations |
| 🔀 React Router DOM | Client-side routing between pages |
| 🔔 React Toastify | Toast notification system |

## 📁 Project Structure

```
src/
├── pages/          # Route-level page components
│   ├── Landingpage.jsx
│   ├── Homepage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Detail.jsx
│   ├── Keranjang.jsx
│   ├── checkOut.jsx
│   ├── Wishlist.jsx
│   ├── myorder.jsx
│   └── Profile.jsx
└── component/      # Reusable UI components
    ├── LandingPage/
    ├── HomePage/
    ├── CartPage/
    ├── DetailProduk/
    ├── Checkout/
    ├── Login/
    ├── Register/
    ├── WishList/
    ├── Myorder/
    └── Profilepage/
```

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/jieglee/jiepaws-react-vite.git

# 2. Navigate to project folder
cd jiepaws-react-vite

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

Built with 🐾 and a lot of love for pets — JiePaws, your one-stop online pet shop!
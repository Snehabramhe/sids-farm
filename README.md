# 🥛 Sid's Farm Clone

Sid's Farm started as a simple promise from a father to his son to provide him with the purest, safest milk possible.

Tested daily for antibiotics, hormones, and additives — it takes more tests than any college kid! Only milk that aces every test is delivered to your doorstep. We're setting the benchmark for doubt-free dairy: backed by science, sustained by effort, and a promise to protect every family we serve.

This repository is a **full-stack e-commerce clone** of the Sid's Farm dairy store, built with the **MERN** stack (MongoDB, Express, React, Node.js) and Redux Toolkit + Redux-Saga, with Stripe-powered online payments.

---

## ✨ Features

- 🔐 **Authentication** — register / login with JWT, password show/hide toggle, protected & admin-only routes
- 🛒 **Cart** — add to cart, increment/decrement quantity, remove items; cart persists across refresh via `localStorage`
- 📦 **Catalog** — paginated product grid with **Load More**, product detail pages, and an admin product manager (CRUD)
- 💳 **Checkout** — Cash on Delivery **and** Stripe online payments (test mode)
- 🧾 **Orders** — place orders, view order history, admin order management with status updates
- 🏠 **Addresses** — add / edit a shipping address
- 🎨 **Modern UI** — responsive Tailwind CSS design with reusable product cards and toast notifications

---

## 🧱 Tech Stack

| Layer        | Technology                                                        |
|--------------|-------------------------------------------------------------------|
| Frontend     | React 18, Vite, React Router, Redux Toolkit, Redux-Saga, Tailwind CSS |
| Backend      | Node.js, Express, Mongoose                                        |
| Database     | MongoDB                                                           |
| Payments     | Stripe                                                            |
| Auth         | JSON Web Tokens (JWT), bcryptjs                                   |

---

## 📂 Project Structure

```
sids-farm/
├── src/                      # React frontend
│   ├── components/           # Reusable UI (Navbar, ProductCard, modals, payments)
│   ├── pages/                # Route pages (home, products, carts, users, orders, ...)
│   ├── redux/                # Slices + sagas (product, cart, user, order, address, payment)
│   ├── services/             # Axios API clients
│   ├── ui/                   # Shared UI helpers (loaders, toasts)
│   └── util/                 # Token / axios / toast utilities
├── server/                   # Express backend
│   ├── controller/           # Route handlers
│   ├── routes/               # Express routers
│   ├── database/schema/      # Mongoose schemas
│   ├── middlewares/          # Auth + validation middleware
│   ├── seed/                 # Database seed scripts
│   └── server.js             # App entry point
├── .env                      # Frontend env (Vite) — git-ignored
└── server/.env               # Backend env — git-ignored
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas)
- A [Stripe](https://dashboard.stripe.com/test/apikeys) test account (for online payments)

### 1. Clone & install

```bash
git clone <repo-url>
cd sids-farm

# install frontend deps
npm install

# install backend deps
cd server && npm install && cd ..
```

### 2. Configure environment variables

**`server/.env`** (backend):

```env
MONGO_DB_URL=mongodb://127.0.0.1:27017
MONGO_DATABASE=sids_farm
HOSTNAME=localhost
PORT=9000
JWT_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
```

**`.env`** (frontend, project root — only the Stripe **publishable** key is safe here):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
VITE_PAYMENT_RETURN_URL=http://localhost:5173/payments/payment-success
```

> ⚠️ The publishable (`pk_test_…`) and secret (`sk_test_…`) keys must belong to the **same** Stripe account.
> Vite only exposes variables prefixed with `VITE_`, and it reads `.env` **only at startup** — restart the dev server after changes.

### 3. Seed the database (optional but recommended)

Populate the store with a realistic Sid's Farm catalog (milk, paneer, ghee, curd, butter, etc.):

```bash
cd server
npm run seed
```

The seed is idempotent (upserts by product name), so it's safe to re-run.

### 4. Run the app

```bash
# Terminal 1 — backend (from server/)
cd server
npm start            # nodemon server.js -> http://localhost:9000

# Terminal 2 — frontend (from project root)
npm run dev          # vite -> http://localhost:5173
```

---

## 📜 Available Scripts

**Frontend (project root)**

| Command           | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

**Backend (`server/`)**

| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `npm start`     | Start the API server with nodemon            |
| `npm run seed`  | Seed the products collection                 |

---

## 💳 Testing Payments (Stripe test mode)

Use any Stripe test card with a **future expiry**, **any CVC**, and **any ZIP**:

| Scenario                          | Card number            |
|-----------------------------------|------------------------|
| ✅ Success (Visa)                  | `4242 4242 4242 4242`  |
| 🔐 Requires authentication (3DS)  | `4000 0025 0000 3155`  |
| ❌ Declined                        | `4000 0000 0000 0002`  |

---

## 🔌 API Overview

| Resource   | Base path            | Notes                                  |
|------------|----------------------|----------------------------------------|
| Products   | `/api/products`      | `GET /?page=&limit=` for pagination    |
| Users      | `/api/users`         | Register, login, profile               |
| Cart       | `/api/carts`         | Create cart, get cart info             |
| Orders     | `/api/orders`        | Place, list, update status             |
| Addresses  | `/api/addresses`     | Add / edit / get address               |
| Payments   | `/api/payments`      | Create Stripe payment intent           |

---

## 🖼️ Website Images

<img width="2940" height="1666" alt="image" src="https://github.com/user-attachments/assets/e6f829a6-5242-4cfb-acde-925febe73fbf" />

<img width="2940" height="1673" alt="image" src="https://github.com/user-attachments/assets/e70a02f0-fdc0-4698-afba-ff21c028e36d" />

<img width="2940" height="1670" alt="image" src="https://github.com/user-attachments/assets/80dba662-10ed-4d72-8c35-4c98c45460d6" />

<img width="2940" height="1666" alt="image" src="https://github.com/user-attachments/assets/4da6aa12-c8c5-4c76-9256-770cb8718137" />

<img width="2940" height="1672" alt="image" src="https://github.com/user-attachments/assets/384783c6-1963-4786-8357-4802a177ec84" />

<img width="2940" height="1665" alt="image" src="https://github.com/user-attachments/assets/4d7511a1-7556-445a-b070-ed10a9404d07" />



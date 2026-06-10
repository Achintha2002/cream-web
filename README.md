#  Raani Cream - Premium E-Commerce Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)
![React](https://img.shields.io/badge/Frontend-React.js%20%2B%20Vite-blue.svg)
![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-teal.svg)

A modern, fully-featured MERN stack e-commerce web application built for a premium skincare brand. This platform offers a seamless shopping experience for customers and a comprehensive administrative dashboard for store managers.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://cream-web-ten.vercel.app](https://cream-web-ten.vercel.app)
- **Backend API (Render)**: [https://cream-web-backend.onrender.com](https://cream-web-backend.onrender.com)

---

## ✨ Features

### 🛍️ Customer Experience
- **Interactive Product Catalog**: Beautiful product display with filtering and details.
- **Dynamic Shopping Cart**: Real-time cart updates with a sliding drawer UI.
- **Secure Authentication**: User registration, login, and password recovery.
- **Profile Management**: Users can track their order history and update profile details.
- **Contact System**: Direct inquiry submission to the store administrators.

### 👑 Admin Console
- **Analytics Dashboard**: Real-time insights into total sales, order status ratios, and best-selling products.
- **Order Management**: Process orders, update shipping statuses, and track fulfillment.
- **Inventory Control**: Add new products, adjust stock levels, and receive **low-stock alerts**.
- **Customer Inquiries**: Read and reply directly to messages sent by customers.
- **User Management**: Add new administrative users to the system.

### 🎨 UI / UX
- Premium, glassmorphism-inspired aesthetic with a nature-themed color palette.
- Fully responsive design optimized for mobile, tablet, and desktop viewing.
- Smooth micro-animations using Framer Motion.

---

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: React.js 18 (Bootstrapped with Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons & Animations**: Lucide React, Framer Motion

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Utilities**: Nodemailer (Email integration), CORS, dotenv

---

## 📂 Project Structure

```text
cream-web/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/                
│   │   ├── components/     # Reusable UI components (Navbar, Footer, CartDrawer)
│   │   ├── context/        # React Context (AuthContext, CartContext)
│   │   ├── pages/          # Page views (Home, Products, AdminDashboard, etc.)
│   │   └── services/       # API integration logic
│   └── vite.config.js      # Vite configuration
│
└── server/                 # Backend Express Application
    ├── middleware/         # Custom middlewares (e.g., auth verification)
    ├── models/             # Mongoose database schemas
    ├── routes/             # Express API endpoints
    ├── utils/              # Helper functions (e.g., email service)
    └── index.js            # Main server entry point
```

---

## 💻 Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Achintha2002/cream-web.git
cd cream-web
```

### 2. Setup the Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```
Run the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory and add:
```env
VITE_API_URL=http://localhost:5001/api
```
Run the frontend development server:
```bash
npm run dev
```

---

## 🚀 Deployment

- The **Frontend** is configured for deployment on **Vercel** (uses `vite build`).
- The **Backend** is configured for deployment on **Render** as a Node.js Web Service.

*(Ensure environment variables are properly set in the respective hosting platforms during deployment, particularly `CLIENT_URL` in the backend and `VITE_API_URL` in the frontend).*

---

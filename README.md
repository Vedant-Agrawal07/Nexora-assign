# 🛒 Pickit - Modern Shopping Web App

Pickit is a modern full-stack shopping application built with **React (Vite)** and **Node.js/Express**, featuring **secure checkout**, **cart management**, and a **dark minimalist UI**.
It allows users to browse products, add them to cart, and place orders — all connected to a backend API with authentication and database storage.

---

## 🚀 Features

* 🧾 **Dynamic Cart Management** — Add, remove, or update products in real-time.
* 🕒 **Live Order Summary** — Automatically updates price, quantity, and delivery options.
* 💳 **Checkout Flow** — Calculates totals with tax, and places orders securely.
* 🧭 **Routing** — Smooth page transitions using React Router.
* ⚡ **Vite + Tailwind** — Super-fast build and modern styling.
* 🌑 **Dark Mode UI** — Minimal, elegant, and responsive design.
* 🔒 **JWT Authentication** — Backend-secured routes and tokens for users.

---

## 🧩 Tech Stack

| Layer           | Technologies Used                               |
| --------------- | ----------------------------------------------- |
| **Frontend**    | React (Vite), Tailwind CSS, Axios, React Router |
| **Backend**     | Node.js, Express.js                             |
| **Database**    | MongoDB (via Mongoose)                          |
| **Deployment**  | Vercel (frontend), Render (backend)             |
| **Other Tools** | Day.js (date formatting), JWT (auth)            |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/pickit-app.git
cd pickit-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

Inside the root folder, create a `.env` file and add:

```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

> 💡 You can get this backend URL after deploying your Node.js API on Render or any other hosting platform.

### 4️⃣ Run the App

```bash
npm run dev
```

Your app will now be live at:
👉 `http://localhost:5173`

---

## 🧭 Folder Structure (Frontend)

```
src/
├── components/
│   ├── OrderSummary.jsx
│   ├── PaymentSummary.jsx
├── pages/
│   ├── Checkout.jsx
│   ├── Pickit.jsx
│   ├── Orders.jsx
├── lib/
│   ├── Cart.js
│   ├── orders.js
│   ├── deliveryOptions.js
├── App.jsx
└── main.jsx
```

## 🧭 Folder Structure (Backend)

```
backend/
├── config/
│   ├── db.js
├── controllers/
│   ├── cartController.jsx
│   ├── orderController.jsx
│   ├── productController.jsx
│   ├── userController.jsx
├── middleware/
│   ├── authUser.js
├── models/
│   ├── cartModel.js
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
├── routes/
│   ├── cartRoute.js
│   ├── orderRoute.js
│   ├── userRoute.js
│   ├── productRoute.js
├── utils/
│   ├── tokenGen.js
├── CoreProducts.js
└── server.js
```

---

## 🛠️ API Endpoints (Backend Overview)

| Endpoint        | Method | Description               |
| --------------- | ------ | ------------------------- |
| `/api/product`  | GET    | Fetch prodcuts            |
| `/api/user`     | POST   | user route                |
| `/api/cart`     | DELETE | cart route                |
| `/api/order`    | POST   | Place an order            |

---

## 🖼️ Screenshots

You can add screenshots of your project here for a more visual README.

### 🏠 Home Page

*(Add a screenshot showing your product list page)*


![Home Page](https://github.com/Vedant-Agrawal07/Nexora-assign/blob/86d07570805097570c03dcd664c7258f72a53459/screenshots/home-page-scr-1.png)


![Home Page](https://github.com/Vedant-Agrawal07/Nexora-assign/blob/86d07570805097570c03dcd664c7258f72a53459/screenshots/home-page-scr-2.png)
```
```
### 🛒 Checkout Page

*(Add a screenshot showing order summary & payment summary)*


![Checkout Page](https://github.com/Vedant-Agrawal07/Nexora-assign/blob/86d07570805097570c03dcd664c7258f72a53459/screenshots/checkout-page-scr.png)
```
```
### 📦 Orders Page

*(Add a screenshot of past orders)*


![Orders Page](https://github.com/Vedant-Agrawal07/Nexora-assign/blob/86d07570805097570c03dcd664c7258f72a53459/screenshots/orders-page-scr.png)
```
```

### 📦 Tracking Page

*(Add a screenshot of past orders)*


![Orders Page](https://github.com/Vedant-Agrawal07/Nexora-assign/blob/86d07570805097570c03dcd664c7258f72a53459/screenshots/tracking-page-scr.png)
```



## 🔐 Environment Variables (Frontend)

| Variable       | Description                                   |
| -------------- | --------------------------------------------- |
| `VITE_API_URL` | Backend API base URL (e.g. Render deployment) |

---

## 🚀 Deployment

### Frontend (Vercel)

* Choose **Framework Preset:** Vite
* Add Environment Variable:
  `VITE_API_URL` → your backend API link
* Add a `vercel.json` file (for route handling):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Backend (Render)

* Deploy from GitHub repo.
* Set environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).
* Copy the Render live URL and paste it in your frontend `.env`.

---



---

## 💡 Author

**Vedant Agrawal**
🌐 GitHub: [https://github.com/your-username](https://github.com/your-username)

---



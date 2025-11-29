# Luxe - Premium E-commerce Platform

## Project Overview
A full-stack, modern e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). The platform features a premium, responsive UI, comprehensive product management for admins, and a seamless shopping experience for users. It is containerized with Docker for easy deployment and scalability.

## Technology Stack

### Frontend
-   **Framework**: React 19 (Latest)
-   **Build Tool**: Vite (Fast HMR & Bundling)
-   **Styling**: Tailwind CSS v4 (Utility-first CSS), Framer Motion (Animations), Lucide React (Icons)
-   **State Management**: Context API (Auth, Cart, Shop)
-   **Routing**: React Router DOM v7
-   **HTTP Client**: Axios (with Interceptors for JWT)
-   **Notifications**: Sonner (Toast notifications)

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js v5
-   **Database**: MongoDB (NoSQL) with Mongoose v9 ODM
-   **Authentication**: JWT (JSON Web Tokens) & bcryptjs (Password Hashing)
-   **Middleware**: Custom Error Handling, Async Handler, CORS

### DevOps & Deployment
-   **Containerization**: Docker & Docker Compose (Multi-stage builds)
-   **Web Server**: Nginx (Reverse Proxy & Static File Serving)
-   **Deployment**: Render (Cloud Hosting)
-   **Version Control**: Git

## Key Features

### 🛍️ User Experience (Client)
-   **Authentication**: Secure User Registration & Login with JWT.
-   **Product Browsing**:
    -   Dynamic Product Listing with responsive grid layout.
    -   **Product Details**: Detailed view with Image Gallery, Color/Size selection, and Stock status indicators ("Low Stock", "Out of Stock").
-   **Shopping Cart**:
    -   Real-time cart updates using Context API.
    -   Cart Drawer for quick access.
    -   Support for product variants (Size/Color).
-   **Checkout Flow**: Streamlined checkout process with order summary.
-   **User Profile**: View order history and order details.
-   **Responsive Design**: Mobile-first approach ensuring compatibility across all devices.

### 🛡️ Admin Dashboard
-   **Protected Routes**: Role-based access control (RBAC) ensuring only admins access the dashboard.
-   **Product Management**:
    -   **Create**: Comprehensive form to add products with multiple images, sizes, colors, and stock levels.
    -   **Edit**: Update existing product details dynamically.
    -   **Delete**: Remove products from the catalog.
-   **User Management**: View and manage registered users.

### ⚙️ Technical Highlights
-   **Custom Authentication Middleware**: Protects routes and verifies admin privileges.
-   **Optimized Performance**:
    -   Vite for lightning-fast builds.
    -   Nginx for efficient static asset serving and API proxying.
-   **Production Ready**:
    -   Environment variable configuration for flexibility.
    -   Dockerized setup ensures consistency across development and production environments.
    -   Error handling middleware for robust backend stability.

## Project Structure

```
E-commerce/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Request logic
│   ├── models/              # Mongoose Schemas (User, Product, Order)
│   ├── routes/              # API Endpoints
│   ├── middleware/          # Auth & Error handling
│   └── Dockerfile           # Backend container config
├── frontend/                # React + Vite App
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Home, Shop, Admin)
│   │   ├── context/         # Global State (Auth, Cart)
│   │   └── services/        # API integration
│   ├── Dockerfile           # Frontend container config
│   └── nginx.conf           # Nginx proxy config
└── docker-compose.yml       # Orchestration for full stack
```

# Deployment Guide (Render)

This guide explains how to deploy the E-commerce application to Render using Docker.

## Prerequisites
-   A [Render](https://render.com) account.
-   Code pushed to a GitHub repository.

## Step 1: Deploy Backend (Web Service)

1.  **Create New Web Service**:
    -   Go to Render Dashboard > New > Web Service.
    -   Connect your GitHub repository.

2.  **Configure Backend**:
    -   **Name**: `ecommerce-backend` (or similar)
    -   **Runtime**: Docker
    -   **Root Directory**: `backend` (Important: Point this to the backend folder)
    -   **Region**: Choose closest to you.

3.  **Environment Variables**:
    Add the following environment variables:
    -   `PORT`: `5000`
    -   `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
    -   `JWT_SECRET`: A strong secret key.
    -   `NODE_ENV`: `production`

4.  **Deploy**: Click "Create Web Service".
5.  **Copy URL**: Once deployed, copy the backend URL (e.g., `https://ecommerce-backend.onrender.com`).

## Step 2: Deploy Frontend (Web Service)

1.  **Create New Web Service**:
    -   Go to Render Dashboard > New > Web Service.
    -   Connect the SAME GitHub repository.

2.  **Configure Frontend**:
    -   **Name**: `ecommerce-frontend`
    -   **Runtime**: Docker
    -   **Root Directory**: `frontend` (Important: Point this to the frontend folder)

3.  **Environment Variables**:
    Add the following environment variable:
    -   `VITE_API_URL`: The backend URL from Step 1 **plus `/api`** (e.g., `https://ecommerce-backend.onrender.com/api`).
    -   **Note**: This variable is used during the build process to bake the API URL into the React app.

4.  **Deploy**: Click "Create Web Service".

## Step 3: Verify

1.  Open the Frontend URL provided by Render.
2.  Try to register/login.
3.  Verify products load.

## Troubleshooting

-   **CORS Issues**: If you see CORS errors, ensure your backend allows the frontend domain. You might need to update `cors` configuration in `backend/server.js` if it's too restrictive (currently it allows all `*` which is fine for testing but check if you changed it).
-   **Build Fails**: Check the logs in Render. Ensure the `Root Directory` is set correctly for both services.

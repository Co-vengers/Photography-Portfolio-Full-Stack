# Photography Portfolio and Booking Website

A full-stack photography portfolio and booking platform built with React, Tailwind CSS, Node.js, Express, MongoDB, JWT authentication, Axios, and Framer Motion.

## Features

- Responsive portfolio website with dark/light mode
- Category-based photo filtering and modal previews
- User signup/login with JWT authentication
- Booking flow with date, time, and client message
- User dashboard for bookings and favorite photos
- Admin tools for photo uploads, booking approvals, and blog management

## Environment Variables

### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/photo_portfolio
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Studio Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=photo-portfolio
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Vercel Deployment (Monorepo)

Deploy this repository as two separate Vercel projects:

1. **Backend API project**
  - Root Directory: `server`
  - Framework: `Other`
  - Uses `server/api/index.js` as the serverless entrypoint.
  - Set env vars: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
  - For image file uploads in production, also set Cloudinary vars:
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `CLOUDINARY_FOLDER` (optional)

2. **Frontend project**
  - Root Directory: `client`
  - Framework: `Vite`
  - Env var: `VITE_API_URL=https://<your-backend-domain>/api`

3. **CORS alignment**
  - Set backend `CLIENT_URL` to your frontend Vercel URL.

4. **Health check**
  - Verify backend at `https://<your-backend-domain>/api/health`.

### Upload behavior

- Admin uploads support either image URLs or image files.
- On Vercel, local disk storage is not persistent. File uploads are sent to Cloudinary when Cloudinary vars are configured.
- If Cloudinary vars are missing, use image URLs from the admin panel.

## Setup

1. Run `npm run install:all`
2. Start MongoDB locally
3. Run `npm run dev:server`
4. Run `npm run dev:client`
5. Open `http://localhost:5173`

## Folder Structure

```text
photo-portfolio-app/
  client/
    src/
      components/
      context/
      lib/
      pages/
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    uploads/
```

## Admin Panel

- Login with the seeded admin credentials from `server/.env`
- Upload images using a local file or hosted image URL
- Approve or reject bookings
- Add blog posts from the dashboard

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/photos`
- `POST /api/photos`
- `DELETE /api/photos/:id`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`
- `GET /api/blogs`
- `POST /api/blogs`

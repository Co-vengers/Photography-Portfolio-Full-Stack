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
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

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

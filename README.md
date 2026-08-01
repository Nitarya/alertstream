# Notification Feed

A full-stack notification feed app: a React + Vite + Tailwind CSS frontend that lists notifications served by an Express API, with unread filtering and mark-as-read support.

## Features

- 📥 Fetches and displays notifications from the API
- 🎨 Color-coded notification types: `security`, `system`, `billing`, `feature`
- 🔴 Live unread count badge in the header
- 🔍 "Unread only" filter toggle
- ✅ Mark individual notifications as read
- 🧠 In-memory data store — no database setup required

## Tech Stack

| Layer     | Tech                                      |
| --------- | ----------------------------------------- |
| Frontend  | React 19, Vite 8, Tailwind CSS 4          |
| Backend   | Node.js, Express 4, CORS                  |

## Project Structure

```
notification-feed/
├── backend/                 # Express API
│   └── server/
│       ├── index.js         # Server + API routes
│       └── data.js          # In-memory notification store
└── frontend/                # React + Vite app
    └── src/
        ├── App.jsx          # Main UI
        ├── main.jsx         # Entry point
        └── index.css        # Tailwind styles
```

## Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8)
- npm (bundled with Node.js)

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the backend

The API server runs on port `3001`.

```bash
cd backend
npm run dev    # watch mode (restarts on file changes)
# or
npm start      # single run
```

You should see: `Server running on http://localhost:3001`.

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API

| Method | Endpoint                              | Description                                       |
| ------ | ------------------------------------- | ------------------------------------------------- |
| GET    | `/api/notifications`                  | List all notifications                            |
| GET    | `/api/notifications?unreadOnly=true`  | List only unread notifications                    |
| PATCH  | `/api/notifications/:id/read`         | Mark a notification as read                       |

**PATCH responses:**

| Status | Meaning                                    |
| ------ | ------------------------------------------ |
| `200`  | Success — returns the updated notification |
| `400`  | Notification already marked as read        |
| `404`  | Notification not found                     |

## Development Scripts

| Directory | Command           | What it does                            |
| --------- | ----------------- | --------------------------------------- |
| `backend` | `npm run dev`     | Run the server with `node --watch`      |
| `backend` | `npm start`       | Run the server once                     |
| `frontend`| `npm run dev`     | Start the Vite dev server (HMR)         |
| `frontend`| `npm run lint`    | Lint with oxlint                        |
| `frontend`| `npm run build`   | Production build to `dist/`             |
| `frontend`| `npm run preview` | Preview the production build            |

## Notes

- Notification data lives in memory (`backend/server/data.js`) — changes are lost when the server restarts.
- The frontend calls the API at `http://localhost:3001/api`, hardcoded in `frontend/src/App.jsx`. Change it there if your API runs elsewhere.

# Todo App

A full-stack task management application with a React frontend and Express backend, using MongoDB for persistence.

## Tech Stack

**Frontend**

- React 19 + TypeScript 6
- Vite 8
- Tailwind CSS 4
- shadcn/ui (base-nova style)
- Lucide React (icons)

**Backend**

- Node.js + Express 5
- TypeScript 7
- Mongoose 9 + MongoDB
- CORS

**Tooling**

- pnpm (package manager)
- concurrently (runs frontend and backend together)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) running locally on `127.0.0.1:27017`

### Installation

```sh
# Install all dependencies (root, frontend, backend)
pnpm install
```

### Environment Variables

**Frontend** — `frontend/.env` (already set)

```
VITE_API_URL=http://localhost:5000/api
```

**Backend** — `backend/.env`

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
CLIENT_URL=http://localhost:5173
```

See `frontend/.env.example` and `backend/.env.example` for reference.

### Running

```sh
# Start both frontend and backend
pnpm dev
```

| Service  | URL                    |
| -------- | ---------------------- |
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:5000  |

## Project Structure

```
todo-app/
├── frontend/
│   └── src/
│       ├── api/todo.api.ts          # API client (fetch)
│       ├── types/todo.ts            # Todo interface, TodoFilter type
│       ├── components/
│       │   ├── todos/               # Feature components
│       │   │   ├── todo-page.tsx    # Main page + state management
│       │   │   ├── todo-form.tsx    # Add new todo form
│       │   │   ├── todo-list.tsx    # Todo list wrapper
│       │   │   ├── todo-item.tsx    # Single todo card
│       │   │   ├── todo-filters.tsx # Filter tabs + search input
│       │   │   ├── todo-stats.tsx   # Total/Active/Completed cards
│       │   │   ├── todo-header.tsx  # Page heading
│       │   │   └── todo-empty.tsx   # Empty state
│       │   └── ui/                  # shadcn/ui components
│       └── lib/utils.ts             # cn() utility
│
├── backend/
│   └── src/
│       ├── server.ts                # Entry point
│       ├── app.ts                   # Express app setup
│       ├── config/db.ts             # MongoDB connection
│       ├── routes/todo.routes.ts    # Route definitions
│       ├── controllers/todo.controller.ts  # Request handlers
│       ├── services/todo.service.ts # Business logic + DB queries
│       ├── models/todo.model.ts     # Mongoose schema
│       ├── types/todo.types.ts      # TypeScript interfaces
│       └── middleware/              # Error + 404 handlers
│
└── package.json                     # Root scripts (pnpm dev)
```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method   | Endpoint         | Description                  |
| -------- | ---------------- | ---------------------------- |
| `GET`    | `/api/health`    | Health check                 |
| `GET`    | `/api/todos`     | List todos (with filters)    |
| `GET`    | `/api/todos/:id` | Get a single todo            |
| `POST`   | `/api/todos`     | Create a new todo            |
| `PATCH`  | `/api/todos/:id` | Update a todo                |
| `DELETE` | `/api/todos/:id` | Delete a todo                |

### Query Parameters

`GET /api/todos` supports:

| Param    | Values                       | Description                          |
| -------- | ---------------------------- | ------------------------------------ |
| `status` | `all`, `active`, `completed` | Filter by completion status          |
| `search` | any string                   | Search title and description (case-insensitive) |

Examples:

```
GET /api/todos
GET /api/todos?status=active
GET /api/todos?search=react
GET /api/todos?status=completed&search=design
```

### Request Body

**Create todo** (`POST /api/todos`)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Update todo** (`PATCH /api/todos/:id`)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": true
}
```

All fields are optional for PATCH — only include what you want to update.

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

## Features

- **CRUD operations** — Create, read, update, and delete todos
- **Status filtering** — View all, active, or completed todos
- **Search** — Case-insensitive search across title and description
- **Stats dashboard** — Total, active, and completed task counts
- **Loading states** — Skeleton placeholders while data loads
- **Error handling** — Inline error messages for failed operations
- **Responsive layout** — Works on mobile and desktop
- **MongoDB persistence** — Todos survive page refreshes

## Architecture

```
React UI
  → todo.api.ts (fetch)
    → Express (CORS, JSON parsing)
      → Controller (validation, error handling)
        → Service (business logic, MongoDB queries)
          → Mongoose Model → MongoDB
```

The backend owns all data persistence, filtering, and search. The frontend is a consumer of the API — it holds no local source of truth.

## Scripts

| Command         | Location    | Description                     |
| --------------- | ----------- | ------------------------------- |
| `pnpm dev`      | Root        | Start frontend + backend        |
| `pnpm dev`      | Frontend    | Start Vite dev server           |
| `pnpm build`    | Frontend    | Type-check and build for production |
| `pnpm typecheck`| Frontend    | Run TypeScript type-check only  |
| `pnpm lint`     | Frontend    | Run ESLint                      |
| `pnpm dev`      | Backend     | Start Express with tsx watch    |
| `pnpm build`    | Backend     | Compile TypeScript to `dist/`   |
| `pnpm start`    | Backend     | Run compiled JS in production   |

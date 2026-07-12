# AssetFlow

AssetFlow is an Enterprise Asset & Resource Management System built for the Odoo Hackathon 2026. It provides a centralized platform for managing assets, employees, departments, allocations, bookings, maintenance requests, audits, notifications, and reporting through a modern web app.

## Overview

The project is divided into a React + Vite frontend and a Node.js + Express + PostgreSQL backend. The system is designed to help organizations track assets throughout their lifecycle, assign them to employees, manage maintenance and audits, and provide a clear operational dashboard.

## Project Goals

- Centralize asset and resource management
- Reduce manual tracking through spreadsheets
- Improve allocation visibility and accountability
- Support booking and maintenance workflows
- Make audit preparation easier through structured records

## Core Modules

### Frontend Modules
- Login and authentication flow
- Dashboard overview
- Department management
- Employee management
- Asset category management
- Asset management
- Asset allocation and returns
- Booking creation and calendar view
- Maintenance request handling
- Audit cycle management
- Notifications center
- Profile and settings pages

### Backend Modules
- Authentication
- Departments CRUD
- Employees CRUD
- Asset categories CRUD
- Assets CRUD
- Asset allocations
- Bookings
- Maintenance requests
- Audits
- Notifications
- Reporting endpoints

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Architecture

The backend follows a layered structure:

Route → Controller → Service → Repository → PostgreSQL

This keeps business logic in services, SQL queries in repositories, and request/response handling in controllers.

## Folder Structure

```text
TeamBreadAndJam-Odoo/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
└── README.md
```

## Database Design

The application uses PostgreSQL and includes tables for:

- roles
- departments
- employees
- asset_categories
- assets
- asset_allocations
- asset_transfers
- bookings
- maintenance_requests
- audit_cycles
- audit_records
- notifications
- activity_logs

## Frontend Details

The frontend is built with React and Vite and includes:

- A responsive dashboard for overview metrics and actions
- Reusable UI components such as cards, tables, badges, buttons, and loaders
- Page-based routing for modules including assets, allocations, bookings, maintenance, audits, notifications, reports, settings, and profile
- Service modules for communicating with the backend API
- Protected navigation flow for authenticated users

Default frontend development server:
- http://localhost:5173

## Backend Details

The backend exposes REST APIs under the `/api` path and uses JWT-based authentication. The API follows a consistent response format:

Success:
```json
{
  "success": true,
  "data": {}
}
```

Failure:
```json
{
  "success": false,
  "message": "Error message"
}
```

## API Overview

### Authentication
- `POST /api/auth/login`

### Departments
- `GET /api/departments`
- `GET /api/departments/:id`
- `POST /api/departments`
- `PUT /api/departments/:id`
- `DELETE /api/departments/:id`

### Employees
- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

### Asset Categories
- `GET /api/asset-categories`
- `GET /api/asset-categories/:id`
- `POST /api/asset-categories`
- `PUT /api/asset-categories/:id`
- `DELETE /api/asset-categories/:id`

### Assets
- `GET /api/assets`
- `GET /api/assets/:id`
- `POST /api/assets`
- `PUT /api/assets/:id`
- `DELETE /api/assets/:id`

### Allocations
- `GET /api/allocations`
- `GET /api/allocations/:id`
- `POST /api/allocations`
- `POST /api/allocations/allocate`
- `POST /api/allocations/return`
- `POST /api/allocations/transfer`
- `PUT /api/allocations/:id`
- `DELETE /api/allocations/:id`

### Bookings
- `GET /api/bookings`
- `GET /api/bookings/calendar`
- `GET /api/bookings/:id`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `DELETE /api/bookings/:id`

### Maintenance
- `GET /api/maintenance`
- `GET /api/maintenance/history`
- `GET /api/maintenance/:id`
- `POST /api/maintenance`
- `PUT /api/maintenance/:id`
- `DELETE /api/maintenance/:id`

### Audits
- `GET /api/audits`
- `GET /api/audits/:id`
- `POST /api/audits`
- `POST /api/audits/verify`
- `PUT /api/audits/:id`
- `PUT /api/audits/:id/close`
- `DELETE /api/audits/:id`

### Notifications
- `GET /api/notifications`
- `GET /api/notifications/:id`
- `POST /api/notifications`
- `PUT /api/notifications/:id/read`
- `DELETE /api/notifications/:id`

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/hannah5320/-TeamBreadAndJam-Odoo.git
cd -TeamBreadAndJam-Odoo
```

### 2. Set up PostgreSQL

Create a PostgreSQL database named `assetflow` and run the SQL files in the database folder:

```bash
psql -U postgres -d assetflow -f database/schema.sql
psql -U postgres -d assetflow -f database/seed.sql
```

### 3. Configure environment variables

Create a `.env` file inside the backend folder with the following values:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=assetflow
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
JWT_SECRET=your_secret_key
```

### 4. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`.

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Security

- JWT authentication
- bcrypt password hashing
- Parameterized SQL queries
- Input validation in services and controllers
- Role-based access structure ready for extension

## Team

- Hannah Daniel – Backend development, database design, API development
- Hrishita – Frontend development, UI/UX, dashboard and page implementation

## Future Enhancements

- QR code asset tracking
- Email notifications
- Advanced analytics and reporting dashboards
- File upload support
- Mobile-friendly improvements

## License

Developed for the Odoo Hackathon 2026.

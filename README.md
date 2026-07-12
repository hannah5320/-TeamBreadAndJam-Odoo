# TeamBreadAndJam-Odoo
# AssetFlow – Enterprise Asset & Resource Management System

## Overview

AssetFlow is a centralized Enterprise Asset & Resource Management System developed for the Odoo Hackathon 2026.

The application enables organizations to efficiently manage assets, employees, departments, bookings, maintenance requests, audits, and notifications through a modern web interface backed by PostgreSQL.

---

## Problem Statement

Organizations often rely on spreadsheets and disconnected systems to manage organizational assets, resulting in:

- Poor asset visibility
- Manual allocation tracking
- Booking conflicts
- Delayed maintenance
- Difficult audit management

AssetFlow provides a centralized ERP-style solution to simplify the complete asset lifecycle.

---

## Features

### Authentication
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt

### Dashboard
- Asset Overview
- Employee Summary
- Department Summary
- Quick Statistics

### Department Management
- Create Department
- View Departments
- Update Department
- Delete Department

### Employee Management
- Create Employee
- Assign Department
- Assign Role
- Manage Status

### Asset Categories
- CRUD Operations
- Category Management

### Asset Management
- Asset Registration
- Asset Tracking
- Asset Status
- Asset Information

### Asset Allocation
- Allocate Assets
- Return Assets
- Allocation History

### Resource Booking
- Resource Booking
- Booking Management

### Maintenance
- Maintenance Requests
- Maintenance Tracking

### Audit
- Audit Records
- Audit Verification

### Notifications
- System Notifications
- User Notifications

---

## Tech Stack

### Frontend

- React
- Vite
- Axios

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Authentication

- JWT
- bcrypt

---

## Project Structure

```
TeamBreadAndJam-Odoo/

│
├── frontend/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│
└── README.md
```

---

## Database Modules

- Roles
- Departments
- Employees
- Asset Categories
- Assets
- Asset Allocations
- Bookings
- Maintenance
- Audits
- Notifications

---

## REST APIs

### Authentication

```
POST /api/auth/login
```

### Departments

```
GET
POST
PUT
DELETE
```

### Employees

```
GET
POST
PUT
DELETE
```

### Asset Categories

```
GET
POST
PUT
DELETE
```

### Assets

```
GET
POST
PUT
DELETE
```

### Asset Allocations

```
GET
POST
PUT (Return Asset)
```

### Bookings

```
GET
POST
PUT
DELETE
```

### Maintenance

```
GET
POST
PUT
DELETE
```

### Audits

```
GET
POST
PUT
DELETE
```

### Notifications

```
GET
POST
PUT
DELETE
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/hannah5320/-TeamBreadAndJam-Odoo.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### PostgreSQL

Create a database named:

```
assetflow
```

Execute:

- schema.sql
- seed.sql

Configure the `.env` file.

---

## Security

- JWT Authentication
- bcrypt Password Hashing
- Parameterized SQL Queries
- Input Validation
- Role-Based Access Ready

---

## Team

### Hannah Daniel
- Backend Development
- PostgreSQL Database
- REST APIs
- Authentication
- Asset Management Logic

### Hrishita
- Frontend Development
- UI/UX
- Dashboard
- React Components
- API Integration

---

## Future Enhancements

- QR Code Asset Tracking
- Email Notifications
- Advanced Analytics
- File Uploads
- Mobile Support

---

## License

Developed for **Odoo Hackathon 2026**.

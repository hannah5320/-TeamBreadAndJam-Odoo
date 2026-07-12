# AssetFlow API Documentation

Base URL

```
http://localhost:5000
```

---

## Authentication

### Login

POST /api/auth/login

Request

```json
{
  "email": "admin@assetflow.com",
  "password": "admin123"
}
```

---

## Departments

| Method | Endpoint |
|---------|----------|
| GET | /api/departments |
| GET | /api/departments/:id |
| POST | /api/departments |
| PUT | /api/departments/:id |
| DELETE | /api/departments/:id |

---

## Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/employees |
| GET | /api/employees/:id |
| POST | /api/employees |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |

---

## Asset Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/asset-categories |
| GET | /api/asset-categories/:id |
| POST | /api/asset-categories |
| PUT | /api/asset-categories/:id |
| DELETE | /api/asset-categories/:id |

---

## Assets

| Method | Endpoint |
|---------|----------|
| GET | /api/assets |
| GET | /api/assets/:id |
| POST | /api/assets |
| PUT | /api/assets/:id |
| DELETE | /api/assets/:id |

---

## Asset Allocations

| Method | Endpoint |
|---------|----------|
| GET | /api/allocations |
| GET | /api/allocations/:id |
| POST | /api/allocations |
| PUT | /api/allocations/return/:id |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| GET | /api/bookings |
| GET | /api/bookings/:id |
| POST | /api/bookings |
| PUT | /api/bookings/:id |
| DELETE | /api/bookings/:id |

---

## Maintenance

| Method | Endpoint |
|---------|----------|
| GET | /api/maintenance |
| GET | /api/maintenance/:id |
| POST | /api/maintenance |
| PUT | /api/maintenance/:id |
| DELETE | /api/maintenance/:id |

---

## Audits

| Method | Endpoint |
|---------|----------|
| GET | /api/audits |
| GET | /api/audits/:id |
| POST | /api/audits |
| PUT | /api/audits/:id |
| DELETE | /api/audits/:id |

---

## Notifications

| Method | Endpoint |
|---------|----------|
| GET | /api/notifications |
| GET | /api/notifications/:id |
| POST | /api/notifications |
| PUT | /api/notifications/:id |
| DELETE | /api/notifications/:id |

---

All APIs return

Success

```json
{
    "success": true,
    "data": {}
}
```

Failure

```json
{
    "success": false,
    "message": "Error message"
}
```
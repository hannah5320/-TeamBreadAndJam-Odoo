# AssetFlow Database

Database

PostgreSQL

Database Name

```
assetflow
```

## Tables

- roles
- departments
- employees
- asset_categories
- assets
- asset_allocations
- bookings
- maintenance
- audits
- notifications

## Relationships

roles
↓

employees

departments
↓

employees

asset_categories
↓

assets

employees
↓

asset_allocations

assets
↓

asset_allocations

employees
↓

bookings

assets
↓

bookings

assets
↓

maintenance

employees
↓

audits

employees
↓

notifications

## Status Values

Departments

- Active
- Inactive

Employees

- Active
- Inactive

Assets

- Available
- Allocated
- Maintenance
- Retired

Allocations

- Allocated
- Returned

Bookings

- Pending
- Approved
- Rejected
- Cancelled

Maintenance

- Pending
- In Progress
- Completed

Notifications

- Read
- Unread
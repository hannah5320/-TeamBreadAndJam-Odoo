-- ============================
-- AssetFlow Database Schema
-- PostgreSQL
-- ============================

-- ============================
-- ROLES
-- ============================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- ============================
-- DEPARTMENTS
-- ============================

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE NOT NULL,
    parent_department_id INT,
    status VARCHAR(20) DEFAULT 'Active',

    CONSTRAINT fk_parent_department
    FOREIGN KEY(parent_department_id)
    REFERENCES departments(department_id)
);

-- ============================
-- EMPLOYEES
-- ============================

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    department_id INT NOT NULL,

    role_id INT NOT NULL,

    status VARCHAR(20) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(department_id)
    REFERENCES departments(department_id),

    FOREIGN KEY(role_id)
    REFERENCES roles(role_id)
);

-- ============================
-- ASSET CATEGORIES
-- ============================

CREATE TABLE asset_categories (

    category_id SERIAL PRIMARY KEY,

    category_name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT
);

-- ============================
-- ASSETS
-- ============================

CREATE TABLE assets (

    asset_id SERIAL PRIMARY KEY,

    asset_tag VARCHAR(30) UNIQUE NOT NULL,

    asset_name VARCHAR(150) NOT NULL,

    serial_number VARCHAR(100) UNIQUE,

    category_id INT NOT NULL,

    acquisition_date DATE,

    acquisition_cost DECIMAL(12,2),

    asset_condition VARCHAR(50),

    current_location VARCHAR(150),

    is_shared BOOLEAN DEFAULT FALSE,

    status VARCHAR(30) DEFAULT 'Available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(category_id)
    REFERENCES asset_categories(category_id)
);

-- ============================
-- ASSET ALLOCATIONS
-- ============================

CREATE TABLE asset_allocations (

    allocation_id SERIAL PRIMARY KEY,

    asset_id INT NOT NULL,

    employee_id INT NOT NULL,

    allocated_date DATE DEFAULT CURRENT_DATE,

    expected_return_date DATE,

    actual_return_date DATE,

    status VARCHAR(30) DEFAULT 'Allocated',

    checkin_notes TEXT,

    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    FOREIGN KEY(employee_id)
    REFERENCES employees(employee_id)
);

-- ============================
-- ASSET TRANSFERS
-- ============================

CREATE TABLE asset_transfers (

    transfer_id SERIAL PRIMARY KEY,

    asset_id INT NOT NULL,

    from_employee INT NOT NULL,

    to_employee INT NOT NULL,

    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    approval_status VARCHAR(30) DEFAULT 'Pending',

    approved_by INT,

    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    FOREIGN KEY(from_employee)
    REFERENCES employees(employee_id),

    FOREIGN KEY(to_employee)
    REFERENCES employees(employee_id),

    FOREIGN KEY(approved_by)
    REFERENCES employees(employee_id)
);

-- ============================
-- BOOKINGS
-- ============================

CREATE TABLE bookings (

    booking_id SERIAL PRIMARY KEY,

    asset_id INT NOT NULL,

    employee_id INT NOT NULL,

    booking_start TIMESTAMP NOT NULL,

    booking_end TIMESTAMP NOT NULL,

    booking_status VARCHAR(30) DEFAULT 'Upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    FOREIGN KEY(employee_id)
    REFERENCES employees(employee_id)
);

-- ============================
-- MAINTENANCE REQUESTS
-- ============================

CREATE TABLE maintenance_requests (

    maintenance_id SERIAL PRIMARY KEY,

    asset_id INT NOT NULL,

    requested_by INT NOT NULL,

    issue_description TEXT,

    priority VARCHAR(20),

    request_status VARCHAR(30) DEFAULT 'Pending',

    technician_name VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    resolved_at TIMESTAMP,

    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    FOREIGN KEY(requested_by)
    REFERENCES employees(employee_id)
);

-- ============================
-- AUDIT CYCLES
-- ============================

CREATE TABLE audit_cycles (

    audit_cycle_id SERIAL PRIMARY KEY,

    audit_name VARCHAR(150),

    department_id INT,

    start_date DATE,

    end_date DATE,

    created_by INT,

    status VARCHAR(30) DEFAULT 'Open',

    FOREIGN KEY(department_id)
    REFERENCES departments(department_id),

    FOREIGN KEY(created_by)
    REFERENCES employees(employee_id)
);

-- ============================
-- AUDIT RECORDS
-- ============================

CREATE TABLE audit_records (

    audit_record_id SERIAL PRIMARY KEY,

    audit_cycle_id INT NOT NULL,

    asset_id INT NOT NULL,

    auditor_id INT NOT NULL,

    verification_status VARCHAR(30),

    remarks TEXT,

    FOREIGN KEY(audit_cycle_id)
    REFERENCES audit_cycles(audit_cycle_id),

    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    FOREIGN KEY(auditor_id)
    REFERENCES employees(employee_id)
);

-- ============================
-- NOTIFICATIONS
-- ============================

CREATE TABLE notifications (

    notification_id SERIAL PRIMARY KEY,

    employee_id INT NOT NULL,

    title VARCHAR(200),

    message TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(employee_id)
    REFERENCES employees(employee_id)
);

-- ============================
-- ACTIVITY LOGS
-- ============================

CREATE TABLE activity_logs (

    log_id SERIAL PRIMARY KEY,

    employee_id INT,

    action VARCHAR(255),

    module VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(employee_id)
    REFERENCES employees(employee_id)
);

-- ============================
-- INDEXES
-- ============================

CREATE INDEX idx_asset_tag
ON assets(asset_tag);

CREATE INDEX idx_employee_email
ON employees(email);

CREATE INDEX idx_booking_dates
ON bookings(booking_start, booking_end);

CREATE INDEX idx_asset_status
ON assets(status);

CREATE INDEX idx_notifications_employee
ON notifications(employee_id);

CREATE INDEX idx_allocations_asset
ON asset_allocations(asset_id);

CREATE INDEX idx_allocations_employee
ON asset_allocations(employee_id);
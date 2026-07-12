-- ============================
-- ROLES
-- ============================

INSERT INTO roles (role_name)
VALUES
('Admin'),
('Asset Manager'),
('Department Head'),
('Employee');

-- ============================
-- DEPARTMENTS
-- ============================

INSERT INTO departments (department_name)
VALUES
('Administration'),
('IT'),
('Human Resources'),
('Finance'),
('Operations');

-- ============================
-- ASSET CATEGORIES
-- ============================

INSERT INTO asset_categories (category_name, description)
VALUES
('Electronics','Laptops, PCs, Printers'),
('Furniture','Office Furniture'),
('Vehicles','Company Vehicles'),
('Meeting Rooms','Bookable Rooms'),
('Equipment','Projectors, Cameras');

-- ============================
-- DEFAULT ADMIN
-- Password: admin123
-- Replace hash later using bcrypt
-- ============================

INSERT INTO employees
(
first_name,
last_name,
email,
password_hash,
department_id,
role_id
)
VALUES
(
'System',
'Administrator',
'admin@assetflow.com',
'admin123',
1,
1
);
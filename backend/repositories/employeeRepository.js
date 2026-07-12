const pool = require("../config/db");

const createEmployee = async (firstName, lastName, email, passwordHash, departmentId, roleId, status = 'Active') => {
    const result = await pool.query(
        `INSERT INTO employees (first_name, last_name, email, password_hash, department_id, role_id, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING employee_id, first_name, last_name, email, status, created_at`,
        [firstName, lastName, email, passwordHash, departmentId, roleId, status]
    );
    return result.rows[0];
};

const getAllEmployees = async () => {
    const result = await pool.query(
        `SELECT e.employee_id, e.first_name, e.last_name, e.email, d.department_name, r.role_name, e.status, e.created_at 
         FROM employees e 
         LEFT JOIN departments d ON e.department_id = d.department_id 
         LEFT JOIN roles r ON e.role_id = r.role_id 
         ORDER BY e.employee_id ASC`
    );
    return result.rows;
};

const getEmployeeById = async (id) => {
    const result = await pool.query(
        `SELECT e.employee_id, e.first_name, e.last_name, e.email, d.department_name, r.role_name, e.status, e.created_at 
         FROM employees e 
         LEFT JOIN departments d ON e.department_id = d.department_id 
         LEFT JOIN roles r ON e.role_id = r.role_id 
         WHERE e.employee_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateEmployee = async (id, firstName, lastName, email, passwordHash, departmentId, roleId, status = 'Active') => {
    const result = await pool.query(
        `UPDATE employees 
         SET first_name = $1, last_name = $2, email = $3, password_hash = COALESCE($4, password_hash), department_id = $5, role_id = $6, status = $7 
         WHERE employee_id = $8 
         RETURNING employee_id, first_name, last_name, email, status, created_at`,
        [firstName, lastName, email, passwordHash, departmentId, roleId, status, id]
    );
    return result.rows[0];
};

const deleteEmployee = async (id) => {
    const result = await pool.query(
        `DELETE FROM employees 
         WHERE employee_id = $1 
         RETURNING employee_id, first_name, last_name, email, status, created_at`,
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};

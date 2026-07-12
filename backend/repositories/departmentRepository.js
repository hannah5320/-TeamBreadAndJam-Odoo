const pool = require("../config/db");

const createDepartment = async (departmentName, parentDepartmentId = null, status = 'Active') => {
    const result = await pool.query(
        "INSERT INTO departments (department_name, parent_department_id, status) VALUES ($1, $2, $3) RETURNING *",
        [departmentName, parentDepartmentId, status]
    );
    return result.rows[0];
};

const getAllDepartments = async () => {
    const result = await pool.query("SELECT * FROM departments ORDER BY department_id ASC");
    return result.rows;
};

const getDepartmentById = async (id) => {
    const result = await pool.query("SELECT * FROM departments WHERE department_id = $1", [id]);
    return result.rows[0];
};

const updateDepartment = async (id, departmentName, parentDepartmentId = null, status = 'Active') => {
    const result = await pool.query(
        "UPDATE departments SET department_name = $1, parent_department_id = $2, status = $3 WHERE department_id = $4 RETURNING *",
        [departmentName, parentDepartmentId, status, id]
    );
    return result.rows[0];
};

const deleteDepartment = async (id) => {
    const result = await pool.query("DELETE FROM departments WHERE department_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};

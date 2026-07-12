const pool = require("../config/db");

const createMaintenanceRequest = async (maintenanceData) => {
    const { asset_id, requested_by, issue_description, priority, request_status, technician_name } = maintenanceData;
    const result = await pool.query(
        `INSERT INTO maintenance_requests (asset_id, requested_by, issue_description, priority, request_status, technician_name)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [asset_id, requested_by, issue_description, priority || "Medium", request_status || "Pending", technician_name || null]
    );
    return result.rows[0];
};

const getAllMaintenanceRequests = async () => {
    const result = await pool.query(
        `SELECT mr.maintenance_id, mr.asset_id, mr.requested_by, mr.issue_description, mr.priority, mr.request_status, mr.technician_name, mr.created_at, mr.resolved_at,
                a.asset_tag, a.asset_name, e.first_name, e.last_name
         FROM maintenance_requests mr
         LEFT JOIN assets a ON mr.asset_id = a.asset_id
         LEFT JOIN employees e ON mr.requested_by = e.employee_id
         ORDER BY mr.maintenance_id ASC`
    );
    return result.rows;
};

const getMaintenanceRequestById = async (id) => {
    const result = await pool.query(
        `SELECT mr.maintenance_id, mr.asset_id, mr.requested_by, mr.issue_description, mr.priority, mr.request_status, mr.technician_name, mr.created_at, mr.resolved_at,
                a.asset_tag, a.asset_name, e.first_name, e.last_name
         FROM maintenance_requests mr
         LEFT JOIN assets a ON mr.asset_id = a.asset_id
         LEFT JOIN employees e ON mr.requested_by = e.employee_id
         WHERE mr.maintenance_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateMaintenanceRequest = async (id, maintenanceData) => {
    const { asset_id, requested_by, issue_description, priority, request_status, technician_name } = maintenanceData;
    const result = await pool.query(
        `UPDATE maintenance_requests
         SET asset_id = $1, requested_by = $2, issue_description = $3, priority = $4, request_status = $5, technician_name = $6
         WHERE maintenance_id = $7 RETURNING *`,
        [asset_id, requested_by, issue_description, priority || "Medium", request_status || "Pending", technician_name || null, id]
    );
    return result.rows[0];
};

const deleteMaintenanceRequest = async (id) => {
    const result = await pool.query("DELETE FROM maintenance_requests WHERE maintenance_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const getMaintenanceHistory = async () => {
    const result = await pool.query(
        `SELECT maintenance_id, asset_id, requested_by, issue_description, priority, request_status, technician_name, created_at, resolved_at
         FROM maintenance_requests
         ORDER BY created_at DESC`
    );
    return result.rows;
};

module.exports = {
    createMaintenanceRequest,
    getAllMaintenanceRequests,
    getMaintenanceRequestById,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
    getMaintenanceHistory
};

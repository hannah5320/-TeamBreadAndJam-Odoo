const pool = require("../config/db");

const createAudit = async (auditData) => {
    const { audit_name, department_id, start_date, end_date, created_by, status } = auditData;
    const result = await pool.query(
        `INSERT INTO audit_cycles (audit_name, department_id, start_date, end_date, created_by, status)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [audit_name, department_id || null, start_date || null, end_date || null, created_by, status || "Open"]
    );
    return result.rows[0];
};

const getAllAudits = async () => {
    const result = await pool.query(
        `SELECT ac.audit_cycle_id, ac.audit_name, ac.department_id, ac.start_date, ac.end_date, ac.created_by, ac.status,
                d.department_name, e.first_name, e.last_name
         FROM audit_cycles ac
         LEFT JOIN departments d ON ac.department_id = d.department_id
         LEFT JOIN employees e ON ac.created_by = e.employee_id
         ORDER BY ac.audit_cycle_id ASC`
    );
    return result.rows;
};

const getAuditById = async (id) => {
    const result = await pool.query(
        `SELECT ac.audit_cycle_id, ac.audit_name, ac.department_id, ac.start_date, ac.end_date, ac.created_by, ac.status,
                d.department_name, e.first_name, e.last_name
         FROM audit_cycles ac
         LEFT JOIN departments d ON ac.department_id = d.department_id
         LEFT JOIN employees e ON ac.created_by = e.employee_id
         WHERE ac.audit_cycle_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateAudit = async (id, auditData) => {
    const { audit_name, department_id, start_date, end_date, created_by, status } = auditData;
    const result = await pool.query(
        `UPDATE audit_cycles
         SET audit_name = $1, department_id = $2, start_date = $3, end_date = $4, created_by = $5, status = $6
         WHERE audit_cycle_id = $7 RETURNING *`,
        [audit_name, department_id || null, start_date || null, end_date || null, created_by, status || "Open", id]
    );
    return result.rows[0];
};

const deleteAudit = async (id) => {
    const result = await pool.query("DELETE FROM audit_cycles WHERE audit_cycle_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const createAuditRecord = async (auditRecordData) => {
    const { audit_cycle_id, asset_id, auditor_id, verification_status, remarks } = auditRecordData;
    const result = await pool.query(
        `INSERT INTO audit_records (audit_cycle_id, asset_id, auditor_id, verification_status, remarks)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [audit_cycle_id, asset_id, auditor_id, verification_status || "Pending", remarks || null]
    );
    return result.rows[0];
};

const closeAudit = async (id) => {
    const result = await pool.query(
        `UPDATE audit_cycles SET status = 'Closed' WHERE audit_cycle_id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createAudit,
    getAllAudits,
    getAuditById,
    updateAudit,
    deleteAudit,
    createAuditRecord,
    closeAudit
};

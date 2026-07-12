const pool = require("../config/db");

const createAllocation = async (allocationData) => {
    const { asset_id, employee_id, allocated_date, expected_return_date, actual_return_date, status, checkin_notes } = allocationData;
    const result = await pool.query(
        `INSERT INTO asset_allocations (asset_id, employee_id, allocated_date, expected_return_date, actual_return_date, status, checkin_notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [asset_id, employee_id, allocated_date || null, expected_return_date || null, actual_return_date || null, status || "Allocated", checkin_notes || null]
    );
    return result.rows[0];
};

const getAllAllocations = async () => {
    const result = await pool.query(
        `SELECT a.allocation_id, a.asset_id, a.employee_id, a.allocated_date, a.expected_return_date, a.actual_return_date, a.status, a.checkin_notes,
                ast.asset_tag, ast.asset_name, e.first_name, e.last_name
         FROM asset_allocations a
         LEFT JOIN assets ast ON a.asset_id = ast.asset_id
         LEFT JOIN employees e ON a.employee_id = e.employee_id
         ORDER BY a.allocation_id ASC`
    );
    return result.rows;
};

const getAllocationById = async (id) => {
    const result = await pool.query(
        `SELECT a.allocation_id, a.asset_id, a.employee_id, a.allocated_date, a.expected_return_date, a.actual_return_date, a.status, a.checkin_notes,
                ast.asset_tag, ast.asset_name, e.first_name, e.last_name
         FROM asset_allocations a
         LEFT JOIN assets ast ON a.asset_id = ast.asset_id
         LEFT JOIN employees e ON a.employee_id = e.employee_id
         WHERE a.allocation_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateAllocation = async (id, allocationData) => {
    const { asset_id, employee_id, allocated_date, expected_return_date, actual_return_date, status, checkin_notes } = allocationData;
    const result = await pool.query(
        `UPDATE asset_allocations
         SET asset_id = $1, employee_id = $2, allocated_date = $3, expected_return_date = $4, actual_return_date = $5, status = $6, checkin_notes = $7
         WHERE allocation_id = $8 RETURNING *`,
        [asset_id, employee_id, allocated_date || null, expected_return_date || null, actual_return_date || null, status || "Allocated", checkin_notes || null, id]
    );
    return result.rows[0];
};

const deleteAllocation = async (id) => {
    const result = await pool.query("DELETE FROM asset_allocations WHERE allocation_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const getActiveAllocationByAsset = async (assetId) => {
    const result = await pool.query(
        "SELECT * FROM asset_allocations WHERE asset_id = $1 AND status = 'Allocated' ORDER BY allocation_id DESC LIMIT 1",
        [assetId]
    );
    return result.rows[0];
};

const returnAsset = async (allocationId, actualReturnDate = null, checkinNotes = null) => {
    const result = await pool.query(
        `UPDATE asset_allocations
         SET actual_return_date = $1, status = 'Returned', checkin_notes = $2
         WHERE allocation_id = $3 RETURNING *`,
        [actualReturnDate, checkinNotes, allocationId]
    );
    return result.rows[0];
};

const createTransfer = async ({ asset_id, from_employee, to_employee }) => {
    const result = await pool.query(
        `INSERT INTO asset_transfers (asset_id, from_employee, to_employee, approval_status)
         VALUES ($1, $2, $3, 'Pending') RETURNING *`,
        [asset_id, from_employee, to_employee]
    );
    return result.rows[0];
};

const getAllocationHistory = async () => {
    const result = await pool.query(
        `SELECT at.transfer_id, at.asset_id, at.from_employee, at.to_employee, at.request_date, at.approval_status,
                ast.asset_tag, ast.asset_name, fe.first_name AS from_first_name, fe.last_name AS from_last_name,
                te.first_name AS to_first_name, te.last_name AS to_last_name
         FROM asset_transfers at
         LEFT JOIN assets ast ON at.asset_id = ast.asset_id
         LEFT JOIN employees fe ON at.from_employee = fe.employee_id
         LEFT JOIN employees te ON at.to_employee = te.employee_id
         ORDER BY at.transfer_id ASC`
    );
    return result.rows;
};

module.exports = {
    createAllocation,
    getAllAllocations,
    getAllocationById,
    updateAllocation,
    deleteAllocation,
    getActiveAllocationByAsset,
    returnAsset,
    createTransfer,
    getAllocationHistory
};

const pool = require("../config/db");

const createAsset = async (assetData) => {
    const {
        asset_tag,
        asset_name,
        serial_number,
        category_id,
        acquisition_date,
        acquisition_cost,
        asset_condition,
        current_location,
        is_shared,
        status
    } = assetData;

    const result = await pool.query(
        `INSERT INTO assets 
         (asset_tag, asset_name, serial_number, category_id, acquisition_date, acquisition_cost, asset_condition, current_location, is_shared, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
         RETURNING *`,
        [
            asset_tag,
            asset_name,
            serial_number || null,
            category_id,
            acquisition_date || null,
            acquisition_cost || null,
            asset_condition || null,
            current_location || null,
            is_shared !== undefined ? is_shared : false,
            status || 'Available'
        ]
    );
    return result.rows[0];
};

const getAllAssets = async () => {
    const result = await pool.query(
        `SELECT a.asset_id, a.asset_tag, a.asset_name, c.category_name, a.serial_number, a.asset_condition, a.current_location, a.status, a.created_at 
         FROM assets a 
         LEFT JOIN asset_categories c ON a.category_id = c.category_id 
         ORDER BY a.asset_id ASC`
    );
    return result.rows;
};

const getAssetById = async (id) => {
    const result = await pool.query(
        `SELECT a.asset_id, a.asset_tag, a.asset_name, c.category_name, a.serial_number, a.asset_condition, a.current_location, a.status, a.created_at 
         FROM assets a 
         LEFT JOIN asset_categories c ON a.category_id = c.category_id 
         WHERE a.asset_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateAsset = async (id, assetData) => {
    const {
        asset_tag,
        asset_name,
        serial_number,
        category_id,
        acquisition_date,
        acquisition_cost,
        asset_condition,
        current_location,
        is_shared,
        status
    } = assetData;

    const result = await pool.query(
        `UPDATE assets 
         SET asset_tag = $1, asset_name = $2, serial_number = $3, category_id = $4, acquisition_date = $5, acquisition_cost = $6, asset_condition = $7, current_location = $8, is_shared = $9, status = $10 
         WHERE asset_id = $11 
         RETURNING *`,
        [
            asset_tag,
            asset_name,
            serial_number || null,
            category_id,
            acquisition_date || null,
            acquisition_cost || null,
            asset_condition || null,
            current_location || null,
            is_shared !== undefined ? is_shared : false,
            status || 'Available',
            id
        ]
    );
    return result.rows[0];
};

const deleteAsset = async (id) => {
    const result = await pool.query("DELETE FROM assets WHERE asset_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset
};

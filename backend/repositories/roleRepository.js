const pool = require("../config/db");

const getRoleById = async (id) => {
    const result = await pool.query("SELECT * FROM roles WHERE role_id = $1", [id]);
    return result.rows[0];
};

module.exports = {
    getRoleById
};

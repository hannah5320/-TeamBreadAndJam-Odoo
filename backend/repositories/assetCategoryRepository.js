const pool = require("../config/db");

const createCategory = async (categoryName, description) => {
    const result = await pool.query(
        "INSERT INTO asset_categories (category_name, description) VALUES ($1, $2) RETURNING *",
        [categoryName, description]
    );
    return result.rows[0];
};

const getAllCategories = async () => {
    const result = await pool.query("SELECT * FROM asset_categories ORDER BY category_id ASC");
    return result.rows;
};

const getCategoryById = async (id) => {
    const result = await pool.query("SELECT * FROM asset_categories WHERE category_id = $1", [id]);
    return result.rows[0];
};

const updateCategory = async (id, categoryName, description) => {
    const result = await pool.query(
        "UPDATE asset_categories SET category_name = $1, description = $2 WHERE category_id = $3 RETURNING *",
        [categoryName, description, id]
    );
    return result.rows[0];
};

const deleteCategory = async (id) => {
    const result = await pool.query("DELETE FROM asset_categories WHERE category_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

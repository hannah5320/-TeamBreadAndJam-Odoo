const assetCategoryService = require("../services/assetCategoryService");

const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const newCategory = await assetCategoryService.createCategory({
            category_name,
            description
        });
        return res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Category name already exists"
            });
        }
        if (err.message.includes("required") || err.message.includes("not found")) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await assetCategoryService.getAllCategories();
        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await assetCategoryService.getCategoryById(id);
        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (err) {
        if (err.message === "Category not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description } = req.body;
        const updatedCategory = await assetCategoryService.updateCategory(id, {
            category_name,
            description
        });
        return res.status(200).json({
            success: true,
            data: updatedCategory
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Category name already exists"
            });
        }
        if (err.message === "Category not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.message.includes("required")) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await assetCategoryService.deleteCategory(id);
        return res.status(200).json({
            success: true,
            data: deletedCategory
        });
    } catch (err) {
        if (err.message === "Category not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Cannot delete category as it is referenced by other records"
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

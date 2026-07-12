const assetCategoryRepository = require("../repositories/assetCategoryRepository");

const createCategory = async (categoryData) => {
    const { category_name, description } = categoryData;

    if (!category_name || category_name.trim() === "") {
        throw new Error("Category name is required");
    }

    return await assetCategoryRepository.createCategory(
        category_name.trim(),
        description ? description.trim() : null
    );
};

const getAllCategories = async () => {
    return await assetCategoryRepository.getAllCategories();
};

const getCategoryById = async (id) => {
    if (!id) {
        throw new Error("Category ID is required");
    }
    const category = await assetCategoryRepository.getCategoryById(id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
};

const updateCategory = async (id, categoryData) => {
    const { category_name, description } = categoryData;

    if (!id) {
        throw new Error("Category ID is required");
    }

    if (!category_name || category_name.trim() === "") {
        throw new Error("Category name is required");
    }

    const existingCategory = await assetCategoryRepository.getCategoryById(id);
    if (!existingCategory) {
        throw new Error("Category not found");
    }

    return await assetCategoryRepository.updateCategory(
        id,
        category_name.trim(),
        description ? description.trim() : null
    );
};

const deleteCategory = async (id) => {
    if (!id) {
        throw new Error("Category ID is required");
    }
    const existingCategory = await assetCategoryRepository.getCategoryById(id);
    if (!existingCategory) {
        throw new Error("Category not found");
    }
    return await assetCategoryRepository.deleteCategory(id);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

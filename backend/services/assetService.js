const assetRepository = require("../repositories/assetRepository");
const assetCategoryRepository = require("../repositories/assetCategoryRepository");

const createAsset = async (assetData) => {
    const { asset_tag, asset_name, category_id } = assetData;

    if (!asset_tag || asset_tag.trim() === "") throw new Error("Asset tag is required");
    if (!asset_name || asset_name.trim() === "") throw new Error("Asset name is required");
    if (!category_id) throw new Error("Category ID is required");

    // Verify category exists
    const category = await assetCategoryRepository.getCategoryById(category_id);
    if (!category) {
        throw new Error("Category does not exist");
    }

    return await assetRepository.createAsset({
        ...assetData,
        asset_tag: asset_tag.trim(),
        asset_name: asset_name.trim()
    });
};

const getAllAssets = async () => {
    return await assetRepository.getAllAssets();
};

const getAssetById = async (id) => {
    if (!id) throw new Error("Asset ID is required");
    const asset = await assetRepository.getAssetById(id);
    if (!asset) {
        throw new Error("Asset not found");
    }
    return asset;
};

const updateAsset = async (id, assetData) => {
    const { asset_tag, asset_name, category_id } = assetData;

    if (!id) throw new Error("Asset ID is required");
    if (!asset_tag || asset_tag.trim() === "") throw new Error("Asset tag is required");
    if (!asset_name || asset_name.trim() === "") throw new Error("Asset name is required");
    if (!category_id) throw new Error("Category ID is required");

    // Verify asset exists
    const existingAsset = await assetRepository.getAssetById(id);
    if (!existingAsset) {
        throw new Error("Asset not found");
    }

    // Verify category exists
    const category = await assetCategoryRepository.getCategoryById(category_id);
    if (!category) {
        throw new Error("Category does not exist");
    }

    return await assetRepository.updateAsset(id, {
        ...assetData,
        asset_tag: asset_tag.trim(),
        asset_name: asset_name.trim()
    });
};

const deleteAsset = async (id) => {
    if (!id) throw new Error("Asset ID is required");
    const existingAsset = await assetRepository.getAssetById(id);
    if (!existingAsset) {
        throw new Error("Asset not found");
    }
    return await assetRepository.deleteAsset(id);
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset
};

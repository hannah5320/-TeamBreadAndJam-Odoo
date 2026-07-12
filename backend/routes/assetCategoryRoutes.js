const express = require("express");
const router = express.Router();
const assetCategoryController = require("../controllers/assetCategoryController");

router.get("/", assetCategoryController.getAllCategories);
router.get("/:id", assetCategoryController.getCategoryById);
router.post("/", assetCategoryController.createCategory);
router.put("/:id", assetCategoryController.updateCategory);
router.delete("/:id", assetCategoryController.deleteCategory);

module.exports = router;

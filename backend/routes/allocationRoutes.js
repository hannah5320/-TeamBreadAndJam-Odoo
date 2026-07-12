const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocationController");

router.get("/", allocationController.getAllAllocations);
router.get("/history", allocationController.getAllocationHistory);
router.get("/:id", allocationController.getAllocationById);
router.post("/", allocationController.createAllocation);
router.post("/allocate", allocationController.allocateAsset);
router.post("/return", allocationController.returnAsset);
router.post("/transfer", allocationController.transferAsset);
router.put("/:id", allocationController.updateAllocation);
router.delete("/:id", allocationController.deleteAllocation);

module.exports = router;

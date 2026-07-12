const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/", maintenanceController.getAllMaintenanceRequests);
router.get("/history", maintenanceController.getMaintenanceHistory);
router.get("/:id", maintenanceController.getMaintenanceRequestById);
router.post("/", maintenanceController.createMaintenanceRequest);
router.put("/:id", maintenanceController.updateMaintenanceRequest);
router.delete("/:id", maintenanceController.deleteMaintenanceRequest);

module.exports = router;

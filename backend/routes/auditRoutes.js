const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");

router.get("/", auditController.getAllAudits);
router.get("/:id", auditController.getAuditById);
router.post("/", auditController.createAudit);
router.post("/verify", auditController.verifyAudit);
router.put("/:id", auditController.updateAudit);
router.put("/:id/close", auditController.closeAudit);
router.delete("/:id", auditController.deleteAudit);

module.exports = router;

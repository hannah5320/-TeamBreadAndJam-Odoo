const auditService = require("../services/auditService");

const createAudit = async (req, res) => {
    try {
        const newAudit = await auditService.createAudit(req.body);
        return res.status(201).json({
            success: true,
            data: newAudit
        });
    } catch (err) {
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found")) {
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

const getAllAudits = async (req, res) => {
    try {
        const audits = await auditService.getAllAudits();
        return res.status(200).json({
            success: true,
            data: audits
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAuditById = async (req, res) => {
    try {
        const { id } = req.params;
        const audit = await auditService.getAuditById(id);
        return res.status(200).json({
            success: true,
            data: audit
        });
    } catch (err) {
        if (err.message === "Audit not found") {
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

const updateAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAudit = await auditService.updateAudit(id, req.body);
        return res.status(200).json({
            success: true,
            data: updatedAudit
        });
    } catch (err) {
        if (err.message === "Audit not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found")) {
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

const deleteAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAudit = await auditService.deleteAudit(id);
        return res.status(200).json({
            success: true,
            data: deletedAudit
        });
    } catch (err) {
        if (err.message === "Audit not found") {
            return res.status(404).json({
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

const verifyAudit = async (req, res) => {
    try {
        const record = await auditService.verifyAudit(req.body);
        return res.status(201).json({
            success: true,
            data: record
        });
    } catch (err) {
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found")) {
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

const closeAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const audit = await auditService.closeAudit(id);
        return res.status(200).json({
            success: true,
            data: audit
        });
    } catch (err) {
        if (err.message === "Audit not found") {
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

module.exports = {
    createAudit,
    getAllAudits,
    getAuditById,
    updateAudit,
    deleteAudit,
    verifyAudit,
    closeAudit
};

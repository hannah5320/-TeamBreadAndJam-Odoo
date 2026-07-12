const maintenanceService = require("../services/maintenanceService");

const createMaintenanceRequest = async (req, res) => {
    try {
        const newRequest = await maintenanceService.createMaintenanceRequest(req.body);
        return res.status(201).json({
            success: true,
            data: newRequest
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

const getAllMaintenanceRequests = async (req, res) => {
    try {
        const requests = await maintenanceService.getAllMaintenanceRequests();
        return res.status(200).json({
            success: true,
            data: requests
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getMaintenanceRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await maintenanceService.getMaintenanceRequestById(id);
        return res.status(200).json({
            success: true,
            data: request
        });
    } catch (err) {
        if (err.message === "Maintenance request not found") {
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

const updateMaintenanceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await maintenanceService.updateMaintenanceRequest(id, req.body);
        return res.status(200).json({
            success: true,
            data: updatedRequest
        });
    } catch (err) {
        if (err.message === "Maintenance request not found") {
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

const deleteMaintenanceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await maintenanceService.deleteMaintenanceRequest(id);
        return res.status(200).json({
            success: true,
            data: deletedRequest
        });
    } catch (err) {
        if (err.message === "Maintenance request not found") {
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

const getMaintenanceHistory = async (req, res) => {
    try {
        const requests = await maintenanceService.getMaintenanceHistory();
        return res.status(200).json({
            success: true,
            data: requests
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createMaintenanceRequest,
    getAllMaintenanceRequests,
    getMaintenanceRequestById,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
    getMaintenanceHistory
};

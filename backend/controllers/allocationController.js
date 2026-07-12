const allocationService = require("../services/allocationService");

const createAllocation = async (req, res) => {
    try {
        const newAllocation = await allocationService.createAllocation(req.body);
        return res.status(201).json({
            success: true,
            data: newAllocation
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Allocation already exists"
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

const getAllAllocations = async (req, res) => {
    try {
        const allocations = await allocationService.getAllAllocations();
        return res.status(200).json({
            success: true,
            data: allocations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const allocation = await allocationService.getAllocationById(id);
        return res.status(200).json({
            success: true,
            data: allocation
        });
    } catch (err) {
        if (err.message === "Allocation not found") {
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

const updateAllocation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAllocation = await allocationService.updateAllocation(id, req.body);
        return res.status(200).json({
            success: true,
            data: updatedAllocation
        });
    } catch (err) {
        if (err.message === "Allocation not found") {
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

const deleteAllocation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAllocation = await allocationService.deleteAllocation(id);
        return res.status(200).json({
            success: true,
            data: deletedAllocation
        });
    } catch (err) {
        if (err.message === "Allocation not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Cannot delete allocation as it is referenced by other records"
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const allocateAsset = async (req, res) => {
    try {
        const allocation = await allocationService.allocateAsset(req.body);
        return res.status(201).json({
            success: true,
            data: allocation
        });
    } catch (err) {
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found") || err.message.includes("already allocated")) {
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

const returnAsset = async (req, res) => {
    try {
        const allocation = await allocationService.returnAsset(req.body);
        return res.status(200).json({
            success: true,
            data: allocation
        });
    } catch (err) {
        if (err.message.includes("required") || err.message.includes("not found") || err.message.includes("not currently allocated")) {
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

const transferAsset = async (req, res) => {
    try {
        const transfer = await allocationService.transferAsset(req.body);
        return res.status(201).json({
            success: true,
            data: transfer
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

const getAllocationHistory = async (req, res) => {
    try {
        const allocations = await allocationService.getAllocationHistory();
        return res.status(200).json({
            success: true,
            data: allocations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createAllocation,
    getAllAllocations,
    getAllocationById,
    updateAllocation,
    deleteAllocation,
    allocateAsset,
    returnAsset,
    transferAsset,
    getAllocationHistory
};

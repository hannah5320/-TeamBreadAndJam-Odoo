const departmentService = require("../services/departmentService");

const createDepartment = async (req, res) => {
    try {
        const { department_name, parent_department_id, status } = req.body;
        const newDept = await departmentService.createDepartment({
            department_name,
            parent_department_id,
            status
        });
        return res.status(201).json({
            success: true,
            data: newDept
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Department name already exists"
            });
        }
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("parent") || err.message.includes("not found")) {
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

const getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments();
        return res.status(200).json({
            success: true,
            data: departments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentService.getDepartmentById(id);
        return res.status(200).json({
            success: true,
            data: department
        });
    } catch (err) {
        if (err.message === "Department not found") {
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

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { department_name, parent_department_id, status } = req.body;
        const updatedDept = await departmentService.updateDepartment(id, {
            department_name,
            parent_department_id,
            status
        });
        return res.status(200).json({
            success: true,
            data: updatedDept
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Department name already exists"
            });
        }
        if (err.message === "Department not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("parent") || err.message.includes("not found")) {
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

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDept = await departmentService.deleteDepartment(id);
        return res.status(200).json({
            success: true,
            data: deletedDept
        });
    } catch (err) {
        if (err.message === "Department not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Cannot delete department as it is referenced by other records"
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};

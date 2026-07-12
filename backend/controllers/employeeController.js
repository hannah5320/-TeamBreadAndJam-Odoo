const employeeService = require("../services/employeeService");

const createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email, password, department_id, role_id, status } = req.body;
        const newEmployee = await employeeService.createEmployee({
            first_name,
            last_name,
            email,
            password,
            department_id,
            role_id,
            status
        });
        return res.status(201).json({
            success: true,
            data: newEmployee
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
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

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        return res.status(200).json({
            success: true,
            data: employees
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getEmployeeById(id);
        return res.status(200).json({
            success: true,
            data: employee
        });
    } catch (err) {
        if (err.message === "Employee not found") {
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

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, department_id, role_id, status } = req.body;
        const updatedEmployee = await employeeService.updateEmployee(id, {
            first_name,
            last_name,
            email,
            password,
            department_id,
            role_id,
            status
        });
        return res.status(200).json({
            success: true,
            data: updatedEmployee
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        if (err.message === "Employee not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.message.includes("required") || err.message.includes("exist")) {
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

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await employeeService.deleteEmployee(id);
        return res.status(200).json({
            success: true,
            data: deletedEmployee
        });
    } catch (err) {
        if (err.message === "Employee not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Cannot delete employee as they are referenced by other records"
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};

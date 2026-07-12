const departmentRepository = require("../repositories/departmentRepository");

const createDepartment = async (departmentData) => {
    const { department_name, parent_department_id, status } = departmentData;

    if (!department_name || department_name.trim() === "") {
        throw new Error("Department name is required");
    }

    if (parent_department_id) {
        const parentDept = await departmentRepository.getDepartmentById(parent_department_id);
        if (!parentDept) {
            throw new Error("Parent department does not exist");
        }
    }

    return await departmentRepository.createDepartment(
        department_name.trim(),
        parent_department_id || null,
        status || 'Active'
    );
};

const getAllDepartments = async () => {
    return await departmentRepository.getAllDepartments();
};

const getDepartmentById = async (id) => {
    if (!id) {
        throw new Error("Department ID is required");
    }
    const department = await departmentRepository.getDepartmentById(id);
    if (!department) {
        throw new Error("Department not found");
    }
    return department;
};

const updateDepartment = async (id, departmentData) => {
    const { department_name, parent_department_id, status } = departmentData;

    if (!id) {
        throw new Error("Department ID is required");
    }

    if (!department_name || department_name.trim() === "") {
        throw new Error("Department name is required");
    }

    if (parent_department_id) {
        if (Number(parent_department_id) === Number(id)) {
            throw new Error("A department cannot be its own parent");
        }
        const parentDept = await departmentRepository.getDepartmentById(parent_department_id);
        if (!parentDept) {
            throw new Error("Parent department does not exist");
        }
    }

    const existingDept = await departmentRepository.getDepartmentById(id);
    if (!existingDept) {
        throw new Error("Department not found");
    }

    return await departmentRepository.updateDepartment(
        id,
        department_name.trim(),
        parent_department_id || null,
        status || 'Active'
    );
};

const deleteDepartment = async (id) => {
    if (!id) {
        throw new Error("Department ID is required");
    }
    const existingDept = await departmentRepository.getDepartmentById(id);
    if (!existingDept) {
        throw new Error("Department not found");
    }
    return await departmentRepository.deleteDepartment(id);
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};

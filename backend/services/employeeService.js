const bcrypt = require("bcrypt");
const employeeRepository = require("../repositories/employeeRepository");
const departmentRepository = require("../repositories/departmentRepository");
const roleRepository = require("../repositories/roleRepository");

const createEmployee = async (employeeData) => {
    const { first_name, last_name, email, password, department_id, role_id, status } = employeeData;

    if (!first_name || first_name.trim() === "") throw new Error("First name is required");
    if (!last_name || last_name.trim() === "") throw new Error("Last name is required");
    if (!email || email.trim() === "") throw new Error("Email is required");
    if (!password || password.trim() === "") throw new Error("Password is required");
    if (!department_id) throw new Error("Department ID is required");
    if (!role_id) throw new Error("Role ID is required");

    // Verify department exists
    const department = await departmentRepository.getDepartmentById(department_id);
    if (!department) {
        throw new Error("Department does not exist");
    }

    // Verify role exists
    const role = await roleRepository.getRoleById(role_id);
    if (!role) {
        throw new Error("Role does not exist");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await employeeRepository.createEmployee(
        first_name.trim(),
        last_name.trim(),
        email.trim(),
        passwordHash,
        department_id,
        role_id,
        status || 'Active'
    );
};

const getAllEmployees = async () => {
    return await employeeRepository.getAllEmployees();
};

const getEmployeeById = async (id) => {
    if (!id) throw new Error("Employee ID is required");
    const employee = await employeeRepository.getEmployeeById(id);
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
};

const updateEmployee = async (id, employeeData) => {
    const { first_name, last_name, email, password, department_id, role_id, status } = employeeData;

    if (!id) throw new Error("Employee ID is required");
    if (!first_name || first_name.trim() === "") throw new Error("First name is required");
    if (!last_name || last_name.trim() === "") throw new Error("Last name is required");
    if (!email || email.trim() === "") throw new Error("Email is required");
    if (!department_id) throw new Error("Department ID is required");
    if (!role_id) throw new Error("Role ID is required");

    // Verify employee exists
    const existingEmployee = await employeeRepository.getEmployeeById(id);
    if (!existingEmployee) {
        throw new Error("Employee not found");
    }

    // Verify department exists
    const department = await departmentRepository.getDepartmentById(department_id);
    if (!department) {
        throw new Error("Department does not exist");
    }

    // Verify role exists
    const role = await roleRepository.getRoleById(role_id);
    if (!role) {
        throw new Error("Role does not exist");
    }

    let passwordHash = null;
    if (password && password.trim() !== "") {
        passwordHash = await bcrypt.hash(password, 10);
    }

    return await employeeRepository.updateEmployee(
        id,
        first_name.trim(),
        last_name.trim(),
        email.trim(),
        passwordHash,
        department_id,
        role_id,
        status || 'Active'
    );
};

const deleteEmployee = async (id) => {
    if (!id) throw new Error("Employee ID is required");
    const existingEmployee = await employeeRepository.getEmployeeById(id);
    if (!existingEmployee) {
        throw new Error("Employee not found");
    }
    return await employeeRepository.deleteEmployee(id);
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};

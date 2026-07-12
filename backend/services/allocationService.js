const allocationRepository = require("../repositories/allocationRepository");
const assetRepository = require("../repositories/assetRepository");
const employeeRepository = require("../repositories/employeeRepository");

const createAllocation = async (allocationData) => {
    const { asset_id, employee_id, allocated_date, expected_return_date, actual_return_date, status, checkin_notes } = allocationData;

    if (!asset_id) throw new Error("Asset ID is required");
    if (!employee_id) throw new Error("Employee ID is required");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    return await allocationRepository.createAllocation({
        asset_id,
        employee_id,
        allocated_date: allocated_date || null,
        expected_return_date: expected_return_date || null,
        actual_return_date: actual_return_date || null,
        status: status || "Allocated",
        checkin_notes: checkin_notes || null
    });
};

const getAllAllocations = async () => {
    return await allocationRepository.getAllAllocations();
};

const getAllocationById = async (id) => {
    if (!id) throw new Error("Allocation ID is required");
    const allocation = await allocationRepository.getAllocationById(id);
    if (!allocation) throw new Error("Allocation not found");
    return allocation;
};

const updateAllocation = async (id, allocationData) => {
    const { asset_id, employee_id } = allocationData;

    if (!id) throw new Error("Allocation ID is required");
    if (!asset_id) throw new Error("Asset ID is required");
    if (!employee_id) throw new Error("Employee ID is required");

    const existingAllocation = await allocationRepository.getAllocationById(id);
    if (!existingAllocation) throw new Error("Allocation not found");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    return await allocationRepository.updateAllocation(id, allocationData);
};

const deleteAllocation = async (id) => {
    if (!id) throw new Error("Allocation ID is required");
    const existingAllocation = await allocationRepository.getAllocationById(id);
    if (!existingAllocation) throw new Error("Allocation not found");
    return await allocationRepository.deleteAllocation(id);
};

const allocateAsset = async (allocationData) => {
    const { asset_id, employee_id } = allocationData;

    if (!asset_id) throw new Error("Asset ID is required");
    if (!employee_id) throw new Error("Employee ID is required");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    const activeAllocation = await allocationRepository.getActiveAllocationByAsset(asset_id);
    if (activeAllocation) throw new Error("Asset is already allocated");

    return await allocationRepository.createAllocation({
        asset_id,
        employee_id,
        allocated_date: allocationData.allocated_date || null,
        expected_return_date: allocationData.expected_return_date || null,
        actual_return_date: null,
        status: "Allocated",
        checkin_notes: null
    });
};

const returnAsset = async (allocationData) => {
    const { allocation_id, actual_return_date, checkin_notes } = allocationData;

    if (!allocation_id) throw new Error("Allocation ID is required");

    const allocation = await allocationRepository.getAllocationById(allocation_id);
    if (!allocation) throw new Error("Allocation not found");
    if (allocation.status === "Returned") throw new Error("Asset is not currently allocated");

    return await allocationRepository.returnAsset(allocation_id, actual_return_date || null, checkin_notes || null);
};

const transferAsset = async (transferData) => {
    const { asset_id, from_employee, to_employee } = transferData;

    if (!asset_id) throw new Error("Asset ID is required");
    if (!from_employee) throw new Error("Source employee is required");
    if (!to_employee) throw new Error("Target employee is required");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const fromEmployee = await employeeRepository.getEmployeeById(from_employee);
    if (!fromEmployee) throw new Error("Source employee does not exist");

    const toEmployee = await employeeRepository.getEmployeeById(to_employee);
    if (!toEmployee) throw new Error("Target employee does not exist");

    return await allocationRepository.createTransfer({ asset_id, from_employee, to_employee });
};

const getAllocationHistory = async () => {
    return await allocationRepository.getAllocationHistory();
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

const maintenanceRepository = require("../repositories/maintenanceRepository");
const assetRepository = require("../repositories/assetRepository");
const employeeRepository = require("../repositories/employeeRepository");

const createMaintenanceRequest = async (maintenanceData) => {
    const { asset_id, requested_by, issue_description, priority, request_status, technician_name } = maintenanceData;

    if (!asset_id) throw new Error("Asset ID is required");
    if (!requested_by) throw new Error("Requested by is required");
    if (!issue_description || issue_description.trim() === "") throw new Error("Issue description is required");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(requested_by);
    if (!employee) throw new Error("Employee does not exist");

    return await maintenanceRepository.createMaintenanceRequest({
        asset_id,
        requested_by,
        issue_description: issue_description.trim(),
        priority: priority || "Medium",
        request_status: request_status || "Pending",
        technician_name: technician_name || null
    });
};

const getAllMaintenanceRequests = async () => {
    return await maintenanceRepository.getAllMaintenanceRequests();
};

const getMaintenanceRequestById = async (id) => {
    if (!id) throw new Error("Maintenance request ID is required");
    const request = await maintenanceRepository.getMaintenanceRequestById(id);
    if (!request) throw new Error("Maintenance request not found");
    return request;
};

const updateMaintenanceRequest = async (id, maintenanceData) => {
    const { asset_id, requested_by, issue_description } = maintenanceData;

    if (!id) throw new Error("Maintenance request ID is required");
    if (!asset_id) throw new Error("Asset ID is required");
    if (!requested_by) throw new Error("Requested by is required");
    if (!issue_description || issue_description.trim() === "") throw new Error("Issue description is required");

    const existingRequest = await maintenanceRepository.getMaintenanceRequestById(id);
    if (!existingRequest) throw new Error("Maintenance request not found");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(requested_by);
    if (!employee) throw new Error("Employee does not exist");

    return await maintenanceRepository.updateMaintenanceRequest(id, maintenanceData);
};

const deleteMaintenanceRequest = async (id) => {
    if (!id) throw new Error("Maintenance request ID is required");
    const existingRequest = await maintenanceRepository.getMaintenanceRequestById(id);
    if (!existingRequest) throw new Error("Maintenance request not found");
    return await maintenanceRepository.deleteMaintenanceRequest(id);
};

const getMaintenanceHistory = async () => {
    return await maintenanceRepository.getMaintenanceHistory();
};

module.exports = {
    createMaintenanceRequest,
    getAllMaintenanceRequests,
    getMaintenanceRequestById,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
    getMaintenanceHistory
};

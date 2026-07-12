const auditRepository = require("../repositories/auditRepository");
const departmentRepository = require("../repositories/departmentRepository");
const employeeRepository = require("../repositories/employeeRepository");
const assetRepository = require("../repositories/assetRepository");

const createAudit = async (auditData) => {
    const { audit_name, department_id, start_date, end_date, created_by, status } = auditData;

    if (!audit_name || audit_name.trim() === "") throw new Error("Audit name is required");
    if (!created_by) throw new Error("Created by is required");

    if (department_id) {
        const department = await departmentRepository.getDepartmentById(department_id);
        if (!department) throw new Error("Department does not exist");
    }

    const creator = await employeeRepository.getEmployeeById(created_by);
    if (!creator) throw new Error("Employee does not exist");

    return await auditRepository.createAudit({
        audit_name: audit_name.trim(),
        department_id: department_id || null,
        start_date: start_date || null,
        end_date: end_date || null,
        created_by,
        status: status || "Open"
    });
};

const getAllAudits = async () => {
    return await auditRepository.getAllAudits();
};

const getAuditById = async (id) => {
    if (!id) throw new Error("Audit ID is required");
    const audit = await auditRepository.getAuditById(id);
    if (!audit) throw new Error("Audit not found");
    return audit;
};

const updateAudit = async (id, auditData) => {
    const { audit_name, department_id, created_by } = auditData;

    if (!id) throw new Error("Audit ID is required");
    if (!audit_name || audit_name.trim() === "") throw new Error("Audit name is required");
    if (!created_by) throw new Error("Created by is required");

    const existingAudit = await auditRepository.getAuditById(id);
    if (!existingAudit) throw new Error("Audit not found");

    if (department_id) {
        const department = await departmentRepository.getDepartmentById(department_id);
        if (!department) throw new Error("Department does not exist");
    }

    const creator = await employeeRepository.getEmployeeById(created_by);
    if (!creator) throw new Error("Employee does not exist");

    return await auditRepository.updateAudit(id, auditData);
};

const deleteAudit = async (id) => {
    if (!id) throw new Error("Audit ID is required");
    const existingAudit = await auditRepository.getAuditById(id);
    if (!existingAudit) throw new Error("Audit not found");
    return await auditRepository.deleteAudit(id);
};

const verifyAudit = async (auditRecordData) => {
    const { audit_cycle_id, asset_id, auditor_id, verification_status, remarks } = auditRecordData;

    if (!audit_cycle_id) throw new Error("Audit cycle ID is required");
    if (!asset_id) throw new Error("Asset ID is required");
    if (!auditor_id) throw new Error("Auditor ID is required");

    const audit = await auditRepository.getAuditById(audit_cycle_id);
    if (!audit) throw new Error("Audit does not exist");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const auditor = await employeeRepository.getEmployeeById(auditor_id);
    if (!auditor) throw new Error("Employee does not exist");

    return await auditRepository.createAuditRecord({
        audit_cycle_id,
        asset_id,
        auditor_id,
        verification_status: verification_status || "Pending",
        remarks: remarks || null
    });
};

const closeAudit = async (id) => {
    if (!id) throw new Error("Audit ID is required");
    const existingAudit = await auditRepository.getAuditById(id);
    if (!existingAudit) throw new Error("Audit not found");
    return await auditRepository.closeAudit(id);
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

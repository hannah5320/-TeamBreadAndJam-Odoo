const notificationRepository = require("../repositories/notificationRepository");
const employeeRepository = require("../repositories/employeeRepository");

const createNotification = async (notificationData) => {
    const { employee_id, title, message, is_read } = notificationData;

    if (!employee_id) throw new Error("Employee ID is required");
    if (!title || title.trim() === "") throw new Error("Title is required");
    if (!message || message.trim() === "") throw new Error("Message is required");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    return await notificationRepository.createNotification({
        employee_id,
        title: title.trim(),
        message: message.trim(),
        is_read: is_read !== undefined ? is_read : false
    });
};

const getAllNotifications = async () => {
    return await notificationRepository.getAllNotifications();
};

const getNotificationById = async (id) => {
    if (!id) throw new Error("Notification ID is required");
    const notification = await notificationRepository.getNotificationById(id);
    if (!notification) throw new Error("Notification not found");
    return notification;
};

const markAsRead = async (id) => {
    if (!id) throw new Error("Notification ID is required");
    const existingNotification = await notificationRepository.getNotificationById(id);
    if (!existingNotification) throw new Error("Notification not found");
    return await notificationRepository.markAsRead(id);
};

const deleteNotification = async (id) => {
    if (!id) throw new Error("Notification ID is required");
    const existingNotification = await notificationRepository.getNotificationById(id);
    if (!existingNotification) throw new Error("Notification not found");
    return await notificationRepository.deleteNotification(id);
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    markAsRead,
    deleteNotification
};

const notificationService = require("../services/notificationService");

const createNotification = async (req, res) => {
    try {
        const newNotification = await notificationService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: newNotification
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

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationService.getNotificationById(id);
        return res.status(200).json({
            success: true,
            data: notification
        });
    } catch (err) {
        if (err.message === "Notification not found") {
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

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationService.markAsRead(id);
        return res.status(200).json({
            success: true,
            data: notification
        });
    } catch (err) {
        if (err.message === "Notification not found") {
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

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotification = await notificationService.deleteNotification(id);
        return res.status(200).json({
            success: true,
            data: deletedNotification
        });
    } catch (err) {
        if (err.message === "Notification not found") {
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

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    markAsRead,
    deleteNotification
};

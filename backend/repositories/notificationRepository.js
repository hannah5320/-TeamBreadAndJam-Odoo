const pool = require("../config/db");

const createNotification = async (notificationData) => {
    const { employee_id, title, message, is_read } = notificationData;
    const result = await pool.query(
        `INSERT INTO notifications (employee_id, title, message, is_read)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [employee_id, title, message, is_read !== undefined ? is_read : false]
    );
    return result.rows[0];
};

const getAllNotifications = async () => {
    const result = await pool.query(
        `SELECT n.notification_id, n.employee_id, n.title, n.message, n.is_read, n.created_at, e.first_name, e.last_name
         FROM notifications n
         LEFT JOIN employees e ON n.employee_id = e.employee_id
         ORDER BY n.notification_id ASC`
    );
    return result.rows;
};

const getNotificationById = async (id) => {
    const result = await pool.query(
        `SELECT n.notification_id, n.employee_id, n.title, n.message, n.is_read, n.created_at, e.first_name, e.last_name
         FROM notifications n
         LEFT JOIN employees e ON n.employee_id = e.employee_id
         WHERE n.notification_id = $1`,
        [id]
    );
    return result.rows[0];
};

const markAsRead = async (id) => {
    const result = await pool.query(
        `UPDATE notifications SET is_read = TRUE WHERE notification_id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

const deleteNotification = async (id) => {
    const result = await pool.query("DELETE FROM notifications WHERE notification_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    markAsRead,
    deleteNotification
};

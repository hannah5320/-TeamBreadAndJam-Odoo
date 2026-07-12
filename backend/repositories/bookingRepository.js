const pool = require("../config/db");

const createBooking = async (bookingData) => {
    const { asset_id, employee_id, booking_start, booking_end, booking_status } = bookingData;
    const result = await pool.query(
        `INSERT INTO bookings (asset_id, employee_id, booking_start, booking_end, booking_status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [asset_id, employee_id, booking_start, booking_end, booking_status || "Upcoming"]
    );
    return result.rows[0];
};

const getAllBookings = async () => {
    const result = await pool.query(
        `SELECT b.booking_id, b.asset_id, b.employee_id, b.booking_start, b.booking_end, b.booking_status, b.created_at,
                a.asset_tag, a.asset_name, e.first_name, e.last_name
         FROM bookings b
         LEFT JOIN assets a ON b.asset_id = a.asset_id
         LEFT JOIN employees e ON b.employee_id = e.employee_id
         ORDER BY b.booking_id ASC`
    );
    return result.rows;
};

const getBookingById = async (id) => {
    const result = await pool.query(
        `SELECT b.booking_id, b.asset_id, b.employee_id, b.booking_start, b.booking_end, b.booking_status, b.created_at,
                a.asset_tag, a.asset_name, e.first_name, e.last_name
         FROM bookings b
         LEFT JOIN assets a ON b.asset_id = a.asset_id
         LEFT JOIN employees e ON b.employee_id = e.employee_id
         WHERE b.booking_id = $1`,
        [id]
    );
    return result.rows[0];
};

const updateBooking = async (id, bookingData) => {
    const { asset_id, employee_id, booking_start, booking_end, booking_status } = bookingData;
    const result = await pool.query(
        `UPDATE bookings
         SET asset_id = $1, employee_id = $2, booking_start = $3, booking_end = $4, booking_status = $5
         WHERE booking_id = $6 RETURNING *`,
        [asset_id, employee_id, booking_start, booking_end, booking_status || "Upcoming", id]
    );
    return result.rows[0];
};

const deleteBooking = async (id) => {
    const result = await pool.query("DELETE FROM bookings WHERE booking_id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const getCalendarBookings = async () => {
    const result = await pool.query(
        `SELECT booking_id, asset_id, employee_id, booking_start, booking_end, booking_status
         FROM bookings
         ORDER BY booking_start ASC`
    );
    return result.rows;
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getCalendarBookings
};

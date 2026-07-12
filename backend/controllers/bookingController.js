const bookingService = require("../services/bookingService");

const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingService.createBooking(req.body);
        return res.status(201).json({
            success: true,
            data: newBooking
        });
    } catch (err) {
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found") || err.message.includes("between")) {
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

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingService.getBookingById(id);
        return res.status(200).json({
            success: true,
            data: booking
        });
    } catch (err) {
        if (err.message === "Booking not found") {
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

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await bookingService.updateBooking(id, req.body);
        return res.status(200).json({
            success: true,
            data: updatedBooking
        });
    } catch (err) {
        if (err.message === "Booking not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        if (err.message.includes("required") || err.message.includes("exist") || err.message.includes("not found") || err.message.includes("between")) {
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

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await bookingService.deleteBooking(id);
        return res.status(200).json({
            success: true,
            data: deletedBooking
        });
    } catch (err) {
        if (err.message === "Booking not found") {
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

const getCalendarBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getCalendarBookings();
        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getCalendarBookings
};

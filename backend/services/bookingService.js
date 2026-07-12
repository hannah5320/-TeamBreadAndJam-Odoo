const bookingRepository = require("../repositories/bookingRepository");
const assetRepository = require("../repositories/assetRepository");
const employeeRepository = require("../repositories/employeeRepository");

const createBooking = async (bookingData) => {
    const { asset_id, employee_id, booking_start, booking_end, booking_status } = bookingData;

    if (!asset_id) throw new Error("Asset ID is required");
    if (!employee_id) throw new Error("Employee ID is required");
    if (!booking_start) throw new Error("Booking start is required");
    if (!booking_end) throw new Error("Booking end is required");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    if (new Date(booking_end) <= new Date(booking_start)) {
        throw new Error("Booking end must be after booking start");
    }

    return await bookingRepository.createBooking({
        asset_id,
        employee_id,
        booking_start,
        booking_end,
        booking_status: booking_status || "Upcoming"
    });
};

const getAllBookings = async () => {
    return await bookingRepository.getAllBookings();
};

const getBookingById = async (id) => {
    if (!id) throw new Error("Booking ID is required");
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) throw new Error("Booking not found");
    return booking;
};

const updateBooking = async (id, bookingData) => {
    const { asset_id, employee_id, booking_start, booking_end } = bookingData;

    if (!id) throw new Error("Booking ID is required");
    if (!asset_id) throw new Error("Asset ID is required");
    if (!employee_id) throw new Error("Employee ID is required");
    if (!booking_start) throw new Error("Booking start is required");
    if (!booking_end) throw new Error("Booking end is required");

    const existingBooking = await bookingRepository.getBookingById(id);
    if (!existingBooking) throw new Error("Booking not found");

    const asset = await assetRepository.getAssetById(asset_id);
    if (!asset) throw new Error("Asset does not exist");

    const employee = await employeeRepository.getEmployeeById(employee_id);
    if (!employee) throw new Error("Employee does not exist");

    if (new Date(booking_end) <= new Date(booking_start)) {
        throw new Error("Booking end must be after booking start");
    }

    return await bookingRepository.updateBooking(id, bookingData);
};

const deleteBooking = async (id) => {
    if (!id) throw new Error("Booking ID is required");
    const existingBooking = await bookingRepository.getBookingById(id);
    if (!existingBooking) throw new Error("Booking not found");
    return await bookingRepository.deleteBooking(id);
};

const getCalendarBookings = async () => {
    return await bookingRepository.getCalendarBookings();
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getCalendarBookings
};

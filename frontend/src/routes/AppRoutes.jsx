import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Assets from '../pages/Assets/Assets';
import AssetDetails from '../pages/Assets/AssetDetails';
import AddAsset from '../pages/Assets/AddAsset';
import Employees from '../pages/Employees/Employees';
import EmployeeDetails from '../pages/Employees/EmployeeDetails';
import Departments from '../pages/Departments/Departments';
import Bookings from '../pages/Bookings/Bookings';
import BookingCalendar from '../pages/Bookings/BookingCalendar';
import Maintenance from '../pages/Maintenance/Maintenance';
import MaintenanceRequest from '../pages/Maintenance/MaintenanceRequest';
import Audits from '../pages/Audits/Audits';
import AuditDetails from '../pages/Audits/AuditDetails';
import Reports from '../pages/Reports/Reports';
import Settings from '../pages/Settings/Settings';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="assets" element={<Assets />} />
                    <Route path="assets/:id" element={<AssetDetails />} />
                    <Route path="assets/add" element={<AddAsset />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/:id" element={<EmployeeDetails />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/calendar" element={<BookingCalendar />} />
                    <Route path="maintenance" element={<Maintenance />} />
                    <Route path="maintenance/request" element={<MaintenanceRequest />} />
                    <Route path="audits" element={<Audits />} />
                    <Route path="audits/:id" element={<AuditDetails />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

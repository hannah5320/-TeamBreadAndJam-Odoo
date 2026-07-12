import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Assets from '../pages/Assets/Assets';
import AssetDetails from '../pages/Assets/AssetDetails';
import AddAsset from '../pages/Assets/AddAsset';
import Employees from '../pages/Employees/Employees';
import AddEmployee from '../pages/Employees/AddEmployee';
import EmployeeDetails from '../pages/Employees/EmployeeDetails';
import Departments from '../pages/Departments/Departments';
import AddDepartment from '../pages/Departments/AddDepartment';
import Allocations from '../pages/Allocations/Allocations';
import CreateAllocation from '../pages/Allocations/CreateAllocation';
import Bookings from '../pages/Bookings/Bookings';
import BookingCalendar from '../pages/Bookings/BookingCalendar';
import CreateBooking from '../pages/Bookings/CreateBooking';
import Maintenance from '../pages/Maintenance/Maintenance';
import MaintenanceRequest from '../pages/Maintenance/MaintenanceRequest';
import Audits from '../pages/Audits/Audits';
import AuditDetails from '../pages/Audits/AuditDetails';
import CreateAudit from '../pages/Audits/CreateAudit';
import Reports from '../pages/Reports/Reports';
import Notifications from '../pages/Notifications/Notifications';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import AssetCategories from '../pages/AssetCategories/AssetCategories';
import AddCategory from '../pages/AssetCategories/AddCategory';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        
                        <Route path="assets" element={<Assets />} />
                        <Route path="assets/:id" element={<AssetDetails />} />
                        <Route path="assets/add" element={<AddAsset />} />
                        <Route path="assets/create" element={<AddAsset />} />

                        <Route path="categories" element={<AssetCategories />} />
                        <Route path="categories/create" element={<AddCategory />} />

                        <Route path="employees" element={<Employees />} />
                        <Route path="employees/create" element={<AddEmployee />} />
                        <Route path="employees/:id" element={<EmployeeDetails />} />

                        <Route path="departments" element={<Departments />} />
                        <Route path="departments/create" element={<AddDepartment />} />

                        <Route path="allocations" element={<Allocations />} />
                        <Route path="allocations/create" element={<CreateAllocation />} />

                        <Route path="bookings" element={<Bookings />} />
                        <Route path="bookings/calendar" element={<BookingCalendar />} />
                        <Route path="bookings/create" element={<CreateBooking />} />

                        <Route path="maintenance" element={<Maintenance />} />
                        <Route path="maintenance/request" element={<MaintenanceRequest />} />

                        <Route path="audits" element={<Audits />} />
                        <Route path="audits/:id" element={<AuditDetails />} />
                        <Route path="audits/create" element={<CreateAudit />} />

                        <Route path="reports" element={<Reports />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

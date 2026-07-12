import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

function MainLayout() {
    return (
        <div>
            <Sidebar />
            <div style={{ marginLeft: '260px', paddingTop: '70px' }}>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
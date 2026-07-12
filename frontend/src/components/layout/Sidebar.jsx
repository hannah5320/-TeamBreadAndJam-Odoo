import { NavLink } from 'react-router-dom';
import { 
  FiGrid, 
  FiBox, 
  FiUsers, 
  FiLayers, 
  FiCalendar, 
  FiTool, 
  FiClipboard, 
  FiBarChart2, 
  FiSettings,
  FiShare2
} from 'react-icons/fi';

function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid className="sidebar-icon" /> },
    { name: 'Assets', path: '/assets', icon: <FiBox className="sidebar-icon" /> },
    { name: 'Employees', path: '/employees', icon: <FiUsers className="sidebar-icon" /> },
    { name: 'Departments', path: '/departments', icon: <FiLayers className="sidebar-icon" /> },
    { name: 'Allocations', path: '/allocations', icon: <FiShare2 className="sidebar-icon" /> },
    { name: 'Bookings', path: '/bookings', icon: <FiCalendar className="sidebar-icon" /> },
    { name: 'Maintenance', path: '/maintenance', icon: <FiTool className="sidebar-icon" /> },
    { name: 'Audits', path: '/audits', icon: <FiClipboard className="sidebar-icon" /> },
    { name: 'Reports', path: '/reports', icon: <FiBarChart2 className="sidebar-icon" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="sidebar-icon" /> }
  ];

  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 260px;
          background-color: #0f172a;
          color: #94a3b8;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #1e293b;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          z-index: 100;
          box-sizing: border-box;
        }

        .sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid #1e293b;
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-sizing: border-box;
        }

        .sidebar-menu {
          flex: 1;
          padding: 24px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-sizing: border-box;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .sidebar-link:hover {
          background-color: #1e293b;
          color: #ffffff;
        }

        .sidebar-link.active {
          background-color: #2563eb;
          color: #ffffff;
        }

        .sidebar-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
          }
          .sidebar-header span {
            display: none;
          }
          .sidebar-link span {
            display: none;
          }
          .sidebar-header {
            justify-content: center;
            padding: 0;
          }
          .sidebar-link {
            justify-content: center;
            padding: 12px;
          }
        }
      `}</style>
      <div className="sidebar-header">
        <span>AssetFlow</span>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => 
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

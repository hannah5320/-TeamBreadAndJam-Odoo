import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiUser, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsDarkMode(document.body.classList.contains('dark-mode'));
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 260px;
          right: 0;
          height: 70px;
          background-color: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          z-index: 99;
          box-sizing: border-box;
        }

        .navbar-brand {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar-brand img {
          height: 64px;
          width: auto;
          transition: filter 0.3s ease;
          /* Add dark drop shadow in light mode to guarantee visibility of light logos */
          filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.3));
        }

        body.dark-mode .navbar-brand img {
          /* Add light drop shadow in dark mode to guarantee visibility of dark logos */
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.4));
        }

        .navbar-search-container {
          display: flex;
          align-items: center;
          position: relative;
          width: 320px;
        }

        .navbar-search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          font-size: 16px;
        }

        .navbar-search-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          font-size: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #f8fafc;
          color: #334155;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .navbar-search-input:focus {
          background-color: #ffffff;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .navbar-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          position: relative;
        }

        .navbar-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .navbar-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .navbar-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .navbar-profile:hover {
          background-color: #f1f5f9;
        }

        .navbar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-size: 16px;
          font-weight: 600;
        }
        
        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        @media (max-width: 768px) {
          .navbar {
            left: 70px;
            padding: 0 16px;
          }
          .navbar-search-container {
            width: 180px;
          }
          .user-name {
            display: none;
          }
        }
      `}</style>
      <div className="navbar-brand">
        <img src="/assetflow-logo.png" alt="AssetFlow Logo" />
      </div>
      <div className="navbar-search-container">
        <FiSearch className="navbar-search-icon" />
        <input 
          type="text" 
          placeholder="Search resources..." 
          className="navbar-search-input" 
        />
      </div>
      <div className="navbar-actions">
        <button 
          type="button" 
          className="navbar-btn" 
          aria-label="Toggle Dark Mode"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button 
          type="button" 
          className="navbar-btn" 
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
        >
          <FiBell />
          <span className="navbar-badge"></span>
        </button>
        <div className="navbar-profile" onClick={() => navigate('/profile')}>
          <div className="navbar-avatar">
            <FiUser />
          </div>
          <span className="user-name">{user?.name || 'User'}</span>
        </div>
        <button 
          type="button" 
          className="navbar-btn" 
          aria-label="Logout"
          onClick={handleLogout}
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}

export default Navbar;

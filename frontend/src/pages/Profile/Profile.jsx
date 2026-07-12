/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import Button from '../../components/ui/Button';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/profile');
        // setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch user profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .back-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .profile-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .profile-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          max-width: 600px;
        }

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-size: 32px;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }

        .profile-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .profile-value {
          font-size: 15px;
          font-weight: 500;
          color: #1e293b;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background-color: #fef2f2;
          color: #dc2626;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="profile-header">
        <button type="button" className="back-btn" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft />
        </button>
        <div className="profile-title">
          <h1>My Profile</h1>
        </div>
      </div>

      <div className="profile-card">
        {loading ? (
          <p>Loading profile details...</p>
        ) : error ? (
          <div className="error-banner">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        ) : !profile ? (
          <div>
            <div className="avatar-section">
              <div className="avatar-circle">
                <FiUser />
              </div>
              <div>
                <h3 style={{ margin: 0, color: '#0f172a' }}>Standard User</h3>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>ERP Account Owner</p>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-group">
                <span className="profile-label">Email Address</span>
                <span className="profile-value">user@assetflow.com</span>
              </div>
              <div className="profile-group">
                <span className="profile-label">Access Level</span>
                <span className="profile-value">Administrator</span>
              </div>
              <div className="profile-group">
                <span className="profile-label">Language</span>
                <span className="profile-value">English (US)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" onClick={() => navigate('/settings')}>
                Edit Profile Settings
              </Button>
              <Button variant="danger" onClick={() => navigate('/login')}>
                <FiLogOut style={{ marginRight: '8px' }} />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="avatar-section">
              <div className="avatar-circle">
                <FiUser />
              </div>
              <div>
                <h3 style={{ margin: 0, color: '#0f172a' }}>{profile.name}</h3>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>{profile.role}</p>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-group">
                <span className="profile-label">Email Address</span>
                <span className="profile-value">{profile.email}</span>
              </div>
              <div className="profile-group">
                <span className="profile-label">Access Level</span>
                <span className="profile-value">{profile.accessLevel || 'Administrator'}</span>
              </div>
              <div className="profile-group">
                <span className="profile-label">Language</span>
                <span className="profile-value">{profile.language || 'English (US)'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" onClick={() => navigate('/settings')}>
                Edit Profile Settings
              </Button>
              <Button variant="danger" onClick={() => navigate('/login')}>
                <FiLogOut style={{ marginRight: '8px' }} />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

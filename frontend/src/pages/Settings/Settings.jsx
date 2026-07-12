import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { FiUser, FiGlobe, FiSliders, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    orgName: '',
    timezone: 'UTC',
    emailNotifications: true,
    darkMode: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/settings');
        // setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch user settings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newVal
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Axios API integration placeholder
      // await axios.post('/api/settings', formData);
      setSuccessMessage('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <style>{`
        .settings-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .settings-header {
          margin-bottom: 28px;
        }

        .settings-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }
        }

        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .settings-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .settings-nav-btn:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .settings-nav-btn.active {
          background-color: #2563eb;
          color: #ffffff;
        }

        .settings-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .settings-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 24px 0;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          max-width: 500px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        }

        .form-input {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
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

        .success-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background-color: #f0fdf4;
          color: #16a34a;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-layout">
        <aside className="settings-nav">
          <button 
            type="button" 
            className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Profile Settings
          </button>
          <button 
            type="button" 
            className={`settings-nav-btn ${activeTab === 'org' ? 'active' : ''}`}
            onClick={() => setActiveTab('org')}
          >
            <FiGlobe /> Organization Settings
          </button>
          <button 
            type="button" 
            className={`settings-nav-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <FiSliders /> Preferences
          </button>
        </aside>

        <div className="settings-card">
          {error && (
            <div className="error-banner">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="success-banner">
              <FiCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {activeTab === 'profile' && (
              <div>
                <h2 className="settings-card-title">Profile Settings</h2>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="e.g. john.doe@company.com"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {activeTab === 'org' && (
              <div>
                <h2 className="settings-card-title">Organization Settings</h2>
                <div className="form-group">
                  <label className="form-label">Organization Name</label>
                  <input 
                    type="text" 
                    name="orgName" 
                    value={formData.orgName} 
                    onChange={handleChange} 
                    placeholder="e.g. Acme Corp"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Timezone</label>
                  <select 
                    name="timezone" 
                    value={formData.timezone} 
                    onChange={handleChange} 
                    className="form-input"
                  >
                    <option value="UTC">UTC (GMT)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="settings-card-title">Preferences</h2>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="emailNotifications"
                    name="emailNotifications" 
                    checked={formData.emailNotifications} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="emailNotifications" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                    Enable Email Alerts & Notifications
                  </label>
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving Changes...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;

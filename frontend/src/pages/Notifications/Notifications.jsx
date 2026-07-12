/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FiBell, FiAlertCircle } from 'react-icons/fi';

function Notifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/notifications');
        // setData(response.data);
      } catch (err) {
        setError('Failed to fetch notifications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <style>{`
        .notifications-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .notifications-header {
          margin-bottom: 28px;
        }

        .notifications-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .notifications-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .notification-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .empty-notifications {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          text-align: center;
          color: #64748b;
        }

        .empty-icon {
          font-size: 40px;
          margin-bottom: 16px;
          color: #94a3b8;
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

      <div className="notifications-header">
        <h1>Notifications</h1>
      </div>

      <div className="notifications-card">
        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <div className="error-banner">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-notifications">
            <FiBell className="empty-icon" />
            <p style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>No notifications available</p>
            <p style={{ fontSize: '13px', margin: 0 }}>You are all caught up! New alerts and update logs will appear here.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {data.map((notification) => (
              <div key={notification.id} className="notification-item">
                {/* Custom rendering */}
                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.message}</p>
                  <small>{notification.date}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;

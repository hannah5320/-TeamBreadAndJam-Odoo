/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function BookingCalendar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/bookings/calendar');
        // setData(response.data);
      } catch (err) {
        setError('Failed to fetch calendar bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="calendar-page-container">
      <style>{`
        .calendar-page-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
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

        .calendar-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-btn {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
          cursor: pointer;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .nav-btn:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
        }

        .month-label {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          min-width: 150px;
          text-align: center;
        }

        .calendar-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #cbd5e1;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          overflow: hidden;
        }

        .day-header {
          background-color: #f8fafc;
          padding: 16px;
          font-weight: 600;
          text-align: center;
          font-size: 13px;
          color: #475569;
        }

        .day-cell {
          background-color: #ffffff;
          height: 120px;
          padding: 12px;
          box-sizing: border-box;
          text-align: right;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          position: relative;
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

      <div className="calendar-header">
        <div className="header-left">
          <button type="button" className="back-btn" onClick={() => navigate('/bookings')}>
            <FiArrowLeft />
          </button>
          <div className="calendar-title">
            <h1>Booking Calendar</h1>
          </div>
        </div>

        <div className="calendar-nav">
          <button type="button" className="nav-btn"><FiChevronLeft /></button>
          <span className="month-label">July 2026</span>
          <button type="button" className="nav-btn"><FiChevronRight /></button>
        </div>
      </div>

      <div className="calendar-card">
        {loading ? (
          <p>Loading calendar bookings...</p>
        ) : error ? (
          <div className="error-banner">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        ) : (
          <div className="calendar-days-grid">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
              <div key={d} className="day-header">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="day-cell">
                <span>{i - 2 > 0 && i - 2 <= 31 ? i - 2 : ''}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCalendar;

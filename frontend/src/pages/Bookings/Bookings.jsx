/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiAlertCircle, FiCalendar, FiList, FiSearch } from 'react-icons/fi';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

function Bookings() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/bookings');
        // setData(response.data);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const columns = [
    { header: 'Asset', accessor: 'assetName', render: (row) => <strong>{row.assetName}</strong> },
    { header: 'Employee', accessor: 'employeeName' },
    { header: 'Purpose', accessor: 'purpose' },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => <StatusBadge status={row.status} /> 
    }
  ];

  return (
    <div className="module-container">
      <style>{`
        .module-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .module-title h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .module-controls {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .search-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          background-color: #ffffff;
        }

        .view-toggle {
          display: flex;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          overflow: hidden;
          background-color: #ffffff;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          background: none;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background-color: #f1f5f9;
          color: #0f172a;
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

        .calendar-placeholder {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 48px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #cbd5e1;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 24px;
        }

        .calendar-day-header {
          background-color: #f8fafc;
          padding: 12px;
          font-weight: 600;
          text-align: center;
          font-size: 12px;
          color: #475569;
        }

        .calendar-day-cell {
          background-color: #ffffff;
          height: 100px;
          padding: 8px;
          box-sizing: border-box;
          text-align: right;
          font-size: 13px;
          color: #64748b;
        }
      `}</style>

      <div className="module-header">
        <div className="module-title">
          <h1>Asset Bookings</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={() => navigate('/bookings/calendar')}>
            <FiCalendar style={{ marginRight: '8px' }} /> View Full Calendar
          </Button>
          <Button variant="primary" onClick={() => navigate('/bookings/create')}>
            <FiPlus style={{ marginRight: '8px', strokeWidth: 3 }} /> Create Booking
          </Button>
        </div>
      </div>

      <div className="module-controls">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="view-toggle">
          <button 
            type="button" 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList /> List View
          </button>
          <button 
            type="button" 
            className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            <FiCalendar /> Calendar View
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      )}

      {viewMode === 'list' ? (
        <Table 
          columns={columns}
          data={data}
          loading={loading}
          emptyMessage="No asset bookings registered yet"
          actions={(row) => (
            <>
              <Button variant="secondary" onClick={() => {}}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => {}}>
                Cancel
              </Button>
            </>
          )}
        />
      ) : (
        <div className="calendar-placeholder">
          <FiCalendar style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '16px' }} />
          <h3>Monthly Calendar View</h3>
          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            Interactive booking events overlay. Integrates scheduled assets directly on specific operational dates.
          </p>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="calendar-day-header">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="calendar-day-cell">{i - 2 > 0 && i - 2 <= 30 ? i - 2 : ''}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;

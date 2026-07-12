import { useState, useEffect } from 'react';
import { FiBarChart2, FiActivity, FiClipboard, FiCalendar, FiUsers, FiDownload } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

function Reports() {
  const [activeTab, setActiveTab] = useState('assets');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportTypes = [
    { id: 'assets', label: 'Asset Report', icon: <FiBarChart2 /> },
    { id: 'departments', label: 'Department Report', icon: <FiUsers /> },
    { id: 'maintenance', label: 'Maintenance Report', icon: <FiActivity /> },
    { id: 'audits', label: 'Audit Report', icon: <FiClipboard /> },
    { id: 'bookings', label: 'Booking Report', icon: <FiCalendar /> }
  ];

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      setData([]);
      try {
        // Axios API integration placeholder
        // const response = await axios.get(`/api/reports/${activeTab}`);
        // setData(response.data);
      } catch (err) {
        setError(`Failed to fetch data for ${activeTab} report.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, [activeTab]);

  // Define dynamic columns based on active tab
  const getColumns = () => {
    switch (activeTab) {
      case 'assets':
        return [
          { header: 'Status Category', accessor: 'status' },
          { header: 'Asset Count', accessor: 'count' },
          { header: 'Total Value', accessor: 'value' }
        ];
      case 'departments':
        return [
          { header: 'Department', accessor: 'department' },
          { header: 'Assigned Assets', accessor: 'assets' },
          { header: 'Total Value', accessor: 'value' }
        ];
      case 'maintenance':
        return [
          { header: 'Asset Type', accessor: 'type' },
          { header: 'Requests Logged', accessor: 'requests' },
          { header: 'Total Repair Cost', accessor: 'cost' }
        ];
      case 'audits':
        return [
          { header: 'Audit Cycle', accessor: 'cycle' },
          { header: 'Verified Assets', accessor: 'verified' },
          { header: 'Missing/Damaged', accessor: 'issues' }
        ];
      case 'bookings':
        return [
          { header: 'Resource Type', accessor: 'resource' },
          { header: 'Total Bookings', accessor: 'bookings' },
          { header: 'Utilization Rate', accessor: 'utilization' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="module-container">
      <style>{`
        .module-container {
          padding: 32px;
          min-height: calc(100vh - 70px);
          box-sizing: border-box;
          background-color: #f8fafc;
          color: #1e293b;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
        }

        .module-title h1 {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .module-title p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .tabs-container {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
          overflow-x: auto;
        }

        .report-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          background: none;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .report-tab:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .report-tab.active {
          background-color: #2563eb;
          color: #ffffff;
        }

        .report-content {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
        }
      `}</style>

      <div className="reports-header">
        <div className="module-title">
          <h1>Analytics & Reports</h1>
          <p>Generate, export, and examine operational logs and statistics</p>
        </div>
        <Button variant="secondary" onClick={() => alert('Export functionality to be implemented by backend.')}>
          <FiDownload style={{ marginRight: '8px' }} /> Export to CSV
        </Button>
      </div>

      <div className="tabs-container">
        {reportTypes.map((tab) => (
          <button
            key={tab.id}
            className={`report-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="report-content dashboard-card">
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>
          {reportTypes.find(t => t.id === activeTab)?.label} Data
        </h3>
        
        <Table 
          columns={getColumns()}
          data={data}
          loading={loading}
          emptyMessage={`No data available for the ${activeTab} report yet.`}
        />
      </div>
    </div>
  );
}

export default Reports;

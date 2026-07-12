/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiTool, 
  FiClock, 
  FiRefreshCw,
  FiPlus,
  FiInbox,
  FiArrowRight
} from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { defaultDashboardData } from './dashboardData';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30days');

  // React states initialized with default stucture from dashboardData.js
  const [kpiData, setKpiData] = useState(defaultDashboardData.kpiData);
  const [categories, setCategories] = useState(defaultDashboardData.categories);
  const [statusStats, setStatusStats] = useState(defaultDashboardData.statusStats);
  const [recentActivities, setRecentActivities] = useState(defaultDashboardData.recentActivities);
  const [pendingActions, setPendingActions] = useState(defaultDashboardData.pendingActions);

  // Placeholder useEffect template for future Axios API integration
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Future Backend Integration:
        // const response = await axios.get(`/api/dashboard?range=${dateRange}`);
        // const data = response.data;
        // setKpiData(data.kpiData);
        // setCategories(data.categories);
        // setStatusStats(data.statusStats);
        // setRecentActivities(data.recentActivities);
        // setPendingActions(data.pendingActions);
      } catch (error) {
        console.error("Error fetching dashboard data via Axios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [dateRange]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  // Recent Activities Table Columns configuration
  const activityColumns = [
    { header: 'Activity', accessor: 'activity', render: (row) => <strong>{row.activity}</strong> },
    { header: 'User', accessor: 'user' },
    { header: 'Asset', accessor: 'asset' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => <StatusBadge status={row.status} /> 
    }
  ];

  const isDashboardEmpty = 
    categories.length === 0 &&
    statusStats.length === 0 &&
    recentActivities.length === 0 &&
    pendingActions.length === 0;

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .header-title-area h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .header-title-area p {
          font-size: 14px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .date-select {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background-color: #ffffff;
          color: #334155;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .date-select:hover {
          border-color: #94a3b8;
        }

        .date-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        @media (max-width: 1400px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }

        .quick-actions-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr;
          }
        }

        .dashboard-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .dashboard-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 20px 0;
        }

        .overview-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 640px) {
          .overview-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .progress-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .progress-item-header {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .progress-bar-bg {
          height: 8px;
          background-color: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .action-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .action-item:hover {
          background-color: #f1f5f9;
          border-color: #cbd5e1;
        }

        .action-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .action-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .action-count {
          font-size: 12px;
          color: #64748b;
        }

        .empty-state-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          margin: 40px auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .empty-state-icon {
          font-size: 48px;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .empty-state-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .empty-state-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 24px 0;
        }
      `}</style>

      {/* Page Header */}
      <div className="dashboard-header">
        <div className="header-title-area">
          <h1>Dashboard</h1>
          <p>Overview of organizational assets, resources, and activities</p>
        </div>
        <div className="header-controls">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>

          <Button variant="secondary" onClick={handleRefresh}>
            <FiRefreshCw style={{ marginRight: '8px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </Button>
        </div>
      </div>

      {isDashboardEmpty ? (
        <div className="empty-state-container">
          <FiInbox className="empty-state-icon" />
          <h2 className="empty-state-title">No dashboard data available</h2>
          <p className="empty-state-subtitle">
            Dashboard information will appear once assets, employees and requests are available in the system.
          </p>
          <Button variant="primary" onClick={() => navigate('/assets/create')}>
            <FiPlus style={{ marginRight: '8px', strokeWidth: 3 }} /> Add First Asset
          </Button>
        </div>
      ) : (
        <>
          {/* KPI Metric Cards */}
          <div className="kpi-grid">
            {kpiData.map((kpi, idx) => {
              const IconComponent = kpi.icon;
              return (
                <Card 
                  key={idx}
                  title={kpi.title}
                  value={kpi.value}
                  icon={IconComponent ? <IconComponent style={kpi.iconColor ? { color: kpi.iconColor } : undefined} /> : null}
                  subtitle={kpi.subtitle}
                />
              );
            })}
          </div>

          {/* Quick Actions Panel */}
          <div className="quick-actions-bar">
            <Button variant="primary" onClick={() => navigate('/assets/create')}>
              <FiPlus style={{ marginRight: '8px', strokeWidth: 3 }} /> Add Asset
            </Button>
            <Button variant="secondary" onClick={() => navigate('/allocations/create')}>
              <FiUsers style={{ marginRight: '8px' }} /> Allocate Asset
            </Button>
            <Button variant="secondary" onClick={() => navigate('/bookings/create')}>
              <FiClock style={{ marginRight: '8px' }} /> Create Request
            </Button>
            <Button variant="secondary" onClick={() => navigate('/maintenance/request')}>
              <FiTool style={{ marginRight: '8px' }} /> Schedule Maintenance
            </Button>
          </div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-main-grid">
            {/* Left Column: Asset Distribution, Status, and Recent Activities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Asset Distribution and Status Grid */}
              <div className="dashboard-card">
                <h3 className="dashboard-card-title">Asset Overview</h3>
                <div className="overview-row">
                  {/* Distribution Categories */}
                  <div>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>Asset Distribution</h4>
                    <div className="progress-list">
                      {categories.map((cat, idx) => (
                        <div key={idx} className="progress-item">
                          <div className="progress-item-header">
                            <span>{cat.name}</span>
                            <span>{cat.count} ({cat.percentage}%)</span>
                          </div>
                          <div className="progress-bar-bg">
                            <div 
                              className="progress-bar-fill" 
                              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Allocation breakdown */}
                  <div>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>Asset Status</h4>
                    <div className="progress-list">
                      {statusStats.map((status, idx) => (
                        <div key={idx} className="progress-item">
                          <div className="progress-item-header">
                            <span>{status.name}</span>
                            <span>{status.count} ({status.percentage}%)</span>
                          </div>
                          <div className="progress-bar-bg">
                            <div 
                              className="progress-bar-fill" 
                              style={{ width: `${status.percentage}%`, backgroundColor: status.color }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities Table */}
              <div className="dashboard-card">
                <h3 className="dashboard-card-title">Recent Activities</h3>
                <Table 
                  columns={activityColumns}
                  data={recentActivities}
                  loading={loading}
                  emptyMessage="No recent activities recorded."
                />
              </div>

            </div>

            {/* Right Column: Pending Actions */}
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Pending Actions</h3>
              <div className="actions-list">
                {pendingActions.map((action, idx) => (
                  <div key={idx} className="action-item">
                    <div className="action-info">
                      <span className="action-title">{action.title}</span>
                      <span className="action-count">{action.count} pending items</span>
                    </div>
                    <Button variant="secondary" onClick={() => navigate(action.route || '/bookings')}>
                      View <FiArrowRight style={{ marginLeft: '6px' }} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

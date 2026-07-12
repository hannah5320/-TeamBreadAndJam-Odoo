import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiTool,
  FiClock,
  FiRefreshCw,
  FiPlus,
  FiInbox,
  FiArrowRight,
} from "react-icons/fi";

import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";

import { defaultDashboardData } from "./dashboardData";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("30days");

  const [kpiData, setKpiData] = useState(
    defaultDashboardData.kpiData
  );

  const [categories, setCategories] = useState(
    defaultDashboardData.categories
  );

  const [statusStats, setStatusStats] = useState(
    defaultDashboardData.statusStats
  );

  const [recentActivities, setRecentActivities] = useState(
    defaultDashboardData.recentActivities
  );

  const [pendingActions, setPendingActions] = useState(
    defaultDashboardData.pendingActions
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Future Backend Integration
        // const response = await axios.get("/api/dashboard");
        // const data = response.data;

        // setKpiData(data.kpiData);
        // setCategories(data.categories);
        // setStatusStats(data.statusStats);
        // setRecentActivities(data.recentActivities);
        // setPendingActions(data.pendingActions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const activityColumns = [
    {
      header: "Activity",
      accessor: "activity",
      render: (row) => <strong>{row.activity}</strong>,
    },
    {
      header: "User",
      accessor: "user",
    },
    {
      header: "Asset",
      accessor: "asset",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <StatusBadge status={row.status} />,
    },
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
          font-family: "Inter", -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, sans-serif;
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
          margin: 4px 0 0;
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
          background: white;
          cursor: pointer;
          transition: 0.2s;
        }

        .date-select:hover {
          border-color: #94a3b8;
        }

        .date-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.15);
          outline: none;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(6,1fr);
          gap:20px;
          margin-bottom:28px;
        }

        @media(max-width:1440px){
          .kpi-grid{
            grid-template-columns:repeat(3,1fr);
          }
        }

        @media(max-width:768px){

          .dashboard-header{
            flex-direction:column;
            align-items:flex-start;
            gap:16px;
          }

          .kpi-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }

        @media(max-width:480px){
          .kpi-grid{
            grid-template-columns:1fr;
          }
        }

        .quick-actions-bar{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-bottom:28px;
        }

        .dashboard-main-grid{
          display:grid;
          grid-template-columns:2fr 1fr;
          gap:24px;
          margin-bottom:28px;
        }

        @media(max-width:1024px){

          .dashboard-main-grid{
            grid-template-columns:1fr;
          }

        }

        .dashboard-card{
          background:white;
          border:1px solid #e2e8f0;
          border-radius:12px;
          padding:24px;
          box-shadow:0 1px 3px rgba(0,0,0,.05);
        }

        .dashboard-card-title{
          font-size:16px;
          font-weight:700;
          margin-bottom:20px;
          color:#0f172a;
        }

        .overview-row{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:24px;
        }

        @media(max-width:640px){

          .overview-row{
            grid-template-columns:1fr;
          }

        }

        .progress-list{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        .progress-item{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .progress-item-header{
          display:flex;
          justify-content:space-between;
          font-size:13px;
          font-weight:600;
        }

        .progress-bar-bg{
          height:8px;
          border-radius:999px;
          background:#f1f5f9;
          overflow:hidden;
        }

        .progress-bar-fill{
          height:100%;
          border-radius:999px;
        }

        .actions-list{
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .action-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:#f8fafc;
          border:1px solid #e2e8f0;
          padding:14px 16px;
          border-radius:8px;
        }

        .action-info{
          display:flex;
          flex-direction:column;
          gap:2px;
        }

        .action-title{
          font-weight:600;
          font-size:14px;
        }

        .action-count{
          font-size:12px;
          color:#64748b;
        }

        .empty-state-container{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          text-align:center;
          background:white;
          border:1px solid #e2e8f0;
          border-radius:12px;
          padding:80px 24px;
          max-width:520px;
          margin:60px auto;
        }

        .empty-state-icon{
          font-size:48px;
          color:#94a3b8;
          margin-bottom:18px;
        }

        .empty-state-title{
          font-size:22px;
          font-weight:700;
          margin-bottom:10px;
        }

        .empty-state-subtitle{
          color:#64748b;
          margin-bottom:28px;
        }
      `}</style>

      <div className="dashboard-header">
        <div className="header-title-area">
          <h1>Dashboard</h1>
          <p>
            Overview of organizational assets, resources, and activities
          </p>
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

          <Button
            variant="secondary"
            onClick={handleRefresh}
          >
            <FiRefreshCw
              style={{
                marginRight: "8px",
                animation: loading
                  ? "spin 1s linear infinite"
                  : "none",
              }}
            />
            Refresh
          </Button>
        </div>
      </div>

      {isDashboardEmpty ? (
        <div className="empty-state-container">
          <FiInbox className="empty-state-icon" />

          <h2 className="empty-state-title">
            No dashboard data available
          </h2>

          <p className="empty-state-subtitle">
            Dashboard information will appear once assets,
            employees and requests are available in the system.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/assets")}
          >
            <FiPlus
              style={{
                marginRight: "8px",
                strokeWidth: 3,
              }}
            />
            Add First Asset
          </Button>
        </div>
      ) : (
        <>
          {/* KPI Cards */}

          <div className="kpi-grid">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;

              return (
                <Card
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  subtitle={kpi.subtitle}
                  icon={
                    Icon ? (
                      <Icon
                        style={{
                          color:
                            kpi.iconColor || "#2563eb",
                        }}
                      />
                    ) : null
                  }
                />
              );
            })}
          </div>

          {/* Quick Actions */}

          <div className="quick-actions-bar">
            <Button
              variant="primary"
              onClick={() => navigate("/assets")}
            >
              <FiPlus
                style={{
                  marginRight: "8px",
                  strokeWidth: 3,
                }}
              />
              Add Asset
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/allocations")}
            >
              <FiUsers
                style={{
                  marginRight: "8px",
                }}
              />
              Allocate Asset
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/requests")}
            >
              <FiClock
                style={{
                  marginRight: "8px",
                }}
              />
              Create Request
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/maintenance")}
            >
              <FiTool
                style={{
                  marginRight: "8px",
                }}
              />
              Schedule Maintenance
            </Button>
          </div>

          {/* Dashboard Content */}

          <div className="dashboard-main-grid">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
            {/* Asset Overview */}

            <div className="dashboard-card">
              <h3 className="dashboard-card-title">
                Asset Overview
              </h3>

              <div className="overview-row">

                {/* Asset Distribution */}

                <div>
                  <h4
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    Asset Distribution
                  </h4>

                  {categories.length === 0 ? (
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >
                      No asset category data available.
                    </p>
                  ) : (
                    <div className="progress-list">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="progress-item"
                        >
                          <div className="progress-item-header">
                            <span>{category.name}</span>

                            <span>
                              {category.count} (
                              {category.percentage}%)
                            </span>
                          </div>

                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${category.percentage}%`,
                                backgroundColor:
                                  category.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Asset Status */}

                <div>
                  <h4
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    Asset Status
                  </h4>

                  {statusStats.length === 0 ? (
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >
                      No asset status data available.
                    </p>
                  ) : (
                    <div className="progress-list">
                      {statusStats.map((status, index) => (
                        <div
                          key={index}
                          className="progress-item"
                        >
                          <div className="progress-item-header">
                            <span>{status.name}</span>

                            <span>
                              {status.count} (
                              {status.percentage}%)
                            </span>
                          </div>

                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${status.percentage}%`,
                                backgroundColor:
                                  status.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Recent Activities */}

            <div className="dashboard-card">
              <h3 className="dashboard-card-title">
                Recent Activities
              </h3>

              <Table
                columns={activityColumns}
                data={recentActivities}
                loading={loading}
                emptyMessage="No recent activities available."
              />
            </div>

          </div>

          {/* Right Column */}

          <div className="dashboard-card">

            <h3 className="dashboard-card-title">
              Pending Actions
            </h3>

            {pendingActions.length === 0 ? (
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                No pending actions.
              </p>
            ) : (
              <div className="actions-list">
                {pendingActions.map((action, index) => (
                  <div key={index} className="action-item">
                    <div className="action-info">
                      <span className="action-title">{action.title}</span>
                      <span className="action-count">{action.count} pending items</span>
                    </div>
                    <Button variant="secondary" onClick={() => navigate(action.route || "/requests")}>
                      View <FiArrowRight style={{ marginLeft: "6px" }} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
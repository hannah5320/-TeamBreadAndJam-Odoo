import { useNavigate } from 'react-router-dom';
import { FiBarChart2, FiActivity, FiClipboard, FiCalendar } from 'react-icons/fi';
import Card from '../../components/ui/Card';

function Reports() {
  const navigate = useNavigate();

  const reportsList = [
    { type: 'assets', title: 'Asset Report', icon: <FiBarChart2 />, subtitle: 'Comprehensive status, categories and inventory counts.' },
    { type: 'maintenance', title: 'Maintenance Report', icon: <FiActivity />, subtitle: 'Breakdown of service requests, costs, and technicians.' },
    { type: 'audits', title: 'Audit Report', icon: <FiClipboard />, subtitle: 'Lifecycle verification history and compliance scores.' },
    { type: 'bookings', title: 'Booking Report', icon: <FiCalendar />, subtitle: 'Utilization analytics and reservation schedules.' }
  ];

  return (
    <div className="reports-container">
      <style>{`
        .reports-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .reports-header {
          margin-bottom: 28px;
        }

        .reports-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .reports-header p {
          font-size: 14px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .reports-grid {
            grid-template-columns: 1fr;
          }
        }

        .report-card-actions {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
      `}</style>

      <div className="reports-header">
        <h1>Analytics & Reports</h1>
        <p>Generate, export, and examine operational logs and statistics</p>
      </div>

      <div className="reports-grid">
        {reportsList.map((report) => (
          <Card 
            key={report.type}
            title={report.title}
            icon={report.icon}
            subtitle={report.subtitle}
            value="View Report"
            onClick={() => navigate(`/reports/${report.type}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Reports;

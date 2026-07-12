/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get(`/api/employees/${id}`);
        // setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee profile details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="details-container">
      <style>{`
        .details-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .details-header {
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

        .details-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .details-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          max-width: 600px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .details-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .details-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .details-value {
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

      <div className="details-header">
        <button type="button" className="back-btn" onClick={() => navigate('/employees')}>
          <FiArrowLeft />
        </button>
        <div className="details-title">
          <h1>Employee Profile (ID: {id})</h1>
        </div>
      </div>

      <div className="details-card">
        {loading ? (
          <p>Loading employee profile details...</p>
        ) : error ? (
          <div className="error-banner">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        ) : !employee ? (
          <div>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>No employee profile information loaded for this ID.</p>
            <div className="details-grid">
              <div className="details-group">
                <span className="details-label">Full Name</span>
                <span className="details-value">—</span>
              </div>
              <div className="details-group">
                <span className="details-label">Email Address</span>
                <span className="details-value">—</span>
              </div>
              <div className="details-group">
                <span className="details-label">Department</span>
                <span className="details-value">—</span>
              </div>
              <div className="details-group">
                <span className="details-label">Role</span>
                <span className="details-value">—</span>
              </div>
              <div className="details-group">
                <span className="details-label">Status</span>
                <span className="details-value"><StatusBadge status="Active" /></span>
              </div>
            </div>
            <Button variant="secondary" onClick={() => navigate('/employees')}>
              Go Back
            </Button>
          </div>
        ) : (
          <div>
            <div className="details-grid">
              <div className="details-group">
                <span className="details-label">Full Name</span>
                <span className="details-value">{employee.name}</span>
              </div>
              <div className="details-group">
                <span className="details-label">Email Address</span>
                <span className="details-value">{employee.email}</span>
              </div>
              <div className="details-group">
                <span className="details-label">Department</span>
                <span className="details-value">{employee.department}</span>
              </div>
              <div className="details-group">
                <span className="details-label">Job Title / Role</span>
                <span className="details-value">{employee.role}</span>
              </div>
              <div className="details-group">
                <span className="details-label">Status</span>
                <span className="details-value"><StatusBadge status={employee.status} /></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => navigate('/employees')}>
                Go Back
              </Button>
              <Button variant="primary" onClick={() => navigate(`/employees/edit/${id}`)}>
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;

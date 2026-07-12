/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiAlertCircle, FiSearch } from 'react-icons/fi';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

function Employees() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/employees');
        // setData(response.data);
      } catch (err) {
        setError('Failed to fetch employees. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name', render: (row) => <strong>{row.name}</strong> },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'department' },
    { header: 'Role', accessor: 'role' },
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
          gap: 16px;
          margin-bottom: 24px;
          align-items: center;
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

      <div className="module-header">
        <div className="module-title">
          <h1>Employees</h1>
        </div>
        <Button variant="primary" onClick={() => navigate('/employees/create')}>
          <FiPlus style={{ marginRight: '8px', strokeWidth: 3 }} /> Add Employee
        </Button>
      </div>

      <div className="module-controls">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      )}

      <Table 
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage="No employees registered yet"
        actions={(row) => (
          <>
            <Button variant="secondary" onClick={() => navigate(`/employees/${row.id}`)}>
              View Profile
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/employees/edit/${row.id}`)}>
              Edit
            </Button>
          </>
        )}
      />
    </div>
  );
}

export default Employees;

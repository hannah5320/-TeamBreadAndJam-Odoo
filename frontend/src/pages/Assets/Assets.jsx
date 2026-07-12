/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiAlertCircle, FiSearch } from 'react-icons/fi';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

function Assets() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        // Axios API integration placeholder
        // const response = await axios.get('/api/assets');
        // setData(response.data);
      } catch (err) {
        setError('Failed to fetch assets. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const columns = [
    { header: 'Asset Tag', accessor: 'tag' },
    { header: 'Asset Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Location', accessor: 'location' },
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
          flex-wrap: wrap;
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

        .filter-select {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background-color: #ffffff;
          outline: none;
          cursor: pointer;
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
          <h1>Assets</h1>
        </div>
        <Button variant="primary" onClick={() => navigate('/assets/create')}>
          <FiPlus style={{ marginRight: '8px', strokeWidth: 3 }} /> Add Asset
        </Button>
      </div>

      <div className="module-controls">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
          <option value="Furniture">Furniture</option>
          <option value="Equipment">Equipment</option>
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Allocated">Allocated</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
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
        emptyMessage="No assets available yet"
        actions={(row) => (
          <>
            <Button variant="secondary" onClick={() => navigate(`/assets/${row.id}`)}>
              View
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/assets/edit/${row.id}`)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => {}}>
              Delete
            </Button>
          </>
        )}
      />
    </div>
  );
}

export default Assets;

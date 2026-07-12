import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Button from '../../components/ui/Button';

function CreateAllocation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: '',
    employeeId: '',
    department: '',
    allocatedDate: '',
    returnDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Axios API integration placeholder
      // const response = await axios.post('/api/allocations', formData);
      // if (response.status === 201) {
      //   navigate('/allocations');
      // }
      navigate('/allocations');
    } catch (err) {
      setError('Failed to allocate asset. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          padding: 32px;
          background-color: #f8fafc;
          min-height: calc(100vh - 70px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          box-sizing: border-box;
        }

        .form-header {
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

        .form-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .form-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          max-width: 600px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        }

        .form-input {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
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

      <div className="form-header">
        <button type="button" className="back-btn" onClick={() => navigate('/allocations')}>
          <FiArrowLeft />
        </button>
        <div className="form-title">
          <h1>Allocate Asset</h1>
        </div>
      </div>

      <div className="form-card">
        {error && (
          <div className="error-banner">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Asset (Select Asset)</label>
            <select 
              name="assetId" 
              value={formData.assetId} 
              onChange={handleChange} 
              required
              className="form-input"
            >
              <option value="">Choose Asset...</option>
              {/* Future Options dynamically loaded */}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assign To (Select Employee)</label>
            <select 
              name="employeeId" 
              value={formData.employeeId} 
              onChange={handleChange} 
              required
              className="form-input"
            >
              <option value="">Choose Employee...</option>
              {/* Future Options dynamically loaded */}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <input 
              type="text" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              placeholder="e.g. Finance"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Allocated Date</label>
            <input 
              type="date" 
              name="allocatedDate" 
              value={formData.allocatedDate} 
              onChange={handleChange} 
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Return Date (Optional)</label>
            <input 
              type="date" 
              name="returnDate" 
              value={formData.returnDate} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <Button variant="secondary" onClick={() => navigate('/allocations')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Allocating...' : 'Allocate Asset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAllocation;

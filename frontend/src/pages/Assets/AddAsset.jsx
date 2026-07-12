import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Button from '../../components/ui/Button';

function AddAsset() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    category: 'Laptop',
    serialNumber: '',
    purchaseDate: '',
    purchaseCost: '',
    location: '',
    condition: 'New',
    status: 'Available'
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
      // const response = await axios.post('/api/assets', formData);
      // if (response.status === 201) {
      //   navigate('/assets');
      // }
      navigate('/assets');
    } catch (err) {
      setError('Failed to create asset. Please try again.');
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
          max-width: 800px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
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
        <button type="button" className="back-btn" onClick={() => navigate('/assets')}>
          <FiArrowLeft />
        </button>
        <div className="form-title">
          <h1>Add Asset</h1>
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
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Asset Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Dell Latitude 5420"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Asset Tag</label>
              <input 
                type="text" 
                name="tag" 
                value={formData.tag} 
                onChange={handleChange} 
                required 
                placeholder="e.g. AST-00124"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="form-input"
              >
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
                <option value="Furniture">Furniture</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Serial Number</label>
              <input 
                type="text" 
                name="serialNumber" 
                value={formData.serialNumber} 
                onChange={handleChange} 
                placeholder="e.g. CN-08X234-726"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input 
                type="date" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Purchase Cost</label>
              <input 
                type="number" 
                name="purchaseCost" 
                value={formData.purchaseCost} 
                onChange={handleChange} 
                placeholder="e.g. 1200"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="e.g. Head Office - Fl 4"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Condition</label>
              <select 
                name="condition" 
                value={formData.condition} 
                onChange={handleChange} 
                className="form-input"
              >
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="form-input"
              >
                <option value="Available">Available</option>
                <option value="Allocated">Allocated</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <Button variant="secondary" onClick={() => navigate('/assets')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Save Asset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAsset;

/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Button from '../../components/ui/Button';

function AddCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
    default_warranty_months: 12
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Axios POST placeholder
      // await axios.post('/api/categories', formData);
      navigate('/categories');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .module-title h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .form-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 32px;
          max-width: 600px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #3b82f6;
        }
          
        textarea.form-input {
          resize: vertical;
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }
      `}</style>

      <div className="module-header">
        <button className="back-button" onClick={() => navigate('/categories')}>
          <FiArrowLeft size={20} />
        </button>
        <div className="module-title">
          <h1>Add Asset Category</h1>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input 
              type="text" 
              name="category_name"
              className="form-input" 
              placeholder="e.g. Laptops"
              value={formData.category_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Default Warranty (Months)</label>
            <input 
              type="number" 
              name="default_warranty_months"
              className="form-input" 
              placeholder="e.g. 12"
              value={formData.default_warranty_months}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description"
              className="form-input" 
              placeholder="Enter category description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => navigate('/categories')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              <FiSave style={{ marginRight: '8px' }} /> 
              {loading ? 'Saving...' : 'Save Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;

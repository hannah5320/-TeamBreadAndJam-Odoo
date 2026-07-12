import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import Button from '../../components/ui/Button';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .login-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          width: 100%;
          max-width: 400px;
          padding: 40px;
          box-sizing: border-box;
          border: 1px solid #e2e8f0;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-logo {
          font-size: 32px;
          font-weight: 800;
          color: #2563eb;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          color: #64748b;
          font-size: 15px;
          margin: 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          font-size: 15px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .forgot-password {
          display: block;
          text-align: right;
          font-size: 13px;
          color: #2563eb;
          text-decoration: none;
          margin-top: 8px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }
          
        .submit-btn-wrapper {
          margin-top: 32px;
        }
          
        .demo-credentials {
          margin-top: 24px;
          padding: 12px;
          background-color: #f1f5f9;
          border-radius: 8px;
          font-size: 13px;
          color: #64748b;
          text-align: center;
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">AssetFlow</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="admin@assetflow.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input 
                type="password" 
                name="password"
                className="form-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <div className="submit-btn-wrapper">
            <Button type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Authenticating...' : (
                <>Sign In <FiArrowRight style={{ marginLeft: '8px' }} /></>
              )}
            </Button>
          </div>
        </form>

        <div className="demo-credentials">
          <strong>Demo Notice:</strong> Any credentials will work during this frontend prototype phase.
        </div>
      </div>
    </div>
  );
}

export default Login;

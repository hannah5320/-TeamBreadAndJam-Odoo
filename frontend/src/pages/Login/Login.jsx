import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiLock, 
  FiUser, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff, 
  FiBox,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const isDark = document.body.classList.contains('dark-mode');
    const savedTheme = localStorage.getItem('theme');
    
    if (isDark || savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await signup(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = () => {
    console.log("Initialize Google OAuth");
  };

  const handleMicrosoftLogin = () => {
    console.log("Initialize Microsoft OAuth");
  };

  return (
    <div className="login-wrapper">
      <button 
        className="login-theme-toggle" 
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
      <style>{`
        .login-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: transparent;
        }

        .login-left-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
        }

        .branding-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .branding-logo {
          width: 220px;
          height: auto;
          margin-bottom: 28px;
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.4));
          animation: logoGlow 4s ease-in-out infinite alternate;
        }

        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.3)); }
          100% { filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.9)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.6)); }
        }

        .branding-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(135deg, #1d4ed8, #6d28d9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 32px 0;
        }

        .branding-heading {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 32px;
          font-weight: 600;
          line-height: 1.2;
          color: #1e293b;
          margin: 0;
          max-width: 500px;
        }
        body.dark-mode .branding-heading {
          color: #e2e8f0;
        }

        .login-theme-toggle {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 100;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .login-theme-toggle:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }
        body.dark-mode .login-theme-toggle {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }
        body.dark-mode .login-theme-toggle:hover {
          background: rgba(30, 41, 59, 0.9);
        }

        .login-right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .glass-login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 48px;
          box-sizing: border-box;
          box-shadow: 0 12px 48px -12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .glass-login-card:hover {
          box-shadow: 0 16px 56px -12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.05);
        }
        body.dark-mode .glass-login-card {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 48px -12px rgba(0, 0, 0, 0.3);
        }
        body.dark-mode .glass-login-card:hover {
          box-shadow: 0 16px 56px -12px rgba(0, 0, 0, 0.4);
        }

        .login-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }
        body.dark-mode .login-header h2 { color: #f8fafc; }

        .login-header p {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .form-group { margin-bottom: 24px; }
        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }
        body.dark-mode .form-label { color: #cbd5e1; }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #94a3b8;
          font-size: 18px;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .password-toggle:hover { color: #3b82f6; }
        .password-toggle:focus { outline: none; color: #3b82f6; }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid rgba(0,0,0,0.06) !important;
          border-radius: 12px !important;
          color: #0f172a !important;
          outline: none;
          transition: all 0.2s ease !important;
          box-sizing: border-box;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }
        .form-input:focus {
          background: #ffffff !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), inset 0 1px 2px rgba(0,0,0,0.02) !important;
          transform: translateY(-1px);
        }

        body.dark-mode .form-input {
          background: rgba(15, 23, 42, 0.5) !important;
          border-color: rgba(255,255,255,0.08) !important;
          color: #f8fafc !important;
        }
        body.dark-mode .form-input:focus {
          background: rgba(30, 41, 59, 0.8) !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25) !important;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
        }
        body.dark-mode .remember-me { color: #cbd5e1; }
        .remember-me input {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          cursor: pointer;
          accent-color: #2563eb;
        }

        .forgot-password {
          font-size: 13px;
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        body.dark-mode .forgot-password { color: #3b82f6; }
        .forgot-password:hover { text-decoration: underline; color: #1d4ed8; }

        .loading-spinner {
          animation: spin 1s linear infinite;
          margin-right: 8px;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 32px 0;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        body.dark-mode .auth-divider::before, body.dark-mode .auth-divider::after {
          border-bottom-color: rgba(255,255,255,0.08);
        }
        .auth-divider span { padding: 0 16px; }

        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px;
          margin-bottom: 12px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        body.dark-mode .social-btn {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(255,255,255,0.1);
          color: #cbd5e1;
        }
        body.dark-mode .social-btn:hover {
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .login-footer {
          margin-top: 40px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
          line-height: 1.8;
        }
        .login-footer a { color: #2563eb; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .login-footer a:hover { text-decoration: underline; color: #1d4ed8; }
        body.dark-mode .login-footer a { color: #3b82f6; }

        .error-message {
          color: #ef4444;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .login-logo-mobile { display: none; }

        @media (max-width: 992px) {
          .login-wrapper { flex-direction: column; }
          .login-left-panel { padding: 48px 40px 24px; flex: none; }
          .login-right-panel { padding: 24px; align-items: flex-start; }
        }

        @media (max-width: 768px) {
          .login-left-panel { display: none; }
          .login-logo-mobile { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 8px; 
            font-size: 24px; 
            font-weight: 700; 
            color: #2563eb; 
            margin-bottom: 32px; 
          }
          body.dark-mode .login-logo-mobile { color: #3b82f6; }
          .glass-login-card { padding: 40px 24px; border-radius: 24px; }
        }
      `}</style>

      {/* Left Panel - Branding */}
      <div className="login-left-panel">
        <div className="branding-content">
          <img src="/assetflow-logo.png" alt="AssetFlow Logo" className="branding-logo" />
          <h2 className="branding-title">AssetFlow</h2>
          <h1 className="branding-heading">
            Enterprise Asset &<br/>
            Resource Management System
          </h1>
        </div>
      </div>

      {/* Right Panel - Glass Card */}
      <div className="login-right-panel">
        <div className="glass-login-card">
          <div className="login-header">
            <div className="login-logo-mobile"><FiBox /> AssetFlow</div>
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Sign in to continue' : 'Sign up for a new employee account'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input 
                    id="name"
                    type="text" 
                    name="name"
                    className="form-input" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="form-input" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input 
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    className="form-input" 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}

            <Button type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: isLogin ? '0' : '24px' }} disabled={loading}>
              {loading ? (
                <><span className="loading-spinner"></span> {isLogin ? 'Authenticating...' : 'Creating Account...'}</>
              ) : (
                <>{isLogin ? 'Sign In' : 'Sign Up'} <FiArrowRight style={{ marginLeft: '8px' }} /></>
              )}
            </Button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          <div className="social-logins">
            <button type="button" className="social-btn" onClick={handleGoogleLogin}>
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button type="button" className="social-btn" onClick={handleMicrosoftLogin}>
              <svg viewBox="0 0 21 21" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1h9v9H1z" fill="#f25022"/>
                <path d="M11 1h9v9h-9z" fill="#7fba00"/>
                <path d="M1 11h9v9H1z" fill="#00a4ef"/>
                <path d="M11 11h9v9h-9z" fill="#ffb900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <div className="login-footer">
            {isLogin ? (
              <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Sign up here.</a></>
            ) : (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Sign in here.</a></>
            )}
            <br/><br/>
            © 2026 Team Bread & Jam <br/> AssetFlow v1.0
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

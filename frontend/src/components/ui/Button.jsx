function Button({ children, variant = 'primary', onClick, disabled = false, type = 'button' }) {
  return (
    <button 
      type={type} 
      className={`btn btn-${variant}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-sizing: border-box;
          outline: none;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: #2563eb;
          color: #ffffff;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #1d4ed8;
        }

        .btn-primary:focus-visible {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
        }

        .btn-secondary {
          background-color: #ffffff;
          border-color: #cbd5e1;
          color: #334155;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #f8fafc;
          border-color: #94a3b8;
        }

        .btn-secondary:focus-visible {
          box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.3);
        }

        .btn-danger {
          background-color: #dc2626;
          color: #ffffff;
        }

        .btn-danger:hover:not(:disabled) {
          background-color: #b91c1c;
        }

        .btn-danger:focus-visible {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.4);
        }
      `}</style>
      {children}
    </button>
  );
}

export default Button;

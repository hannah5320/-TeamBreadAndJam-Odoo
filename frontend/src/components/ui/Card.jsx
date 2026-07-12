function Card({ title, value, icon, subtitle, onClick }) {
  return (
    <div 
      className={`card ${onClick ? 'card-clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <style>{`
        .card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: all 0.2s ease-in-out;
          box-sizing: border-box;
          width: 100%;
        }
        .card-clickable {
          cursor: pointer;
        }
        .card-clickable:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .card-clickable:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .card-title {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .card-icon {
          font-size: 20px;
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-value {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 4px 0 0 0;
          line-height: 1;
        }
        .card-subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }
      `}</style>
      <div className="card-header">
        <span className="card-title">{title}</span>
        {icon && <span className="card-icon">{icon}</span>}
      </div>
      <div className="card-value">{value}</div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}

export default Card;

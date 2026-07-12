function StatusBadge({ status }) {
  const getBadgeStyle = (statusStr) => {
    const s = (statusStr || '').toLowerCase().trim();
    switch (s) {
      case 'available':
        return { bg: '#ecfdf5', color: '#059669' }; // light green
      case 'allocated':
        return { bg: '#eff6ff', color: '#2563eb' }; // light blue
      case 'pending':
        return { bg: '#fffbeb', color: '#d97706' }; // light yellow/amber
      case 'approved':
        return { bg: '#f0fdf4', color: '#16a34a' }; // light emerald
      case 'rejected':
        return { bg: '#fef2f2', color: '#dc2626' }; // light red
      case 'under maintenance':
      case 'maintenance':
        return { bg: '#fdf2f8', color: '#db2777' }; // light pink
      case 'completed':
        return { bg: '#f0fdfa', color: '#0d9488' }; // light teal
      default:
        return { bg: '#f1f5f9', color: '#475569' }; // default slate grey
    }
  };

  const style = getBadgeStyle(status);

  return (
    <span className="status-badge" style={{ backgroundColor: style.bg, color: style.color }}>
      <style>{`
        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          letter-spacing: 0.3px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          white-space: nowrap;
        }
      `}</style>
      {status}
    </span>
  );
}

export default StatusBadge;

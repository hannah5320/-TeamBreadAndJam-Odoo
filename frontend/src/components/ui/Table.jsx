function Table({ columns, data, loading, emptyMessage = 'No data available', actions }) {
  return (
    <div className="table-container">
      <style>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-sizing: border-box;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }
        .custom-table th {
          background-color: #f8fafc;
          padding: 16px 20px;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .custom-table td {
          padding: 16px 20px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .custom-table tbody tr:last-child td {
          border-bottom: none;
        }
        .custom-table tbody tr:hover td {
          background-color: #f8fafc;
        }
        .table-status-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          color: #64748b;
          text-align: center;
        }
        .table-loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .table-empty-text {
          font-weight: 500;
        }
      `}</style>
      
      {loading ? (
        <div className="table-status-container">
          <div className="table-loader" />
          <p>Loading data...</p>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="table-status-container">
          <p className="table-empty-text">{emptyMessage}</p>
        </div>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={col.width ? { width: col.width } : {}}>
                  {col.header}
                </th>
              ))}
              {actions && <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && (
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
